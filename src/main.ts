import './assets/main.css'
// import 'vue-toast-notification/dist/theme-sugar.css'
import 'vue-toast-notification/dist/theme-default.css'
import { firebaseApp } from './firebase/firebase'

import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { createPinia } from 'pinia'
// import ToastPlugin from 'vue-toast-notification'
import VueToast from 'vue-toast-notification'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

app.use(VueToast, {
  position: 'top-right', // 👈 default for all toasts
  duration: 3000,
  dismissible: true,
})

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})

app.use(router)

app.mount('#app')
