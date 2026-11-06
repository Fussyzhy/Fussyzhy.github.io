import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { vReveal } from './composables/useReveal'
import { vMagnetic } from './composables/useMagnetic'

const app = createApp(App)
app.directive('reveal', vReveal)
app.directive('magnetic', vMagnetic)
app.mount('#app')
