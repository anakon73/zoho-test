import type { z } from 'zod'
import { RestClient } from './RestClient'

export const client = new RestClient()

type EndpointAndSchema = {
  url: string | ((...args: any) => string)
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  schema?: z.ZodTypeAny
}

export type ApiEndpointsAndSchemas = Record<string, EndpointAndSchema>
