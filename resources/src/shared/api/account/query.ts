import { useMutation, useQuery } from '@tanstack/vue-query'
import { createAccount, getAccounts } from './api'

export function useAccounts() {
  return useQuery({
    queryKey: ['account', 'all'],
    queryFn: getAccounts,
    refetchOnWindowFocus: false,
  })
}

export function useAccountCreate() {
  return useMutation({
    mutationFn: createAccount,
  })
}
