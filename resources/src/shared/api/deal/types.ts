import { z } from 'zod'

export const dealCreateSchema = z.object({
  code: z.string(),
  message: z.string(),
  status: z.string(),
})
