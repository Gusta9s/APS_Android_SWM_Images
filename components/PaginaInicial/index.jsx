import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaginaInicial() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar
                barStyle="light-content"
                translucent={true}
                backgroundColor="transparent"
            />
            <View style={styles.container}>
                <View style={styles.cardPrincipal}>
                    <Text style={styles.textoPrincipal}>
                        Bem-vindo ao Sistema de Gerenciamento de Resíduos Sólidos!
                    </Text>
                    <Text style={styles.textoCorpo}>
                        Este é o seu guia rápido para utilizar nosso aplicativo. Conheça as principais funcionalidades disponíveis no menu: {'\n'}
                    </Text>

                    <Text style={styles.textoDestaque}>
                        Captura: Encaminhe uma foto do seu contêiner de lixo para que a equipe de coleta chegue até você e realize a limpeza. {'\n'}
                    </Text>

                    <Text style={styles.textoDestaque}>
                        Ajuda: Caso você tenha dúvidas sobre o uso do aplicativo, acesse esta aba para encontrar as respostas e tutoriais. {'\n'}
                    </Text>

                    <Text style={styles.textoDestaque}>
                        Sobre Nós: Para conhecer mais sobre a nossa missão, a empresa e os desenvolvedores envolvidos neste projeto. {'\n'}
                    </Text>
                </View>

                <View style={styles.rodape}>
                    <Text style={styles.textoCorpoDiscreto}>
                        Este projeto foi desenvolvido por Gustavo de Almeida Pacheco, Bruno Capovilla, Matheus Ferreira, João Brito e Rafael Pulzi.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardPrincipal: {
        width: '80%',
        height: 'auto',
        backgroundColor: '#c5c8c2ff',
        borderRadius: 15,
        padding: 20,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
    textoPrincipal: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    textoCorpo: {
        color: '#000',
        fontSize: 15,
        textAlign: 'left',
        lineHeight: 22,
    },
    textoDestaque: {
        fontWeight: 'bold',
        color: '#000',
    },
    textoCorpoDiscreto: {
        color: '#000',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
});
