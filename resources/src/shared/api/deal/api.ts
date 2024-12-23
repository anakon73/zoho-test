import type { DealStages } from '@/shared/types'
import { type ApiEndpointsAndSchemas, client } from '../lib'
import { dealCreateSchema } from './types'

const endpoints = {
  create: {
    url: '/api/deals',
    method: 'post',
    schema: dealCreateSchema,
  },
} satisfies ApiEndpointsAndSchemas

export type CreateDealParams = {
  deal_name: string
  deal_stage: DealStages
  account_id: string
}
export async function createDeal(params: CreateDealParams) {
  const { url, method, schema } = endpoints.create

  const data = await client[method](url, params)

  return schema.parse(data)
}
