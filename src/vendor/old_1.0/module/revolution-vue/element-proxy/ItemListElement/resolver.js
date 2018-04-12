import Vue from 'vue'
import {
  Input
} from 'element-ui'
import '@/theme/index.css'
import inner from './template.vue'
import appItem from '../../customer-proxy/Item.vue'
import appItems from '../../customer-proxy/Items.vue'
import factory from '@/components/devote-vue/resolvers/AppendPropComponentFactory.js'
import resolver from '@/components/devote-vue/resolvers/resolverClass/ItemModelBlockResolver.js'
/**
 * 定义自己的数据块，template实际接收的数据块为store._fields,根据template的需求，定义自己的store
 */
Vue.component('app-items-item', appItem)
Vue.component('app-items', appItems)
var store = {
  _fields: {
    inner_prop: {
      'inline': false,
      'labelPosition': 'right',
      'labelWidth': '120px'
    }
  }
}
var component = factory.buildComponent(inner, store, resolver)
export default component
