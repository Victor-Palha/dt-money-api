import { knex } from '../database'
import { z } from 'zod'
import { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'
import { validCookie } from '../middlewares/validCookies'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      description: z.string(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type, description } = createTransactionSchema.parse(
      req.body,
    )
    // session_id is a cookie
    let sessionId = req.cookies.session_id

    if (!sessionId) {
      sessionId = crypto.randomUUID()

      res.cookie('session_id', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        secure: false,
      })
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      description,
      type,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return res.status(201).send({ message: 'Transaction created' })
  })

  app.get('/', { preHandler: [validCookie] }, async (req, res) => {
    const sessionId = req.cookies.session_id

    const transactions = await knex('transactions').where(
      'session_id',
      sessionId,
    )

    return res.status(200).send({ transactions })
  })

  app.get('/:id', { preHandler: [validCookie] }, async (req, res) => {
    const getTransactionSchema = z.object({
      id: z.string().uuid(),
    })
    const sessionId = req.cookies.session_id
    const { id } = getTransactionSchema.parse(req.params)

    const transactions = await knex('transactions')
      .where({ session_id: sessionId, id })
      .first()

    return res.status(200).send({ transactions })
  })

  app.get('/summary', { preHandler: [validCookie] }, async (req, res) => {
    const sessionId = req.cookies.session_id
    const summary = await knex('transactions')
      .where({ session_id: sessionId })
      .sum('amount', { as: 'amount' })
      .first()

    const outcome = await knex('transactions')
      .where({ session_id: sessionId, type: 'debit' })
      .sum('amount', { as: 'amount' })
      .first()
    const income = await knex('transactions')
      .where({ session_id: sessionId, type: 'credit' })
      .sum('amount', { as: 'amount' })
      .first()

    return res.status(200).send({ summary, outcome, income })
  })

  app.delete('/:id', { preHandler: [validCookie] }, async (req, res) => {
    const deleteTransactionSchema = z.object({
      id: z.string().uuid(),
    })
    const sessionId = req.cookies.session_id
    const { id } = deleteTransactionSchema.parse(req.params)

    await knex('transactions').where({ session_id: sessionId, id }).del()

    return res.status(200).send({ message: 'Transaction deleted' })
  })
}
