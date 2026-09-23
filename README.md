# APS Android SWM Images

Aplicativo mobile em **React Native (Expo)** que permite ao morador fotografar seu contêiner de lixo cheio ou com coleta atrasada, capturar automaticamente a localização do ponto de descarte e enviar tudo para a nuvem — disparando o restante do pipeline de classificação e roteirização da equipe de coleta.

Este repositório é um dos componentes do projeto de TCC **Gestão de Resíduos Sólidos Urbanos (SWM)**, composto pelos seguintes repositórios:

| Repositório | Papel no fluxo |
|---|---|
| **APS_Android_SWM_Images** *(este repositório)* | Aplicativo mobile usado para capturar a foto do resíduo e a localização de descarte, e enviá-las para o armazenamento em nuvem. |
| [TCC_workflow_data_SWM](https://github.com/Gusta9s/TCC_workflow_data_SWM) | Pipeline em Python que baixa a imagem e as coordenadas, trata os dados e orquestra as chamadas entre o modelo de classificação e o serviço de rotas. |
| [TCC_Model1_CNN_SWM](https://github.com/Gusta9s/TCC_Model1_CNN_SWM) | API com o modelo de visão computacional (YOLOv11s) que classifica o tipo de resíduo na imagem. |
| [TCC-Routing-Machine-SWM](https://github.com/Gusta9s/TCC-Routing-Machine-SWM) | Recebe origem/destino, calcula a rota, gera a imagem do mapa (Leaflet.js) e a salva em um volume Docker compartilhado. |
| [TCC_Orchestrator](https://github.com/Gusta9s/TCC_Orchestrator) | Orquestra, via Docker Compose, a subida integrada de todos os serviços (rede, volumes compartilhados e ordem de inicialização). |

## O problema

Quando o contêiner de lixo de uma residência está cheio e a coleta está atrasada, não existe um canal simples para o morador avisar a equipe de coleta *onde* e *o quê* precisa ser recolhido — normalmente isso depende de ligação, reclamação em redes sociais ou simplesmente esperar. O desafio é dar ao morador uma forma rápida (poucos toques, sem cadastro) de registrar essa ocorrência com evidência real (uma foto do contêiner) e a localização exata do problema, para que o restante do pipeline (classificação automática do resíduo e geração da rota até o ponto) possa agir sem depender de digitação manual de endereço.

## A solução

O aplicativo foi construído em **React Native com Expo**, escolha natural para entregar rapidamente um app Android funcional (câmera, geolocalização, permissões do sistema) sem escrever código nativo separado, com acesso direto às APIs de câmera (`expo-camera`) e localização (`expo-location`) do dispositivo. Em vez de depender de um backend próprio para receber o upload, o app envia a foto e um arquivo com as coordenadas **diretamente para um bucket compatível com S3 (Backblaze B2)**, usando o SDK oficial da AWS (`@aws-sdk/client-s3`) — isso elimina a necessidade de manter um servidor de upload dedicado e mantém o aplicativo simples: capturar, obter GPS, subir os dois arquivos com nomes sequenciais (`foto_{n}.jpg`, `rota_{n}.txt`) e pronto, o pipeline de dados assume o resto.

## O resultado

O fluxo de captura funciona de ponta a ponta: o morador tira a foto do contêiner, o app obtém as coordenadas GPS do local, encontra automaticamente o próximo número sequencial disponível no bucket (evitando sobrescrever envios de outros usuários) e sobe a imagem e o arquivo de localização para o Backblaze B2 — com feedback visual de progresso e uma tela de sucesso ou erro ao final. A foto também é salva na galeria do dispositivo como confirmação local do envio. O aplicativo conta ainda com uma aba de instruções passo a passo (como enquadrar o contêiner, iluminação, estabilidade) e uma aba de ajuda com capturas de tela de cada etapa, reduzindo o risco de fotos inutilizáveis chegarem ao modelo de classificação.

## Como o app funciona

1. **Página inicial**: apresenta as funcionalidades disponíveis no menu (Captura, Ajuda, Sobre Nós).
2. **Instruções de captura**: orienta o usuário sobre como posicionar a câmera antes de liberar o acesso a ela.
3. **Captura**: abre a câmera do dispositivo para fotografar o contêiner de lixo.
4. **Pré-visualização**: permite descartar a foto e tirar outra, ou confirmar o envio.
5. **Envio**: solicita permissão de localização, obtém as coordenadas GPS, monta o arquivo de rota (`rota_{n}.txt`) e a imagem (`foto_{n}.jpg`) com numeração sequencial, e envia ambos para o bucket no Backblaze B2.
6. **Confirmação**: exibe uma mensagem de sucesso (ou erro, com opção de tentar novamente) e salva a foto na galeria do dispositivo como registro local.

## Segredos e configuração

- O app solicita permissões de câmera, localização (fina e aproximada) e galeria apenas quando necessário, seguindo o modelo de permissões do Android/Expo.

## Como executar

```bash
npm install
npx expo start
```

No terminal do Expo, escolha abrir em um emulador Android/iOS, no navegador, ou escaneie o QR code com o app Expo Go no celular.

## Estrutura do projeto

```
.
├── app/
│   ├── PaginaPrincipal/         # Tela inicial
│   ├── FluxoPrincipal/          # Instruções + tela da câmera + upload
│   ├── Ajuda/                   # Tutorial passo a passo com capturas de tela
│   ├── SobreNosApp/             # Sobre o projeto e a equipe
│   └── _layout.jsx              # Navegação em menu lateral (drawer)
├── components/                  # Componentes visuais de cada tela
├── assets/images/                # Ícones, splash screen e imagens de ajuda
├── app.json / app.config.js      # Configuração do app Expo (nome, permissões, EAS)
└── package.json
```

## Tecnologias principais

- React Native / Expo
- Expo Router (navegação em drawer)
- expo-camera / expo-location / expo-media-library
- AWS SDK para S3 (upload para Backblaze B2)

## Autor

Gustavo de Almeida Pacheco, Bruno Capovilla, Matheus Ferreira, João Brito e Rafael Pulzi — desenvolvido como parte do Trabalho de Conclusão de Curso (TCC) sobre Gestão de Resíduos Sólidos Urbanos.
