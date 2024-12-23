import { z } from 'zod'

export const accountSchema = z.object({
  Owner: z.object({
    name: z.string(),
    id: z.string(),
    email: z.string().email(),
  }),
  Account_Name: z.string(),
  id: z.string(),
})

export const infoSchema = z.object({
  per_page: z.number(),
  count: z.number(),
  page: z.number(),
})

export const accountDataSchema = z.object({
  data: z.array(accountSchema),
  info: infoSchema,
})

export const accountCreateSchema = z.object({
  code: z.string(),
  message: z.string(),
  status: z.string(),
})
