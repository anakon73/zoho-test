<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import type { CreateResponse } from '@/shared/types'
import { cn } from '@/shared/lib/styles'
import { useAccounts } from '@/shared/api/account'
import { useDealCreate } from '@/shared/api/deal'
import { ZButton } from '@/shared/ui/ZButton'
import { ZField } from '@/shared/ui/ZField'

import { initialValues, validationSchema } from './lib'

const { data } = useAccounts()
const { mutate } = useDealCreate()

const message = ref<CreateResponse | undefined>(undefined)

const { handleSubmit, resetForm, values } = useForm({
  validationSchema: toTypedSchema(validationSchema),
  initialValues,
})

const onSubmit = handleSubmit((values) => {
  const account = data.value?.data?.find(
    a => a.accountName === values.account_id,
  )

  if (!account) {
    console.error('Account not found')
    return
  }

  resetForm()

  mutate(
    { ...values, account_id: account.id },
    { onSuccess: data => message.value = data },
  )
})

const accounts = computed(() => {
  if (data.value && Array.isArray(data.value.data)) {
    return data.value.data.map(a => a.accountName)
  }
  return []
})

watch(values, () => message.value = undefined, { deep: true })
</script>

<template>
  <div v-if="data" class="mx-auto w-full rounded bg-white">
    <h2 class="mb-4 text-2xl font-bold">
      Create Deal
    </h2>

    <form class="space-y-4" @submit="onSubmit">
      <ZField
        name="deal_name"
        type="text"
        placeholder="Enter deal name"
        label="Deal Name"
      />

      <ZField
        name="deal_stage"
        as="select"
        label="Deal Stage"
        :options="[
          'Qualification',
          'Proposal',
          'Negotiation',
          'Closed Won',
          'Closed Lost',
        ]"
      />

      <ZField
        name="account_id"
        as="select"
        placeholder="+123456789"
        label="Account"
        :options="accounts"
      />

      <ZButton type="submit">
        Submit
      </ZButton>

      <p
        v-if="message"
        :class="cn(
          message.status === 'success' ? 'text-green-600' : 'text-red-600',
        )"
      >
        {{ message.message }}
      </p>
    </form>
  </div>
  <div v-else class="text-center">
    Loading...
  </div>
</template>
