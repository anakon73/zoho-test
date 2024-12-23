import { useMutation } from '@tanstack/vue-query'
import { createDeal } from './api'

export function useDealCreate() {
  return useMutation({
    mutationFn: createDeal,
  })
}
