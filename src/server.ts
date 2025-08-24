import fastify from 'fastify'
import { database } from './database'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  const tables = await database('sqlite_master').select('*')
  return tables
})

app.post('/transactions', async () => {
  const transactions = await database('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    .returning('*')

  return transactions
})

app.get('/transactions', async () => {
  const transactions = await database('transactions').select('*')
  return transactions
})

app.listen({
  port: env.PORT,
}).then(() => {
  console.log('HTTP Server Running!')
})