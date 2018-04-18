import Vue from 'vue'
import '@/theme/index.css'
import {
  Button
} from 'element-ui'
import testResolver from '@/module/revolution-vue/customer-proxy/ListResolver/resolver.js'
Vue.component(Button.name, Button)
var test = testResolver.build({ '_fields': { 'inner_prop': { 'size': 'small' }}})
var test2 = testResolver.build()
var formBind = {
  'binbin': 'lzn'
}
// inputCom.getResolver().bindDataSource(formBind);
test.getResolver()._v_bind(formBind, 'binbin')
test2.getResolver()._v_bind(formBind, 'dddd')
new Vue({
  el: '#bodyBox',
  data: {
  },
  components: {
    'test': test,
    'test1': test2
  },
  created: function() {},
  mounted: function() {
  },
  methods: {
    submitQuestion: function() {

      // this.buildFormStore.getResolver().addItems(buildFormStore._fields.items);
    },
    printInfo: function() {
      console.log('inner-------------------------')
      console.log(formBind)
      formBind.name = 'chengxuxuan'
    }
  },
  watch: {}
})
