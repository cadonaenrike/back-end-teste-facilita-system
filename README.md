# API-Sistema de Gerenciamento de Tarefas - Facilita System 

Este Sistema de Gerenciamento de Tarefas é uma aplicação backend construída para demonstrar habilidades em TypeScript e Express, oferecendo uma solução simples e eficaz para o gerenciamento de tarefas com autenticação customizada.

## Tecnologias Usadas

- **Node.js e Express**: Para construir o servidor e gerenciar rotas da API.
- **TypeScript**: Para adicionar tipagem estática ao JavaScript, melhorando a confiabilidade e a manutenibilidade do código.
- **Prisma**: Como ORM para facilitar operações de banco de dados com PostgreSQL.
- **bcrypt**: Utilizado para a hash de senhas, aumentando a segurança no armazenamento de dados sensíveis.
- **cors**: Para habilitar a comunicação entre diferentes origens, caso sua API seja consumida por um cliente web.
- **cookie-parser**: Middleware para facilitar o manuseio de cookies.

## Configuração do Ambiente

### Pré-Requisitos

- Node.js (última versão LTS recomendada)
- PostgreSQL configurado e operacional
- Editor de código com suporte para TypeScript (recomendado: Visual Studio Code)

### Instalação

```bash
git clone https://seu-repositorio-aqui.git teste-server-back
cd teste-server-back
npm install
```

### Configuração do Banco de Dados e Ambiente

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomeDoBanco"
```

```bash
npx prisma migrate dev
```

## Modelagem do Banco de Dados

Definidos no `schema.prisma`, os modelos `User` e `Tarefa` representam a estrutura de dados do projeto.

## Autenticação de Usuário

A autenticação é implementada sem JWT, usando um token de sessão armazenado no banco de dados e validado pelo middleware de autenticação.

### Rotas de Autenticação:

- **POST /api/register**: Para registrar um novo usuário.
- **POST /api/login**: Para login do usuário, retornando um token de sessão.
- **POST /api/logout**: Para invalidar o token de sessão atual.

## CRUD de Tarefas

### Rotas:

- **POST /tarefas**: Adiciona uma nova tarefa (requer autenticação).
- **GET /tarefas**: Lista tarefas do usuário autenticado.
- **PUT /tarefas/:id**: Atualiza uma tarefa específica (requer autenticação).
- **DELETE /tarefas/:id**: Remove uma tarefa específica (requer autenticação).

## Middleware de Autenticação

Verifica a presença e a validade do token de sessão em cada requisição às rotas que requerem um usuário autenticado.

## Uso

Recomenda-se o uso de ferramentas como Postman ou Thunder Client para testar as rotas da API. Para rotas que requerem autenticação, inclua o token de sessão fornecido pelo endpoint de login.

## Considerações Finais

Este projeto visa demonstrar práticas de desenvolvimento backend com foco em autenticação e operações CRUD. Para questões ou contribuições, por favor, consulte o repositório do projeto no GitHub.
