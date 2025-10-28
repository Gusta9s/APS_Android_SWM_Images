import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AjudaApp() {
  const helpTopics = [
    {
      title: "Página Principal",
      description: "Esta é a tela inicial do aplicativo. Aqui você encontra uma breve descrição das principais funcionalidades disponíveis no menu lateral, como 'Captura', 'Ajuda' e 'Sobre Nós'.",
      imageUrl: require('../../assets/images/02.jpg')
    },
    {
      title: "Sobre Nós",
      description: "Nesta tela, você pode conhecer mais sobre a missão do nosso projeto de Gestão de Resíduos Sólidos e ver a lista de desenvolvedores que contribuíram para a criação deste aplicativo.",
      imageUrl: require('../../assets/images/03.jpg')
    },
    {
      title: "Instruções de Captura",
      description: "Antes de abrir a câmera, esta tela fornece um guia passo a passo sobre como tirar uma boa foto do contêiner, incluindo dicas de posicionamento, iluminação e estabilidade para garantir a qualidade da imagem.",
      imageUrl: require('../../assets/images/04.jpg')
    },
    {
      title: "Câmera (Fluxo Principal)",
      description: "Esta é a tela da câmera. Aponte para o contêiner de lixo e toque no botão branco central para tirar a foto. Lembre-se de seguir as instruções da tela anterior para obter o melhor resultado.",
      imageUrl: require('../../assets/images/05.jpg')
    },
    {
      title: "Pré-visualização da Foto",
      description: "Após tirar a foto, ela será exibida nesta tela para sua confirmação. Se a imagem não ficou boa, toque em 'Descartar' para voltar à câmera. Se estiver satisfeito, toque em 'Salvar e Enviar' para continuar.",
      imageUrl: require('../../assets/images/06.jpg')
    },
    {
      title: "Pop-up de Sucesso",
      description: "Este alerta aparece após o envio bem-sucedido da sua foto. Ele confirma que a imagem foi recebida e também salva na galeria do seu dispositivo. A equipe de coleta já foi notificada.",
      imageUrl: require('../../assets/images/07.jpg')
    },
    {
      title: "Pop-up de Falha",
      description: "Se algo der errado durante o salvamento ou o envio, este alerta aparecerá. Ele informa que ocorreu um problema e sugere que você tente novamente. Verifique sua conexão com a internet se o erro persistir.",
      imageUrl: require('../../assets/images/08.jpg')
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {helpTopics.map((topic, index) => (
            <View key={index} style={styles.helpBlock}>
              <Image source={topic.imageUrl} style={styles.helpImage} />
              <Text style={styles.helpTitle}>{topic.title}</Text>
              <Text style={styles.helpText}>{topic.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.rodape}>
        <Text style={styles.textoCorpoDiscreto}>
          Este projeto foi desenvolvido por Gustavo de Almeida Pacheco, Bruno Capovilla, Matheus Ferreira, João Brito e Rafael Pulzi.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  helpBlock: {
    width: '90%',
    backgroundColor: '#c5c8c2ff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  helpImage: {
    width: '100%',
    height: 630,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#c5c8c2ff',
  },
  helpTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  helpText: {
    color: '#000',
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 22,
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