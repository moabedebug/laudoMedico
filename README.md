# 🩺 Laudo Médico API

API REST desenvolvida em Node.js para permitir que médicos criem, consultem e gerenciem relatórios (laudos) dos seus pacientes de forma segura e organizada.

---

## 🚀 Tecnologias utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT para autenticação
- bcryptjs para hash de senhas
- Zod para validações
- Swagger para documentação da API
- ESLint + Prettier (Rocketseat config)
- Dotenv
- Nodemon (ambiente de desenvolvimento)

---

## 🛠️ Como rodar localmente

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/laudo-medico-api.git
cd laudo-medico-api
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure o ambiente**

- Crie um arquivo .env na raiz do projeto baseado no .env.example:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority&appName=<app-name>
PORT=3333
SALT_ROUNDS=10
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. **Inicie o servidor**

```bash
npm run dev
```

## 📚 Documentação da API

- A documentação interativa está disponível via Swagger após iniciar o servidor:

```bash
http://localhost:3333/api-docs
```

## 🧱 Estrutura de pastas

```bash
src/
├── config/         # Configurações de banco e ambiente
├── controllers/    # Lida com as requisições HTTP
├── doc/            # Documentação técnica da API (Swagger, exemplos, guias)
├── errors/         # Classes e tipos de erro personalizados
├── middlewares/    # Interceptadores e validadores de requisições
├── models/         # Modelos do Mongoose
├── repositories/   # Acesso ao banco de dados (camada de dados)
├── routes/         # Rotas da aplicação
├── schemas/        # Validações com Zod
├── services/       # Casos de uso e lógica de negócio
├── utils/          # Funções utilitárias reutilizáveis
├── app.js          # Setup da aplicação
└── server.js       # Inicialização do servidor
```

---

## 🔐 Funcionalidades

- Registro e login de usuários com autenticação JWT
- Criação, edição, listagem e exclusão de pacientes
- Geração de relatórios médicos
- Validação robusta de dados com Zod
- Rotas protegidas com middleware de autenticação

---

## 📄 Licença

Este projeto está sob a licença MIT.
