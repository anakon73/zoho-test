import type { z } from 'zod'
import { objectPick } from '@antfu/utils'

import type { Account, AccountData, Info } from '@/shared/types'
import type { accountDataSchema, accountSchema, infoSchema } from './types'

export function normalizeAccount(
  account: z.infer<typeof accountSchema>,
): Account {
  return {
    ...objectPick(account, ['id']),
    owner: account.Owner,
    accountName: account.Account_Name,
  }
}

export function normalizeInfo(info: z.infer<typeof infoSchema>): Info {
  return {
    ...objectPick(info, ['page', 'count']),
    perPage: info.per_page,
  }
}

export function normalizeAccountData(
  data: z.infer<typeof accountDataSchema>,
): AccountData {
  return {
    data: data.data.map(normalizeAccount),
    info: normalizeInfo(data.info),
  }
}
