# 🚀 Guia do Desenvolvedor

## 🎯 Início Rápido

### 1. Clone e Instalação
```bash
git clone <url-do-repositorio>
cd 02-API-Rest-NodeJS
npm install
```

### 2. Configuração do Ambiente
```bash
# Copie o arquivo de exemplo
cp env.example .env

# Configure suas variáveis (opcional)
# O arquivo .env já vem com valores padrão
```

### 3. Banco de Dados
```bash
# Execute as migrações
knex migrate:latest

# Verifique o status
knex migrate:status
```

### 4. Execute o Projeto
```bash
# Desenvolvimento
npm run dev

# Testes
npm test

# Build
npm run build
```

## 🏗️ Estrutura do Projeto

```
src/
├── app.ts                 # App Fastify (para testes)
├── server.ts              # Servidor HTTP
├── database.ts            # Configuração Knex
├── env/
│   └── index.ts          # Validação de .env
├── middlewares/
│   └── check-session-id.ts # Auth middleware
├── routes/
│   └── transactions.ts    # Rotas da API
└── @types/
    └── knex.d.ts         # Tipos Knex

db/
├── migrations/            # Migrações do banco
├── app.db                # Banco de desenvolvimento
└── test.db               # Banco de testes

test/
└── transactions.spec.ts   # Testes da API
```

## 🔧 Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Servidor com hot reload
npm run lint         # Verificar problemas
npm run lint:fix     # Corrigir problemas automaticamente
npm run format       # Formatar código
```

### Banco de Dados
```bash
knex migrate:latest      # Executar migrações
knex migrate:rollback    # Reverter última migração
knex migrate:rollback --all  # Reverter todas
knex migrate:status      # Status das migrações
```

### Testes
```bash
npm test                 # Executar todos os testes
npm test -- --watch      # Modo watch
npm test -- transactions.spec.ts  # Teste específico
```

### Build
```bash
npm run build            # Build para produção
npm start                # Executar build de produção
```

## 📝 Padrões de Código

### TypeScript
- ✅ Sempre use tipos explícitos
- ✅ Use interfaces para objetos
- ✅ Prefira `const` sobre `let`
- ✅ Use `async/await` para operações assíncronas

### Nomenclatura
- ✅ **Arquivos**: kebab-case (`check-session-id.ts`)
- ✅ **Funções**: camelCase (`checkSessionIdExists`)
- ✅ **Constantes**: UPPER_SNAKE_CASE (`DATABASE_URL`)
- ✅ **Interfaces**: PascalCase (`Transaction`)

### Estrutura de Funções
```typescript
export async function functionName(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    // Lógica principal
  } catch (error) {
    // Tratamento de erro
  }
}
```

## 🧪 Testes

### Estrutura de Teste
```typescript
describe('Feature', () => {
  beforeEach(() => {
    // Setup antes de cada teste
  })

  it('should do something', async () => {
    // Teste específico
  })
})
```

### Dicas para Testes
- ✅ Use `beforeEach` para limpar banco
- ✅ Teste casos de sucesso e erro
- ✅ Verifique status codes e respostas
- ✅ Use `expect.objectContaining` para objetos parciais

## 🔐 Sistema de Autenticação

### Como Funciona
1. **Primeira transação**: Gera `sessionId` automaticamente
2. **Cookie**: Armazenado por 7 dias
3. **Middleware**: Verifica `sessionId` em todas as rotas protegidas
4. **Isolamento**: Dados filtrados por `session_id`

### Middleware
```typescript
// Aplicar em rotas protegidas
app.get('/', { preHandler: [checkSessionIdExists] }, handler)
```

## 🗄️ Banco de Dados

### Schema
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  session_id TEXT
);
```

### Queries Comuns
```typescript
// Inserir
await database('transactions').insert(data).returning('*')

// Buscar
await database('transactions').where('id', id).first()

// Listar com filtro
await database('transactions')
  .where('session_id', sessionId)
  .select('*')

// Soma
await database('transactions')
  .where('session_id', sessionId)
  .sum('amount', { as: 'amount' })
  .first()
```

## 🚨 Tratamento de Erros

### Padrão de Resposta
```typescript
// Sucesso
return reply.status(200).send({ data })

// Erro de validação
return reply.status(400).send({ error: 'Invalid data' })

// Não encontrado
return reply.status(404).send({ error: 'Not found' })

// Erro interno
return reply.status(500).send({ error: 'Internal error' })
```

### Validação com Zod
```typescript
const schema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(['credit', 'debit'])
})

const data = schema.parse(request.body)
```

## 🔄 Fluxo de Desenvolvimento

### 1. Nova Funcionalidade
```bash
# Crie uma branch
git checkout -b feature/nova-funcionalidade

# Desenvolva e teste
npm test

# Commit
git add .
git commit -m "feat: adiciona nova funcionalidade"

# Push e PR
git push origin feature/nova-funcionalidade
```

### 2. Nova Migração
```bash
# Crie migração
knex migrate:make nome-da-migracao

# Edite o arquivo gerado
# Execute
knex migrate:latest
```

### 3. Nova Rota
```typescript
// 1. Adicione a rota em routes/transactions.ts
// 2. Adicione testes em test/transactions.spec.ts
// 3. Execute os testes
// 4. Atualize a documentação
```

## 📚 Recursos Úteis

### Documentação
- [Fastify](https://www.fastify.io/docs/)
- [Knex.js](https://knexjs.org/)
- [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/)

### Ferramentas
- **VS Code Extensions**: ESLint, Prettier, TypeScript
- **Postman/Insomnia**: Para testar a API
- **SQLite Browser**: Para visualizar o banco

## 🆘 Solução de Problemas

### Erros Comuns

#### "Missing script: knex"
```bash
npm install -g knex
# ou
npx knex migrate:latest
```

#### "Database locked"
```bash
# Pare o servidor
# Delete o arquivo .db
# Execute migrações novamente
```

#### "Unauthorized"
```bash
# Verifique se o cookie sessionId está sendo enviado
# Verifique se a rota tem o middleware correto
```

#### Testes falhando
```bash
# Limpe o banco de teste
rm db/test.db
# Execute migrações
knex migrate:latest
# Execute testes
npm test
```

## 📞 Suporte

- **Issues**: Abra no GitHub
- **Documentação**: Consulte os arquivos .md
- **Código**: Use como referência o código existente

---

**Boa codificação! 🚀**
