import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './app/App.vue'
import './app/main.css'

const app = createApp(App)

app.use(VueQueryPlugin)

app.mount('#app')
