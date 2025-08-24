import { FastifyInstance } from 'fastify'
import { database } from '../database'


export async function transactionsRoutes(app:FastifyInstance) {
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
    
}