import './assets/main.css'
import { firebaseApp } from './firebase/firebase'

import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})

app.use(router)

app.mount('#app')
