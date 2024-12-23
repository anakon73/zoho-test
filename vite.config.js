import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import laravel from 'laravel-vite-plugin'

export default defineConfig({
  plugins: [
    vue(),
    laravel({
      input: ['resources/src/main.css', 'resources/src/app.ts'],
      refresh: true,
    }),
  ],
  resolve: {
    alias: {
      '@': '/resources/src',
    },
  },
})
