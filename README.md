# Shoply — E-commerce

Shoply é um projeto de e-commerce em desenvolvimento. A aplicação reúne uma interface de loja responsiva, páginas de entrada e cadastro de usuários e uma API em Express conectada a MySQL.

> **Estado atual:** a página da loja e seus produtos são demonstrações estáticas. A API já permite cadastrar usuários e verificar credenciais de login, mas catálogo, busca, sacola, pedidos e sessão de usuário ainda não estão implementados.

## Conteúdo

- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Configuração](#configuração)
- [Como executar](#como-executar)
- [Rotas da aplicação](#rotas-da-aplicação)
- [API](#api)
- [Banco de dados](#banco-de-dados)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Observações](#observações)

## Tecnologias

- **Frontend:** React, React DOM e React Router
- **Desenvolvimento e build:** Vite e plugin React
- **Servidor HTTP e API:** Node.js e Express
- **Banco de dados:** MySQL, acessado por `mysql2`
- **Configuração local:** variáveis de ambiente carregadas com `dotenv`
- **Estilo:** CSS responsivo próprio, com fontes DM Sans e Space Grotesk

## Pré-requisitos

- Node.js compatível com Vite 8 (Node.js 20.19+ ou 22.12+)
- npm
- MySQL em execução e um banco de dados criado

## Configuração

1. Clone o repositório e entre na pasta:

   ```bash
   git clone https://github.com/Dan1el816/Projeto-E-Commerce.git
   cd Projeto-E-Commerce
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as credenciais do seu MySQL:

   ```dotenv
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=shoply
   ```

   Substitua os valores pelos dados do seu ambiente. O arquivo `.env` é ignorado pelo Git; não publique credenciais.

4. Crie o banco e a tabela necessários. Um esquema compatível com as consultas atuais do servidor é:

   ```sql
   CREATE DATABASE shoply
     CHARACTER SET utf8mb4
     COLLATE utf8mb4_unicode_ci;

   USE shoply;

   CREATE TABLE usuarios (
     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
     nome VARCHAR(150) NOT NULL,
     email VARCHAR(255) NOT NULL,
     senha VARCHAR(255) NOT NULL,
     PRIMARY KEY (id),
     UNIQUE KEY usuarios_email_unique (email)
   );
   ```

   Se o banco ou a tabela já existirem, confirme que possuem as colunas `id`, `nome`, `email` e `senha`, e que `email` é único. A aplicação grava a senha como hash com salt; não armazene senhas em texto puro.

## Como executar

### Desenvolvimento

Abra dois terminais na raiz do projeto.

No primeiro, inicie a API:

```bash
npm run server
```

O servidor Express inicia em `http://localhost:3000`.

No segundo, inicie o frontend:

```bash
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`. Durante o desenvolvimento, o Vite encaminha chamadas `/api` para o servidor em `http://localhost:3000`.

### Build de produção

Gere os arquivos estáticos:

```bash
npm run build
```

O resultado é criado em `dist/`. Para servir o build e a API pelo Express:

```bash
npm run server
```

Depois, abra `http://localhost:3000`. O servidor usa o conteúdo de `dist/`, portanto execute o build novamente após alterações no frontend.

### Outros comandos

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Inicia a pré-visualização local do build pelo Vite |
| `npm run server` | Inicia o Express, a API e a entrega do build |

## Rotas da aplicação

| Caminho | Página | Descrição |
| --- | --- | --- |
| `/` | Página inicial | Apresentação do Shoply e links para entrar ou criar uma conta |
| `/cadastro` | Cadastro | Formulário de criação de conta conectado à API |
| `/login` | Login | Formulário para verificar as credenciais pela API |
| `/home` | Loja | Vitrine visual com categorias e produtos estáticos |
| `/dashboard` | Dashboard | Página de demonstração existente no projeto |

Após um cadastro bem-sucedido, a aplicação direciona o usuário para `/home`. A vitrine não consulta produtos do banco de dados; os links e ações de busca e sacola são apenas elementos visuais neste estágio.

## API

As rotas recebem e retornam JSON.

### `POST /api/cadastro`

Cria um usuário.

Corpo:

```json
{
  "name": "Maria Silva",
  "email": "maria@example.com",
  "password": "uma-senha"
}
```

Em caso de sucesso, responde com HTTP `201`:

```json
{
  "message": "Conta criada com sucesso.",
  "user": {
    "id": 1,
    "name": "Maria Silva",
    "email": "maria@example.com"
  }
}
```

O formulário também pede confirmação da senha no frontend; esse campo é validado localmente e não é enviado à API. A API normaliza o e-mail para minúsculas, valida os campos e evita e-mails duplicados. Um endereço já cadastrado retorna HTTP `409`.

### `POST /api/login`

Verifica as credenciais de um usuário existente.

Corpo:

```json
{
  "email": "maria@example.com",
  "password": "uma-senha"
}
```

Credenciais inválidas retornam HTTP `401`. A verificação compara a senha informada com o hash salvo no banco.

> **Importante:** o login ainda não cria uma sessão persistente. Após a validação bem-sucedida, a interface volta para `/`. Não há proteção de rotas nem estado de autenticação compartilhado entre páginas.

## Banco de dados

A conexão é criada em `src/lib/db.js` a partir destas variáveis de ambiente:

| Variável | Uso | Padrão |
| --- | --- | --- |
| `DB_HOST` | Host do MySQL | — |
| `DB_PORT` | Porta do MySQL | `3306` |
| `DB_USER` | Usuário do banco | — |
| `DB_PASSWORD` | Senha do usuário do banco | — |
| `DB_NAME` | Nome do banco | — |

Para testar a conexão configurada, execute:

```bash
node src/lib/test-db.js
```

## Estrutura do projeto

```text
.
├── public/
│   └── css/
│       └── styles.css       # Estilos das páginas de entrada e da loja
├── src/
│   ├── components/
│   │   ├── Cadastro.jsx     # Formulário de cadastro
│   │   ├── Dashboard.jsx    # Dashboard de demonstração
│   │   ├── home.jsx         # Página inicial de apresentação
│   │   ├── Login.jsx        # Formulário de login
│   │   └── StoreHome.jsx    # Vitrine estática do e-commerce
│   ├── lib/
│   │   ├── db.js            # Pool de conexões MySQL
│   │   └── test-db.js       # Verificação da conexão
│   ├── app.jsx              # Rotas do React
│   ├── index.jsx            # Inicialização do React
│   └── server.js            # API Express e servidor do build
├── index.html
├── package.json
└── vite.config.js           # Configuração do Vite e proxy da API
```

## Observações

- As imagens da vitrine são carregadas de `images.unsplash.com` e precisam de acesso à internet.
- Os dados de produtos, preços e categorias mostrados na página da loja são exemplos estáticos, não representam o conteúdo do banco.
- O projeto ainda não possui uma suíte de testes automatizados configurada.
- Nunca compartilhe o arquivo `.env` nem envie credenciais reais ao repositório.
