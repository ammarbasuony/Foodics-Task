import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia, PiniaVuePlugin } from 'pinia'

import vSelect from 'vue-select'
import vModal from 'vue-js-modal'
import VueTimepicker from 'vue2-timepicker'


import 'vue-js-modal/dist/styles.css'
import "./styles/main.css";
import 'vue-select/dist/vue-select.css';
import 'vue2-timepicker/dist/VueTimepicker.css'

Vue.config.productionTip = false

Vue.use(PiniaVuePlugin)
Vue.use(vModal)
Vue.component('v-select', vSelect)
Vue.component('vue-timepicker', VueTimepicker)

const pinia = createPinia()

new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
