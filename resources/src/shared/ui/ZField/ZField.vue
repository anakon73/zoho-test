<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'

export interface Props {
  name: string
  type?: string
  placeholder?: string
  label?: string
  as?: string
  options?: string[]
}

withDefaults(defineProps<Props>(), {
  as: 'input',
})
</script>

<template>
  <div>
    <label v-if="label" :for="name" class="block text-sm font-medium">
      {{ label }}
    </label>
    <Field
      :id="name"
      :name="name"
      :type="type"
      :as="as"
      class="w-full rounded border p-2"
      :placeholder="placeholder"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </Field>
    <ErrorMessage :name="name" class="text-sm text-red-500" />
  </div>
</template>
