/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'


// Import AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

AOS.init({
  duration: 1000,
  once: false,
})
