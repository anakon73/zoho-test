<script setup lang="ts">
export interface Props {
  type?: HTMLButtonElement['type']
}

withDefaults(defineProps<Props>(), {
  type: 'button',
})
</script>

<template>
  <button
    :type="type"
    class="
      w-full rounded bg-blue-500 px-4 py-2 text-white

      hover:bg-blue-600
    "
  >
    <slot />
  </button>
</template>
