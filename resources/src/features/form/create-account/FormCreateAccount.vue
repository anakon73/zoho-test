<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import type { CreateResponse } from '@/shared/types'
import { cn } from '@/shared/lib/styles'
import { useAccountCreate } from '@/shared/api/account'
import { ZField } from '@/shared/ui/ZField'
import { ZButton } from '@/shared/ui/ZButton'

import { initialValues, validationSchema } from './lib'

const { mutate } = useAccountCreate()

const message = ref<CreateResponse | undefined>(undefined)

const { handleSubmit, values, resetForm } = useForm({
  validationSchema: toTypedSchema(validationSchema),
  initialValues,
})

const onSubmit = handleSubmit((values) => {
  resetForm()

  mutate(values, { onSuccess: data => message.value = data })
})

watch(values, () => message.value = undefined, { deep: true })
</script>

<template>
  <div class="mx-auto w-full rounded bg-white">
    <h2 class="mb-4 text-2xl font-bold">
      Create Account
    </h2>

    <form class="space-y-4" @submit="onSubmit">
      <ZField
        name="account_name"
        type="text"
        placeholder="Enter account name"
        label="Account Name"
      />

      <ZField
        name="account_website"
        type="text"
        placeholder="https://example.com"
        label="Account Website"
      />

      <ZField
        name="account_phone"
        type="text"
        placeholder="+123456789"
        label="Account Phone"
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
</template>
