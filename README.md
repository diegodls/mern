# mern
Sistema completo utilizando React(Front) + Node com Express(Back) + Mongo(DB)

# :question: Por quê? 
Este SPA(Single Page Application) foi desenvolvido para testar o aprendizado de [ReactJs](https://pt-br.reactjs.org/) e [NodeJs](https://nodejs.org/en/). </br>
Neste projeto foi criado uma aplicação completa, com frontend(SPA) em ReactJs e backend(API) em NodeJs para que usuários cadastrados possam compartilhar lugares de seus interesses.</br>
A aplicação conta com um sistema de cadastro de usuários, os usuários submetem um nome, email e uma foto para o cadastro, onde a API (backend) gerencia o cadastro mantendo a segurança dos dados e evitando duplicações ou outros problema provenientes do cadastro.</br>
Para o compartilhamento de Lugares de interesse, o usuário deve enviar uma foto do lugar, um nome e o endereço, endereço este que é utilizado para localizar os  dados completos e coordenadas utilizando a biblioteca de mapas interativos [Leaflet](https://leafletjs.com/).</br>

**Resumo:**
* Cadastro de usuários
* Cadastro de lugares
* Seleção de imagens
* Frontend Responsivo
* Backend próprio utilizando banco de dados [MongoDB](https://www.mongodb.com/pt-br)
* Escalável (fácil adaptação e troca de serviços, como banco de dados, sistema de mapas)

# :camera: Screenshots
![Screenshots](https://github.com/diegodls/mern/blob/assets/thumb.jpg)</br>

# :rocket: Iniciando
Para executar este aplicativo. você deverá ter um ambiente de [trabalho configurado](https://www.google.com/) para o desenvolvimento em [ReactJs](https://pt-br.reactjs.org/) e [NodeJs](https://nodejs.org/en/).</br>

**Começando:**
* Clone o repositório com o comando `git clone` ([veja mais](https://help.github.com/pt/github/creating-cloning-and-archiving-repositories/cloning-a-repository))
* Abra um prompt de comando/cmd/terminal na pasta raiz de cada projeto (frontend e backend), insira o comando `npx isntall` ou `npm install` ou `yarn install`(em cada projeto), dependendo do gerenciador de pacotes que você usa, este comando serve para instalar os pacotes/módulos utilizado nesse projeto
* Após a instalação dos pacotes/módulos, você deverá criar as variáveis de ambiente utilizada no projeto, em cada pasta (frontend e backend) tem um arquivo `.env_example` com os campos necessários para a execução do projeto, assim como a explicação sobre os mesmos.
* Depois de criar as [variáveis de ambiente](https://www.google.com/) seguindo o passo anterior, você pode executar o projeto abrindo um prompt de comando/cmd/terminal em cada pasta (frontend e backend) com o comando `npx start` ou `npm start` ou `yarn start`(ou `npx dev` ou `npm dev` ou `yarn dev`).

# :nut_and_bolt: Módulos
*Frontend:</br>
[react-leaflet](https://react-leaflet.js.org/) - *Mapas*</br>
[react-router-dom](https://reactrouter.com/web/guides/quick-start) - *Navegação entre as telas*</br>

*Backend:</br>
[bcryptjs](https://github.com/dcodeIO/bcrypt.js) - *Encriptação de dados*</br>
[dotenv](https://github.com/motdotla/dotenv) - *Gerenciar variáveis de ambiente*</br>
[express](https://expressjs.com/pt-br/) - *Framework web(rotas, middlewares, requisições http)*</br>
[mongoose](https://mongoosejs.com/) - *Modelagem de dados e conexão para MongoDB*</br>
[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - *Autenticação de usuários*</br>
[multer](https://github.com/expressjs/multer) - *Upload de arquivos*</br>

**E todas as dependências desses módulos que estão presentes em seus respectivos repositórios! **

# :clap: Agradecimentos
Agradecimentos a todos os desenvolvedores dos módulos acima.

# :page_with_curl: Notas/Problemas
Nada por enquanto, sinta-se livre para deixar sugestões e correções. :thumbsup:

# :warning: Licença
Você pode usar este aplicativos para estudos, e apenas para estudo, está proibido a sua publicação ou apropriação do código.
