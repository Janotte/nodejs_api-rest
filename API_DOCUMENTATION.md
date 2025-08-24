# 📚 Documentação Técnica da API

## Visão Geral

Esta API REST foi desenvolvida para gerenciar transações financeiras com sistema de sessão baseado em cookies. Cada usuário tem acesso isolado às suas próprias transações através de um identificador único de sessão.

## 🔧 Arquitetura

### Stack Tecnológica
- **Framework**: Fastify 5.5.0
- **Runtime**: Node.js 18+
- **Linguagem**: TypeScript 5.9.2
- **Banco**: SQLite3 5.1.7
- **ORM**: Knex.js 3.1.0
- **Validação**: Zod 4.1.0
- **Testes**: Vitest 3.2.4 + Supertest 7.1.4

### Estrutura de Arquivos
```
src/
├── app.ts                 # Configuração do Fastify
├── server.ts              # Servidor HTTP
├── database.ts            # Configuração do Knex
├── env/
│   └── index.ts          # Validação de variáveis de ambiente
├── middlewares/
│   └── check-session-id.ts # Middleware de autenticação
├── routes/
│   └── transactions.ts    # Rotas da API
└── @types/
    └── knex.d.ts         # Tipos TypeScript para Knex
```

## 🗄️ Banco de Dados

### Schema da Tabela `transactions`

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY,           -- Identificador único da transação
  title TEXT NOT NULL,           -- Título/descrição da transação
  amount DECIMAL(10,2) NOT NULL, -- Valor (positivo para crédito, negativo para débito)
  created_at TIMESTAMP DEFAULT NOW() NOT NULL, -- Data de criação
  session_id TEXT                -- ID da sessão do usuário
);
```

### Migrações Disponíveis
1. `20250824022255_create-transactions.ts` - Criação da tabela principal
2. `20250824024755_add-session-id-to-transactions.ts` - Adição do campo session_id

## 🔐 Sistema de Autenticação

### Geração de Sessão
- **Primeira transação**: Gera automaticamente um `sessionId` único
- **Cookie**: Armazenado com duração de 7 dias
- **Isolamento**: Todas as operações são filtradas por `session_id`

### Middleware de Autenticação
```typescript
export async function checkSessionIdExists(
  request: FastifyRequest, 
  reply: FastifyReply
) {
  const sessionId = request.cookies.sessionId
  
  if (!sessionId) {
    return reply.status(401).send({
      message: 'Unauthorized!'
    })
  }
}
```

## 📡 Endpoints da API

### Base URL
```
http://localhost:3333/transactions
```

### 1. POST /transactions
**Cria uma nova transação**

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "title": "string (obrigatório)",
  "amount": "number (obrigatório)",
  "type": "credit | debit (obrigatório)"
}
```

**Resposta de Sucesso (201):**
```json
{
  "id": "uuid-gerado",
  "title": "Salário",
  "amount": 5000,
  "created_at": "2025-08-24T13:51:32.000Z",
  "session_id": "uuid-sessao"
}
```

**Resposta de Erro (400):**
```json
{
  "error": "Invalid input data"
}
```

### 2. GET /transactions
**Lista todas as transações do usuário**

**Headers:**
```
Cookie: sessionId=uuid-sessao
```

**Resposta de Sucesso (200):**
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

**Resposta de Erro (401):**
```json
{
  "message": "Unauthorized!"
}
```

### 3. GET /transactions/:id
**Busca uma transação específica por ID**

**Headers:**
```
Cookie: sessionId=uuid-sessao
```

**Parâmetros:**
- `id`: UUID da transação

**Resposta de Sucesso (200):**
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

**Respostas de Erro:**
```json
// 404 - Transação não encontrada
{
  "error": "Transaction not found"
}

// 401 - Não autorizado
{
  "message": "Unauthorized!"
}

// 400 - ID inválido
{
  "error": "Invalid ID format"
}
```

### 4. GET /transactions/summary
**Retorna o resumo financeiro da conta**

**Headers:**
```
Cookie: sessionId=uuid-sessao
```

**Resposta de Sucesso (200):**
```json
{
  "summary": {
    "amount": 3000
  }
}
```

**Resposta de Erro (401):**
```json
{
  "message": "Unauthorized!"
}
```

## 🔍 Validação de Dados

### Schema de Criação de Transação
```typescript
const createTransactionBodySchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(['credit', 'debit']),
})
```

### Schema de Parâmetros de ID
```typescript
const getTransactionParamsSchema = z.object({
  id: z.string().min(1),
})
```

## 🧪 Testes

### Estrutura de Testes
```
test/
└── transactions.spec.ts
    ├── should be able to create a new transaction
    ├── should be able to list all transactions
    ├── should be able to get a specific transaction
    └── should be able to get the summary
```

### Execução de Testes
```bash
# Executar todos os testes
npm test

# Modo watch
npm test -- --watch

# Testes específicos
npm test -- transactions.spec.ts
```

### Banco de Teste
- **Arquivo**: `./db/test.db`
- **Configuração**: `.env.test`
- **Isolamento**: Cada teste executa em banco limpo

## ⚙️ Configuração

### Variáveis de Ambiente

#### Desenvolvimento (.env)
```env
NODE_ENV=development
DATABASE_URL="./db/app.db"
PORT=3333
```

#### Teste (.env.test)
```env
DATABASE_URL="./db/test.db"
```

#### Produção
```env
NODE_ENV=production
DATABASE_URL="./db/production.db"
PORT=3333
```

### Scripts Disponíveis
```json
{
  "dev": "nodemon",
  "build": "tsup src --out-dir build",
  "test": "vitest",
  "lint": "eslint src/**/*.ts",
  "lint:fix": "eslint src/**/*.ts --fix",
  "format": "prettier --write src/**/*.ts",
  "knex": "knex"
}
```

## 🚀 Deploy

### Build para Produção
```bash
npm run build
```

### Execução em Produção
```bash
npm start
```

### Considerações de Produção
- Usar banco de dados robusto (PostgreSQL, MySQL)
- Configurar variáveis de ambiente seguras
- Implementar rate limiting
- Configurar CORS adequadamente
- Implementar logging estruturado
- Configurar monitoramento e métricas

## 🔒 Segurança

### Implementado
- ✅ Validação de entrada com Zod
- ✅ Isolamento de dados por sessão
- ✅ Sanitização de parâmetros
- ✅ Tratamento de erros sem vazamento de informações

### Recomendações para Produção
- 🔒 Implementar rate limiting
- 🔒 Configurar CORS adequadamente
- 🔒 Implementar autenticação JWT
- 🔒 Configurar HTTPS
- 🔒 Implementar audit logging
- 🔒 Configurar backup automático

## 📊 Monitoramento

### Logs Recomendados
- Requisições HTTP (status, tempo, IP)
- Erros de validação
- Operações de banco de dados
- Performance das queries
- Uso de memória e CPU

### Métricas Importantes
- Taxa de sucesso das requisições
- Tempo de resposta médio
- Número de transações por sessão
- Uso de recursos do banco
- Erros por tipo

## 🤝 Contribuição

### Padrões de Código
- TypeScript strict mode
- ESLint + Prettier
- Commits semânticos
- Testes para novas funcionalidades
- Documentação atualizada

### Processo de Desenvolvimento
1. Fork do repositório
2. Criação de branch feature
3. Implementação com testes
4. Pull Request com descrição clara
5. Code review obrigatório
6. Merge após aprovação

---

**Última atualização**: Agosto 2025  
**Versão da API**: 1.0.0  
**Status**: ✅ Produção Ready
