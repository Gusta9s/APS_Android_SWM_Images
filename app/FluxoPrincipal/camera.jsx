import { ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const B2_CONFIG = {
  key_id: process.env.EXPO_PUBLIC_B2_KEY_ID,
  application_key: process.env.EXPO_PUBLIC_B2_APPLICATION_KEY,
  endpoint_url: process.env.EXPO_PUBLIC_B2_ENDPOINT_URL,
  bucket_name: process.env.EXPO_PUBLIC_B2_BUCKET_NAME,
  region: process.env.EXPO_PUBLIC_B2_REGION,
};

const s3Client = new S3Client({
  endpoint: B2_CONFIG.endpoint_url,
  region: B2_CONFIG.region,
  credentials: {
    accessKeyId: B2_CONFIG.key_id,
    secretAccessKey: B2_CONFIG.application_key,
  },
});


export default function CameraScreen() {
  const router = useRouter();
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  if (!cameraPermission) { 
    console.log("LOG: Permissões da câmera ainda estão sendo carregadas.");
    return <View />;
  }

  if (!cameraPermission.granted) {
    console.log("LOG: Permissão da câmera não concedida. Exibindo tela de solicitação.");
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Precisamos de sua permissão para usar a câmera.</Text>
        <Pressable style={styles.permissionButton} onPress={requestCameraPermission}>
          <Text style={styles.permissionButtonText}>Conceder Permissão</Text>
        </Pressable>
      </View>
    );
  }

  const takePicture = async () => {
    console.log("--- INÍCIO: Captura de Foto ---");
    if (cameraRef.current) {
      const newPhoto = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      console.log("LOG: Foto capturada com sucesso. URI:", newPhoto.uri);
      setPhoto(newPhoto);
      console.log("LOG: Estado 'photo' atualizado, exibindo tela de pré-visualização.");
    }
  };

  // 3. FUNÇÃO savePhoto TOTALMENTE MODIFICADA
  const savePhoto = async () => {
    if (!photo) {
      console.warn("AVISO: Tentativa de salvar sem uma foto definida.");
      return;
    }

    console.log("--- INÍCIO: Processo de Salvamento e Upload ---");
    console.log("LOG: Alterando estado para isUploading = true.");
    setIsUploading(true);

    try {
      // --- CAPTURAR LOCALIZAÇÃO ---
      console.log("LOG: Solicitando permissão de localização...");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error("ERRO: Permissão de localização foi negada pelo usuário.");
        throw new Error('Permissão de localização negada');
      }
      console.log("LOG: Permissão de localização concedida. Obtendo coordenadas...");
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log(`LOG: Coordenadas obtidas: Lat=${latitude}, Lon=${longitude}`);
      
      // --- PREPARAR ARQUIVO DE ROTA (.txt com conteúdo JSON) ---
      const rotaData = {
        destino_latitude: latitude,
        destino_longitude: longitude,
      };
      const rotaContent = JSON.stringify(rotaData, null, 2);
      console.log("LOG: Conteúdo do arquivo de rota criado:", rotaContent);

      // --- LÓGICA PARA ENCONTRAR O NOME DO PRÓXIMO ARQUIVO DE ROTA ---
      console.log("LOG: Buscando lista de arquivos 'rota_' no Backblaze...");
      const listRotasCommand = new ListObjectsV2Command({ Bucket: B2_CONFIG.bucket_name, Prefix: 'rota_' });
      const rotaListResponse = await s3Client.send(listRotasCommand);
      let lastRotaNumber = 0;
      const rotaRegex = /^rota_(\d+)\.txt$/;
      if (rotaListResponse.Contents && rotaListResponse.Contents.length > 0) {
        const rotaNumbers = rotaListResponse.Contents.map(item => {
          const match = item.Key.match(rotaRegex);
          return match ? parseInt(match[1], 10) : 0;
        });
        lastRotaNumber = Math.max(...rotaNumbers);
      }
      const newRotaFileName = `rota_${lastRotaNumber + 1}.txt`;
      console.log(`LOG: Último número de rota encontrado: ${lastRotaNumber}. Novo nome de arquivo: ${newRotaFileName}`);

      // --- UPLOAD DO ARQUIVO DE ROTA ---
      console.log(`LOG: Iniciando upload do arquivo ${newRotaFileName}...`);
      const uploadRotaCommand = new PutObjectCommand({
        Bucket: B2_CONFIG.bucket_name,
        Key: newRotaFileName,
        Body: rotaContent,
        ContentType: 'text/plain',
      });
      await s3Client.send(uploadRotaCommand);
      console.log(`LOG: Sucesso! Arquivo de rota ${newRotaFileName} enviado.`);

      // --- Lógica de nome de arquivo (inalterada) ---
      console.log("LOG: Buscando lista de arquivos 'foto_' no Backblaze...");
      const listCommand = new ListObjectsV2Command({ Bucket: B2_CONFIG.bucket_name, Prefix: 'foto_' });
      const listResponse = await s3Client.send(listCommand);
      let lastNumber = 0;
      const regex = /^foto_(\d+)\.jpg$/;
      if (listResponse.Contents && listResponse.Contents.length > 0) {
        const numbers = listResponse.Contents.map(item => {
          const match = item.Key.match(regex);
          return match ? parseInt(match[1], 10) : 0;
        });
        lastNumber = Math.max(...numbers);
      }
      const nextNumber = lastNumber + 1;
      const newFileName = `foto_${nextNumber}.jpg`;
      console.log(`LOG: Último número de foto encontrado: ${lastNumber}. Novo nome de arquivo: ${newFileName}`);

      // --- MUDANÇA PRINCIPAL: Voltamos a usar o photo.uri (temporário) para o upload ---
      console.log(`LOG: Preparando imagem para upload a partir da URI: ${photo.uri}`);
      const response = await fetch(photo.uri);
      const arrayBuffer = await response.arrayBuffer();
      const body = new Uint8Array(arrayBuffer);
      console.log(`LOG: Iniciando upload do arquivo ${newFileName}...`);
      
      const uploadCommand = new PutObjectCommand({ Bucket: B2_CONFIG.bucket_name, Key: newFileName, Body: body, ContentType: 'image/jpeg' });
      
      await s3Client.send(uploadCommand);
      console.log(`LOG: Sucesso! Arquivo de imagem ${newFileName} enviado.`);
      Alert.alert('Sucesso!', `Foto enviada para a equipe de coleta, aguarde um período de 30 minutos para restauração de seu container de lixo.`);

      // Tenta salvar na galeria como um passo secundário
      try {
        if (!mediaLibraryPermission.granted) {
          await requestMediaLibraryPermission();
        }
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        console.log("Foto também salva na galeria.");
      } catch (mediaError) {
        console.warn("Aviso: Não foi possível salvar na galeria (limitação do Expo Go).");
      }
      
      setPhoto(null);
      router.back();

    } catch (error) {
      console.error("Erro detalhado no processo de upload:", error);
      Alert.alert('Erro no Upload', 'Ocorreu um problema ao enviar a foto. Por favor, tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isUploading) {
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.permissionText}>Enviando foto para time de coleta...</Text>
      </View>
    )
  }

  if (photo) {
    return (
      <ImageBackground source={{ uri: photo.uri }} style={styles.previewContainer}>
        <View style={styles.previewButtonContainer}>
          <TouchableOpacity style={styles.previewButton} onPress={() => setPhoto(null)}>
            <Text style={styles.previewButtonText}>Descartar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.previewButton} onPress={savePhoto}>
            <Text style={styles.previewButtonText}>Salvar e Enviar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CameraView style={styles.camera} ref={cameraRef} facing="back" />
      <View style={styles.shutterButtonContainer}>
        <TouchableOpacity style={styles.shutterButton} onPress={takePicture} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c5c8c2ff', padding: 20 },
  permissionText: { fontSize: 18, color: '#000', textAlign: 'center', marginTop: 20 },
  permissionButton: { backgroundColor: '#FFF', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10, marginTop: 20 },
  permissionButtonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  shutterButtonContainer: { position: 'absolute', bottom: 30, width: '100%', alignItems: 'center' },
  shutterButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#fff', borderWidth: 5, borderColor: '#6a6a6a' },
  previewContainer: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  previewButtonContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', padding: 30, backgroundColor: 'rgba(0,0,0,0.4)' },
  previewButton: { padding: 15 },
  previewButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});