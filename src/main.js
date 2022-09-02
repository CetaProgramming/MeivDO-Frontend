import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas} from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios';

axios.defaults.withCredentials = true;

window.axios = axios;


const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
library.add(fas)
library.add(faUser)
app.component('fas', FontAwesomeIcon)
app.mount('#app')

