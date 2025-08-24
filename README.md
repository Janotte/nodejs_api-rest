# API Rest com Node.js e Fastify

## Configuração do ESLint

Este projeto está configurado com ESLint e Prettier para manter a qualidade e consistência do código.

### Regras configuradas:
- **Aspas simples** (`'`) em vez de aspas duplas
- **Dois espaços** para indentação
- **Sem ponto e vírgula** no final das linhas
- **Validação de TypeScript** habilitada

### Scripts disponíveis:

```bash
# Verificar problemas de linting
npm run lint

# Corrigir problemas automaticamente
npm run lint:fix

# Formatar código com Prettier
npm run format
```

### Configuração do VS Code

Para habilitar a correção automática ao salvar, certifique-se de ter as seguintes extensões instaladas:
- ESLint
- Prettier - Code formatter

As configurações do workspace já estão configuradas para:
- Formatar automaticamente ao salvar
- Corrigir problemas do ESLint ao salvar
- Usar Prettier como formatador padrão

### Desenvolvimento

```bash
# Executar em modo de desenvolvimento
npm run dev
```

O servidor estará rodando em `http://localhost:3333`
