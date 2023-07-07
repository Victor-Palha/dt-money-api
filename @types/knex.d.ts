//  eslint-disable-next-line
import { Knex } from 'knex'

type Transactions = {
  id: string
  title: string
  amount: number
  description: string
  type: string
  created_at: string
  session_id?: string
}
declare module 'knex/types/tables' {
  export interface Tables {
    transactions: Transactions
  }
}
