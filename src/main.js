import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import { auth } from './firebase'
import  './plugin'
import '@/assets/scss/index.scss';

Vue.config.productionTip = false

import DefaultLayout from './layouts/Default.vue'
import AuthLayout from './layouts/Auth.vue'

Vue.component('default-layout', DefaultLayout)
Vue.component('auth-layout', AuthLayout)

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
