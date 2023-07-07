import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'
//  Config
export const config: Knex.Config = {
  //  nome do banco de dados
  client: env.DATABASE_CLIENT,
  //  tipo de conexão
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
          //  caminho do arquivo
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,
  //  configurações do banco de dados
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}
// Exportando conexão
export const knex = setupKnex(config)
