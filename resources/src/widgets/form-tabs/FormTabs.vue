<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'

import { FormCreateDeal } from '@/features/form/create-deal'
import { FormCreateAccount } from '@/features/form/create-account'
</script>

<template>
  <TabsRoot
    class="flex w-full max-w-md flex-col shadow-md"
    default-value="deal"
  >
    <TabsList
      class="relative flex shrink-0 border-b border-gray-400"
      aria-label="Manage your account"
    >
      <TabsTrigger
        class="
          flex h-[45px] flex-1 select-none items-center justify-center
          rounded-tl-md bg-white px-5 text-[15px] font-bold leading-none
          text-mauve11 outline-none transition-colors

          data-[state=active]:text-blue-600
          data-[state=active]:hover:text-blue-700

          hover:text-blue-400
        "
        value="deal"
      >
        Deal
      </TabsTrigger>
      <TabsTrigger
        class="
          flex h-[45px] flex-1 select-none items-center justify-center
          rounded-tr-md bg-white px-5 font-bold leading-none text-mauve11
          outline-none transition-colors

          data-[state=active]:text-blue-600
          data-[state=active]:hover:text-blue-700

          hover:text-blue-500
        "
        value="account"
      >
        Account
      </TabsTrigger>
    </TabsList>
    <TabsContent
      class="grow rounded-b-md bg-white p-5 outline-none"
      value="deal"
    >
      <FormCreateDeal />
    </TabsContent>
    <TabsContent
      class="grow rounded-b-md bg-white p-5 outline-none"
      value="account"
    >
      <FormCreateAccount />
    </TabsContent>
  </TabsRoot>
</template>
