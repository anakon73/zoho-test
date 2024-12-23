export type DealStages =
  'Qualification'
  | 'Proposal'
  | 'Negotiation'
  | 'Closed Won'
  | 'Closed Lost'

export interface Account {
  owner: {
    name: string
    id: string
    email: string
  }
  accountName: string
  id: string
}

export interface Info {
  perPage: number
  count: number
  page: number
}

export interface AccountData {
  data: Account[]
  info: Info
}

export type CreateResponse = {
  message: string
  status: string
  code: string
}
