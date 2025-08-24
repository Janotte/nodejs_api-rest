# 📝 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-08-24

### ✅ Adicionado
- **API REST completa** para gerenciamento de transações financeiras
- **Sistema de sessão** baseado em cookies para isolamento de usuários
- **Validação de dados** com Zod para todas as entradas
- **Sistema de transações** com suporte a crédito e débito
- **Resumo financeiro** da conta do usuário
- **Testes automatizados** com Vitest e Supertest
- **Migrações de banco** com Knex.js
- **Configuração de ambiente** com validação
- **Linting e formatação** com ESLint e Prettier
- **Build de produção** com Tsup

### 🔧 Funcionalidades Implementadas
- `POST /transactions` - Criar nova transação
- `GET /transactions` - Listar transações do usuário
- `GET /transactions/:id` - Buscar transação específica
- `GET /transactions/summary` - Resumo financeiro

### 🗄️ Banco de Dados
- Tabela `transactions` com campos: id, title, amount, created_at, session_id
- Migrações para criação da estrutura
- Suporte a SQLite3 com Knex.js

### 🔐 Segurança
- Middleware de autenticação por sessão
- Isolamento de dados por usuário
- Validação e sanitização de inputs
- Tratamento de erros sem vazamento de informações

### 🧪 Testes
- Testes de integração para todas as rotas
- Banco de dados de teste isolado
- Cobertura completa das funcionalidades
- Testes de validação e tratamento de erros

### 📚 Documentação
- README.md completo com instruções de uso
- Documentação técnica da API
- Exemplos de uso e configuração
- Guia de contribuição

### ⚙️ Configuração
- Scripts npm para desenvolvimento, teste e build
- Configuração de ambiente (.env)
- Configuração de linting e formatação
- Configuração do TypeScript

### 🚀 Deploy
- Build otimizado para produção
- Configuração de variáveis de ambiente
- Scripts de migração de banco
- Documentação de deploy

## [0.1.0] - 2025-08-23

### 🔧 Adicionado
- Estrutura inicial do projeto
- Configuração básica do Fastify
- Configuração do TypeScript
- Configuração inicial do ESLint e Prettier

---

## 📋 Legenda

- `✅ Adicionado` - Novas funcionalidades
- `🔧 Funcionalidades` - Detalhes das funcionalidades
- `🗄️ Banco de Dados` - Mudanças relacionadas ao banco
- `🔐 Segurança` - Melhorias de segurança
- `🧪 Testes` - Adições relacionadas a testes
- `📚 Documentação` - Melhorias na documentação
- `⚙️ Configuração` - Mudanças de configuração
- `🚀 Deploy` - Melhorias no processo de deploy
- `🐛 Corrigido` - Correções de bugs
- `⚠️ Alterado` - Mudanças em funcionalidades existentes
- `🗑️ Removido` - Funcionalidades removidas
- `🔒 Segurança` - Correções de segurança

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório do projeto.

---

**Última atualização**: Agosto 2025
