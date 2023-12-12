# Documentação da interface
Para a interface foi pensado tanto em telas para a utilização em um dispositivo web, quanto na própria tela que estará integrada com o robô.

## Organizações das telas Web
### Tela inicial 
- Esta tela é utilizada para o login, mas ela é uma tela bem ilustrativa como capa do sistema. 

<img src={require('/img/Telahome.png').default} width='100%'/>

### Home 
- A página de home foi projetada para conter as principais utilidades do sistema com a busca por peças ou a requisição de uma nova peça. Além disso, ela possui uma barra de navegação para levar para as outras páginas e funcionalidades do sistema. Por fim, no canto inferior direito está o botão para utilizar o chat-bot. Este botão irá permitir a interação do usuário com o chat em todas as demais páginas a fim de fazer perguntas sobre determinados temas, após sair desta página a sessão de interação com o chat será encerrada.

<img src={require('/img/Telahome2.png').default} width='100%'/>

### Tela de requisição
- Está tela está representando com o modal de requsição será apresentado para o usuário dando enfoque nas informações que serão necessárias para realizar a requisição. Neste modal é contido um espaço para inputar informações sendo eles: Id SAS, Nome do colaborador, documento de identificação e data de requisição. Possuindo dois botões de interação um para cancelar a requisição e outro para enviar a requisição.

<img src={require('/img/Telarequisicao.png').default} width='100%'/>

### Tela de busca de peças
- Está tela será utilizado para consultar e procurar pelas peças disponiveis no almoxarifado utilizamdo o seu ID SAP, apresentando os resultados em forma de tabela. A tabela apresenta 4 colunas principais sendo elas: Nome, ID, Status estoque e a quantidade de unidades da peça.  

<img src={require('/img/Telaalmoxarifado.png').default} width='100%'/>

### Histórico
- Está tela será utilizado para mostrar o histórico de pesquisa de peças sendo possivel pesquisar por data ou outra informação que ajuda a localizar as buscas. De modo que após realizar a busca a tabela retorna todos os dados correspondente as requisições daquele usuário.

<img src={require('/img/Telahistorico.png').default} width='100%'/>

### Perfil 
- Essa tela é utilizada para consulta de informações básicas e também na alteração de informações de um usuário. Informações como: Primeiro nome, sobrenome, identificação e senha. 

<img src={require('/img/Telaperfil.png').default} width='100%'/>

## Organizações das telas Robô
### Tela inicial do robô
- A tela que ficará visivel antes de iniciar o uso do chatbot no robô

<img src={require('/img/Telahomerobo.png').default} width='100%'/>

### Tela de instruções do chatbot
- Esta tela passa as intruções básicas de como utilizar o chatbot a fim de instruir o uso do chatbot passo a passo de como realizar uma pergunta ou uma interação e que tipo de resposta é esperado

<img src={require('/img/Telainstrucaorobo.png').default} width='100%'/>

### Tela de uso do chatbot 
- Apenas a prototipação da inteface do chat-bot

<img src={require('/img/Telachatrobo.png').default} width='100%'/>

## Demonstração de uso da interface
[Link](https://youtu.be/7ZDPgvFdBDM)

