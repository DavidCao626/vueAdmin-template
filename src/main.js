import Vue from 'vue'

// import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'

import store from './store'

import i18n from './lang' // 对应lang目录 提供多语言支持
import '~/icons' // icon
 import '~/permission' // permission control

// import './mock' // simulation data


import * as filters from './filters' // global filters

import { Pagedefault, tableLayout } from '~/components/Pageslayout'
Vue.component('page', Pagedefault)
Vue.component("elx-table", tableLayout);

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
  size: 'medium'
})
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
