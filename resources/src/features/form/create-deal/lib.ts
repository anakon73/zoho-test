import { z } from 'zod'

export const validationSchema = z.object({
  deal_name: z
    .string()
    .min(2, { message: 'Deal name must be at least 2 characters.' }),
  deal_stage: z.enum([
    'Qualification',
    'Proposal',
    'Negotiation',
    'Closed Won',
    'Closed Lost',
  ], { message: 'Deal stage is required.' }),
  account_id: z
    .string()
    .min(1, { message: 'Account is required and cannot be empty.' }),
})

export const initialValues: z.infer<typeof validationSchema> = {
  deal_name: '',
  deal_stage: 'Qualification',
  account_id: '',
}
