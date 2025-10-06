import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SobreNosScreen = () => {

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content"
                translucent={true}
                backgroundColor="transparent" />
            <View style={styles.container}>
                {/* Componente Primário - Mais destacado */}
                <View style={styles.cardPrincipal}>
                    <Text style={styles.textoPrincipal}>
                        Sobre Nós
                    </Text>
                    <Text style={styles.textoCorpo}>
                        Bem-vindo ao nosso Sistema de Gestão de Resíduos Sólidos! Este aplicativo foi desenvolvido para otimizar a comunicação entre usuários e a equipe de limpeza. Quando você observar que um contêiner de lixo da sua casa está cheio e está há mais de uma hora de atraso para a coleta, basta tirar uma foto e enviá-la através do botão 'Captura' disponível no menu à esquerda. Nossa equipe será imediatamente notificada para realizar a coleta. Se precisar de ajuda, não se preocupe — temos uma aba de suporte completa com todas as informações necessárias para utilizar o aplicativo. Juntos, podemos tornar a gestão de resíduos mais eficiente!
                    </Text>
                </View>

                {/* Componente Secundário - Mais discreto */}
                <View style={styles.rodape}>
                    <Text style={styles.textoCorpoDiscreto}>
                        Este projeto foi desenvolvido por Gustavo de Almeida Pacheco, Bruno Capovilla, Matheus Ferreira, João Brito e Rafael Pulzi.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // Garante que o conteúdo não fique sob a barra de status ou notch
    safeArea: {
        flex: 1,
        backgroundColor: '#3b3b3b',
    },
    // Container principal que define o fundo e alinha os itens
    container: {
        flex: 1,
        backgroundColor: '#3b3b3b',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 'auto'
    },
    // Estilo para o primeiro card, o de maior destaque
    cardPrincipal: {
        width: '80%',
        height: 'auto',
        backgroundColor: '#4f4f4f', // Um cinza um pouco mais claro para criar contraste
        borderRadius: 15, // Bordas arredondadas para um visual moderno
        padding: 20,
        justifyContent: 'center', // Centraliza o texto verticalmente
        shadowColor: '#000', // Sombra para dar profundidade
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    rodape: {
        width: '100%', // Ocupa toda a largura da tela
        paddingVertical: 25, // Espaçamento interno vertical
        paddingHorizontal: 15, // Espaçamento interno horizontal
        // A borda agora é apenas na parte superior, para separar do conteúdo
        borderTopWidth: 1,
        borderColor: '#606060', // Mantém a cor da borda discreta
        alignItems: 'center', // Centraliza o texto dentro do rodapé
    },
    // Estilo para o texto de título/primário dentro dos cards
    textoPrincipal: {
        color: '#E0E0E0', // Cor clara para contrastar com o fundo escuro do card
        fontSize: 18, // Tamanho legível
        fontWeight: 'bold',
        marginBottom: 8, // Espaço abaixo do título
        textAlign: 'center',
    },
    // Estilo para o texto de corpo, com o mesmo tamanho em ambos
    textoCorpo: {
        color: '#CCCCCC', // Um pouco mais suave que o título
        fontSize: 14, // "Pequeno mas visível"
        textAlign: 'center',
        lineHeight: 20, // Melhora a legibilidade
    },
    textoPrincipalDiscreto: {
        color: '#BDBDBD',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    textoCorpoDiscreto: {
        color: '#9E9E9E',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default SobreNosScreen;