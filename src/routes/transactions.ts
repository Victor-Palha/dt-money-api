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

    // Get Token From user
    const tokenAuth = req.headers.authorization

    if (tokenAuth === undefined) {
      const newUser = crypto.randomUUID()

      const token = await res.jwtSign(
        {},
        {
          sign: {
            sub: newUser,
          },
        },
      )
      await knex('transactions').insert({
        id: crypto.randomUUID(),
        title,
        description,
        type,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: newUser,
      })

      return res.status(201).send({ message: 'Transaction created', token })
    }

    //  If user already has token

    await req.jwtVerify()
    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      description,
      type,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: req.user.sub,
    })

    return res.status(201).send({ message: 'Transaction created' })
  })

  app.get('/', { preHandler: [validCookie] }, async (req, res) => {
    const sessionId = req.user.sub

    const transactions = await knex('transactions')
      .where('session_id', sessionId)
      .orderBy('created_at', 'desc')

    return res.status(200).send({ transactions })
  })

  app.get('/query', { preHandler: [validCookie] }, async (req, res) => {
    const sessionId = req.user.sub
    const { search } = req.query as string

    const transactions = await knex('transactions')
      .where((transaction) => {
        transaction.where('session_id', sessionId)
      })
      .andWhere('title', 'like', `%${search}%`)
      .orderBy('created_at', 'desc')

    return res.status(200).send({ transactions })
  })

  app.get('/:id', { preHandler: [validCookie] }, async (req, res) => {
    const getTransactionSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionSchema.parse(req.params)

    const transactions = await knex('transactions')
      .where({ session_id: req.user.sub, id })
      .first()

    return res.status(200).send({ transactions })
  })

  app.get('/summary', { preHandler: [validCookie] }, async (req, res) => {
    const sessionId = req.user.sub
    let summary = await knex('transactions')
      .where({ session_id: sessionId })
      .sum('amount', { as: 'amount' })
      .first()

    let outcome = await knex('transactions')
      .where({ session_id: sessionId, type: 'debit' })
      .sum('amount', { as: 'amount' })
      .first()
    let income = await knex('transactions')
      .where({ session_id: sessionId, type: 'credit' })
      .sum('amount', { as: 'amount' })
      .first()

    if (outcome === undefined) {
      outcome = { amount: 0 }
    }
    if (income === undefined) {
      income = { amount: 0 }
    }
    if (summary === undefined) {
      summary = { amount: 0 }
    }
    return res.status(200).send({ summary, outcome, income })
  })

  app.delete('/:id', { preHandler: [validCookie] }, async (req, res) => {
    const deleteTransactionSchema = z.object({
      id: z.string().uuid(),
    })
    const sessionId = req.user.sub
    const { id } = deleteTransactionSchema.parse(req.params)

    await knex('transactions').where({ session_id: sessionId, id }).del()

    return res.status(200).send({ message: 'Transaction deleted' })
  })
}
