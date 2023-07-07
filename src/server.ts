import { env } from './env'
import { app } from './app'
// Iniciando Servidor
app.listen({ host: '0.0.0.0', port: env.PORT }).then(() => {
  console.log('Servidor rodando na porta ' + env.PORT)
})
