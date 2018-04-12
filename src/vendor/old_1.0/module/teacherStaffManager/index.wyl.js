import Vue from 'vue'
import Element from 'element-ui'
Vue.use(Element)
import '@/theme/index.css'

import App from './index.vue'
new Vue({
  el: '#app',
  render: h => h(App)
})
