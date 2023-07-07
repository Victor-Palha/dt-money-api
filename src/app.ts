import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
// Iniciando APP
export const app = fastify()

// Middlewares
app.register(cookie)
app.register(cors, {
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true,
})

// Rotas
app.register(transactionsRoutes, {
  prefix: '/transactions',
})
