import { FastifyInstance } from 'fastify'
import { database } from '../database'
import { z } from 'zod'


export async function transactionsRoutes(app:FastifyInstance) {
  
  // Create Transaction
  app.post('/', async (request, reply) => {

    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(request.body)

    const transaction = await database('transactions')
      .insert({
        id: crypto.randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1
      })
      .returning('*')
  
    return reply.status(201).send(transaction)
  })

  // Get all Transactions
  app.get('/', async (request, reply) => {
    const transactions = await database('transactions')
      .select('*')

    return reply.status(200).send({
      transactions: transactions
    })
  })

  // Get Transaction by id
  app.get('/:id', async (request, reply) => {
    try {
      const getTransactionParamsSchema = z.object({
        id: z.string().min(1),
      })

      const { id } = getTransactionParamsSchema.parse(request.params)

      const transaction = await database('transactions')
        .where('id', id)
        .first()
      
      if (!transaction) {
        return reply.status(404).send({
          error: 'Transaction not found'
        })
      }
      
      return reply.status(200).send({ transaction })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          error: 'Invalid ID format'
        })
      }
      
      return reply.status(500).send({
        error: 'Internal server error'
      })
    }
  })
    
}