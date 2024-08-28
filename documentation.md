# Documentação da API Chat

## Visão Geral

A API Chat é uma aplicação simples construída com Node.js e Express, que permite a criação de salas de chat, a entrada e a saída de usuários nessas salas, além da troca de mensagens. A API utiliza MongoDB como banco de dados para armazenar as informações, assim garantindo persistência dos dados.

## Estrutura de Diretórios

```plaintext
bin/
├── server.js
README.md
src/
├── api.js
├── controller/
│   ├── salaController.js
│   ├── usuarioController.js
│   └── mensagemController.js
├── models/
│   ├── db.js
│   ├── salaModel.js
│   ├── usuarioModel.js
│   └── mensagemModel.js
└── util/
    └── token.js
```

## Iniciar o Servidor

O servidor é iniciado a partir do arquivo `server.js`, onde a configuração de ambiente é carregada com `dotenv`.

### Código

```javascript
require("dotenv").config();
const app = require("../src/api");

let port = process.env.API_PORT;

app.listen(port);

console.log("Servidor rodando na porta " + port + "!");
```

## API Endpoints

### 1. **Home**

- **Endpoint:** `GET /`
- **Descrição:** Retorna uma mensagem de boas-vindas.
- **Resposta Exemplo:**
```json
"Hello World!"
```

### 2. **Sobre**

- **Endpoint:** `GET /sobre`
- **Descrição:** Retorna informações sobre a API.
- **Resposta Exemplo:**
```json
{
    "nome": "API-CHAT",
    "versão": "0.1.0",
    "autor": "Pedro Haubert"
}
```

### 3. **Listar Salas**

- **Endpoint:** `GET /salas`
- **Descrição:** Lista todas as salas disponíveis.
- **Autenticação:** Requer um token no cabeçalho de autorização.
- **Parâmetros:** Nenhum.
- **Resposta Exemplo:**
```json
[
    {
        "_id": "sala_id_1",
        "nome": "Sala 1",
        "tipo": "publica",
        "membros": [],
        "mensagens": []
    },
    ...
]
```

### 4. **Criar Sala**

- **Endpoint:** `POST /salas`
- **Descrição:** Cria uma nova sala.
- **Autenticação:** Requer um token no cabeçalho de autorização.
- **Parâmetros:**
    - `nome` (string): Nome da sala.
    - `tipo` (string): Tipo de sala (pública ou privada).
    - `chave` (string): Chave de acesso (opcional para salas privadas).
- **Resposta Exemplo:**
```json
{
    "salaId": "novo_sala_id"
}
```

### 5. **Entrar em uma Sala**

- **Endpoint:** `POST /salas/entrar`
- **Descrição:** Entra em uma sala existente.
- **Autenticação:** Requer um token no cabeçalho de autorização.
- **Parâmetros:**
    - `salaId` (string): ID da sala que o usuário deseja entrar.
- **Resposta Exemplo:**
```json
{
    "_id": "sala_id_1",
    "nome": "Sala 1",
    "tipo": "publica",
    "membros": ["usuario_nick"],
    "mensagens": []
}
```

### 6. **Registrar Usuário**

- **Endpoint:** `POST /entrar`
- **Descrição:** Registra um novo usuário.
- **Parâmetros:**
    - `nick` (string): Nome do usuário.
- **Resposta Exemplo:**
```json
{
    "usuario": "usuario_nick",
    "token": "token_jwt"
}
```

### 7. **Sair da Sala**

- **Endpoint:** `POST /sair`
- **Descrição:** Remove um usuário do sistema ou de uma sala.
- **Parâmetros:**
    - `nick` (string): Nome do usuário que deseja sair.
- **Resposta Exemplo:**
```json
{
    "message": "Usuário removido com sucesso."
}
```

### 8. **Listar Mensagens**

- **Endpoint:** `GET /mensagens/:id`
- **Descrição:** Retorna as mensagens de uma sala específica.
- **Autenticação:** Requer um token no cabeçalho de autorização.
- **Parâmetros:**
    - `id` (string): ID da sala.
- **Resposta Exemplo:**
```json
{
    "mensagens": [
        {
            "usuario": "usuario_nick",
            "mensagem": "Olá!",
            "data": "2023-04-10T10:20:30.000Z"
        },
        ...
    ],
    "usuarios": ["usuario_nick_1", "usuario_nick_2"]
}
```

### 9. **Enviar Mensagem**

- **Endpoint:** `POST /mensagens`
- **Descrição:** Envia uma nova mensagem para uma sala.
- **Autenticação:** Requer um token no cabeçalho de autorização.
- **Parâmetros:**
    - `salaId` (string): ID da sala onde a mensagem será enviada.
    - `mensagem` (string): Conteúdo da mensagem.
- **Resposta Exemplo:**
```json
{
    "mensagens": [
        {
            "usuario": "usuario_nick",
            "mensagem": "Olá!",
            "data": "2023-04-10T10:20:30.000Z"
        },
        ...
    ],
    "usuarios": ["usuario_nick_1", "usuario_nick_2"]
}
```

## Controladores

### SalaController

- **get(req, res):** Lista todas as salas. Requer validação de token.
- **post(req, res):** Cria uma nova sala. Verifica o token antes de criar a sala.
- **entrar(req, res):** Permite a um usuário entrar em uma sala, validando o token.
- **sair(req, res):** Permite a um usuário sair de uma sala, validando o token.
- **getById(req, res):** Busca uma sala pelo ID fornecido.

### UsuarioController

- **post(req, res):** Registra um novo usuário e gera um token.
- **delete(req, res):** Remove um usuário da base de dados.

### MensagemController

- **get(req, res):** Lista todas as mensagens de uma sala.
- **post(req, res):** Envia uma nova mensagem a uma sala.

## Modelos

### DB Model (db.js)

Funções para interagir com o banco de dados MongoDB:

- **connect()**: Conecta ao banco de dados.
- **findAll(collection)**: Busca todos os documentos de uma coleção.
- **insertOne(collection, data)**: Insere um novo documento em uma coleção.
- **findOne(collection, data)**: Busca um documento específico.
- **deleteOne(collection, data)**: Deleta um documento de uma coleção.
- **entrar(collection, data)**: Adiciona um membro a uma sala existente.
- **sair(collection, data)**: Remove um membro de uma sala existente.
- **updateOne(collection, query, data)**: Atualiza um documento existente.

### SalaModel

- **listarSalas()**: Retorna todas as salas.
- **criarSala(data)**: Cria uma nova sala com os dados fornecidos.
- **entrarSala(data)**: Adiciona um usuário a uma sala específica.
- **sairSala(data)**: Remove um usuário de uma sala específica.
- **getSalaById(data)**: Retorna a sala específica com base no ID.

### UsuarioModel

- **entrar(data)**: Registra um usuário e gera um token.
- **sair(data)**: Remove um usuário da base de dados.

### MensagemModel

- **listarMensagens(salaId)**: Retorna todas as mensagens de uma sala específica.
- **enviarMensagem(data)**: Adiciona uma nova mensagem à sala especificada.

### Token Util

- **checkToken(token)**: Verifica a validade de um token.
- **generateToken(payload)**: Gera um novo token JWT.
- **decryptToken(token)**: Decifra um token e retorna os dados armazenados.

## Conclusão

Esta documentação cobre as principais funcionalidades da API Chat. Para mais informações sobre as implementações ou para contribuir para o projeto, sinta-se à vontade para explorar o código-fonte correspondente.