import { FastifyInstance } from 'fastify'
import { database } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id'


export async function transactionsRoutes(app:FastifyInstance) {
  
  // Create Transaction
  app.post('/', async (request, reply) => {

    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 *24 * 7, // 7 dias
      })
    }

    const transaction = await database('transactions')
      .insert({
        id: crypto.randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId
      })
      .returning('*')
  
    return reply.status(201).send(transaction)
  })

  // Get all Transactions
  app.get('/', {preHandler: [checkSessionIdExists] }, async (request, reply) => {
    const { sessionId } = request.cookies

    const transactions = await database('transactions')
      .where('session_id', sessionId)
      .select('*')

    return reply.status(200).send({
      transactions: transactions
    })
  })

  // Get Transaction by id
  app.get('/:id', {preHandler: [checkSessionIdExists] },async (request, reply) => {
    try {
      const { sessionId } = request.cookies

      const getTransactionParamsSchema = z.object({
        id: z.string().min(1),
      })

      const { id } = getTransactionParamsSchema.parse(request.params)

      const transaction = await database('transactions')
        .where({'id': id, 'session_id': sessionId})
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

  // Get Summary
  app.get('/summary', {preHandler: [checkSessionIdExists] }, async (request, reply) => {
    const { sessionId } = request.cookies
    const summary = await database('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount'})
      .first()

    return reply.status(200).send({ summary })
  })
    
}