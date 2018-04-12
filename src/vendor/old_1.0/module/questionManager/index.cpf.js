import Vue from 'vue'
import 'normalize.css'// 重置浏览器样式
import App from './index.vue'
import { store } from './store/store'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
