# 🚀 API Rest com Node.js e Fastify

Uma API REST completa para gerenciamento de transações financeiras, construída com Node.js, Fastify, TypeScript e SQLite.

## ✨ Funcionalidades

- ✅ **Criar transações** (crédito/débito)
- ✅ **Listar todas as transações** de um usuário
- ✅ **Buscar transação específica** por ID
- ✅ **Resumo financeiro** da conta do usuário
- ✅ **Sistema de sessão** com cookies
- ✅ **Validação de dados** com Zod
- ✅ **Testes automatizados** com Vitest
- ✅ **Migrações de banco** com Knex.js

## 🛠️ Tecnologias

- **Runtime**: Node.js
- **Framework**: Fastify
- **Linguagem**: TypeScript
- **Banco de Dados**: SQLite3
- **Query Builder**: Knex.js
- **Validação**: Zod
- **Testes**: Vitest + Supertest
- **Linting**: ESLint + Prettier
- **Build**: Tsup

## 🚀 Como executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd 02-API-Rest-NodeJS

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

### Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=development
DATABASE_URL="./db/app.db"
PORT=3333
```

### Executando o projeto

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start

# Testes
npm test

# Linting
npm run lint
npm run lint:fix

# Formatação
npm run format
```

## 🗄️ Banco de Dados

### Estrutura

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  session_id TEXT
);
```

### Migrações

```bash
# Executar migrações
knex migrate:latest

# Reverter migrações
knex migrate:rollback

# Ver status
knex migrate:status
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3333/transactions
```

### 1. Criar Transação
```http
POST /transactions
Content-Type: application/json

{
  "title": "Salário",
  "amount": 5000,
  "type": "credit"
}
```

**Resposta:**
```json
{
  "id": "uuid-gerado",
  "title": "Salário",
  "amount": 5000,
  "created_at": "2025-08-24T13:51:32.000Z",
  "session_id": "uuid-sessao"
}
```

### 2. Listar Transações
```http
GET /transactions
Cookie: sessionId=uuid-sessao
```

**Resposta:**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salário",
      "amount": 5000,
      "created_at": "2025-08-24T13:51:32.000Z",
      "session_id": "uuid-sessao"
    }
  ]
}
```

### 3. Buscar Transação por ID
```http
GET /transactions/{id}
Cookie: sessionId=uuid-sessao
```

**Resposta:**
```json
{
  "transaction": {
    "id": "uuid",
    "title": "Salário",
    "amount": 5000,
    "created_at": "2025-08-24T13:51:32.000Z",
    "session_id": "uuid-sessao"
  }
}
```

### 4. Resumo Financeiro
```http
GET /transactions/summary
Cookie: sessionId=uuid-sessao
```

**Resposta:**
```json
{
  "summary": {
    "amount": 3000
  }
}
```

## 🔐 Sistema de Sessão

- Cada usuário recebe um `sessionId` único via cookie
- O cookie é criado automaticamente na primeira transação
- Dura 7 dias por padrão
- Todas as operações são filtradas por `session_id`

## 🧪 Testes

### Executando testes
```bash
# Todos os testes
npm test

# Testes em modo watch
npm test -- --watch

# Testes específicos
npm test -- transactions.spec.ts
```

### Cobertura de testes
- ✅ Criação de transações
- ✅ Listagem de transações
- ✅ Busca por ID
- ✅ Resumo financeiro
- ✅ Validação de sessão

## 📁 Estrutura do Projeto

```
src/
├── @types/           # Tipos TypeScript
├── env/              # Configuração de ambiente
├── middlewares/      # Middlewares (check-session-id)
├── routes/           # Rotas da API
│   └── transactions.ts
├── app.ts            # Configuração do Fastify
├── database.ts       # Configuração do Knex
└── server.ts         # Servidor principal

db/
├── migrations/       # Migrações do banco
└── app.db           # Banco SQLite

test/
└── transactions.spec.ts  # Testes da API
```

## ⚙️ Configurações

### ESLint e Prettier

```bash
# Verificar problemas
npm run lint

# Corrigir automaticamente
npm run lint:fix

# Formatar código
npm run format
```

**Regras configuradas:**
- Aspas simples (`'`)
- Dois espaços para indentação
- Sem ponto e vírgula
- Validação de TypeScript

### VS Code

Extensões recomendadas:
- ESLint
- Prettier - Code formatter

Configurações automáticas:
- Formatação ao salvar
- Correção de problemas ao salvar
- Prettier como formatador padrão

## 🚀 Deploy

### Build para produção
```bash
npm run build
```

### Variáveis de ambiente para produção
```env
NODE_ENV=production
DATABASE_URL="./db/production.db"
PORT=3333
```

## 📝 Regras de Negócio

1. **Transações de crédito**: Valores positivos
2. **Transações de débito**: Valores negativos (multiplicados por -1)
3. **Isolamento de usuários**: Cada sessão só vê suas transações
4. **Validação de dados**: Todos os campos são obrigatórios
5. **IDs únicos**: Cada transação recebe um UUID único

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Sandro André Janotte**

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
