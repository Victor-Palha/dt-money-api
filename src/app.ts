import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import { env } from './env'
// Iniciando APP
export const app = fastify()

// Middlewares
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '90d',
  },
})

app.register(cookie)
app.register(cors, {
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true,
})

// Rotas
app.register(transactionsRoutes, {
  prefix: '/transactions',
})
