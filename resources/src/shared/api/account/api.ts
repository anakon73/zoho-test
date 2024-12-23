import { type ApiEndpointsAndSchemas, client } from '../lib'

import { accountCreateSchema, accountDataSchema } from './types'
import { normalizeAccountData } from './normalizer'

const endpoints = {
  getAccounts: {
    url: '/api/accounts',
    method: 'get',
    schema: accountDataSchema,
  },
  create: {
    url: '/api/accounts',
    method: 'post',
    schema: accountCreateSchema,
  },
} satisfies ApiEndpointsAndSchemas

export async function getAccounts() {
  const { url, method, schema } = endpoints.getAccounts

  const data = await client[method](url, schema)

  return normalizeAccountData(data)
}

export type CreateAccountParams = {
  account_name: string
  account_phone: string | null
  account_website: string | null
}
export async function createAccount(params: CreateAccountParams) {
  const { url, method, schema } = endpoints.create

  const data = await client[method](url, params)

  return schema.parse(data)
}
