import { useRouter } from 'expo-router';
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const InstrucaoCapturaTela = () => {

    const router = useRouter();

  const handleContinuePress = () => {
    // Agora a função apenas navega. A tela da câmera cuidará da permissão.
    router.push('/FluxoPrincipal/camera');
  };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar
                barStyle="light-content"
                translucent={true}
                backgroundColor="transparent"
            />
            <View style={styles.cardPrincipal}>
                <Image
                    source={require('../../assets/images/01.gif')}
                    style={styles.gif}
                />
                <Text style={styles.textoPrincipal}>Prepare sua Câmera</Text>
                <Text style={styles.textoCorpo}>
                    Este processo é destinado a capturar imagens do seu contêiner de lixo reciclável. Por favor, siga as instruções abaixo para garantir que as fotos sejam encaminhadas corretamente: {'\n\n'}
                    1. Se posicione a frente do container de lixo a uma distância de aproximadamente meio metro. {'\n'}
                    2. Certifique-se de que o contêiner esteja centralizado na tela da câmera e vire o dispositivo para horizontal. {'\n'}
                    3. Mantenha a câmera estável e evite movimentos bruscos ao capturar as imagens. {'\n'}
                    4. Escolha um ambiente bem iluminado para garantir a clareza das fotos. {'\n'}
                    5. Pressione o botão "Continuar" abaixo, para iniciar o processo de captura de seu container de lixo.
                </Text>
                <Pressable style={styles.button} onPress={handleContinuePress}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </Pressable>
            </View>
            <View style={styles.rodape}>
                <Text style={styles.textoCorpoDiscreto}>
                    Este projeto foi desenvolvido por Gustavo de Almeida Pacheco, Bruno Capovilla, Matheus Ferreira, João Brito e Rafael Pulzi.
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardPrincipal: {
        width: '85%', // Um pouco maior para caber tudo
        height: 'auto',
        backgroundColor: '#c5c8c2ff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center', // Centraliza todos os itens do card
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    gif: {
        width: 80,
        height: 80,
        marginBottom: 15,
    },
    textoPrincipal: {
        color: '#000',
        fontSize: 20, // Um pouco maior para mais destaque
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    textoCorpo: {
        color: '#000',
        fontSize: 12,
        textAlign: 'center', // Centralizado para seguir o layout do card 
        marginBottom: 25, // Espaço antes do botão
    },
    button: {
        backgroundColor: '#FFF', // Cor que harmoniza com a paleta
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10, // Bordas suaves
        elevation: 3,
    },
    buttonText: {
        color: '#000',
        fontSize: 15, // Conforme solicitado
        fontWeight: 'bold',
        textAlign: 'center',
        // A fonte será a padrão sans-serif do sistema (similar ao Arial)
    },
    rodape: {
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderColor: '#c5c8c2ff',
        backgroundColor: '#c5c8c2ff',
        alignItems: 'center',
    },
    textoCorpoDiscreto: {
        color: '#000',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default InstrucaoCapturaTela;