import { z } from 'zod'

export const validationSchema = z.object({
  account_name: z.string().nonempty({ message: 'Account name is required.' }),
  account_website: z.string()
    .url({ message: 'Invalid URL format.' })
    .nullable(),
  account_phone: z
    .string()
    .regex(
      /^\+\d{6,}$/,
      { message: 'Invalid phone number format.' },
    )
    .nullable(),
})

export const initialValues: z.infer<typeof validationSchema> = {
  account_name: '',
  account_website: null,
  account_phone: null,
}
