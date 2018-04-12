import Vue from 'vue'
import {
  Switch
} from 'element-ui'
import '@/theme/index.css'
import inner from './template.vue'
import factory from '@/components/devote-vue/resolvers/ComponentFactory.js'
import modelResolver from '@/components/devote-vue/resolvers/resolverClass/ModelBlockResolver.js'
import reqPath from '@/API/System/SystemManagerApi.js'
import ruleResolver from '@/components/devote-vue/resolvers/resolverClass/RuleResolver.js'
Vue.component(Switch.name, Switch)
/**
	 * 定义自己的数据块，template实际接收的数据块为store._fields,根据template的需求，定义自己的store
	 */
var store = {
  _fields: {
    /* 这里为el-select的默认数据块 ,可以参考Element的数据格式定义*/
    inner_prop: {
      size: 'small',
      disabled: false
    },
    inner_event: {
      change: function(val) {
        console.log(val)
      }
    }
  }
}
var resolver = factory.buildResovler()
resolver = resolver._assign_resolver(modelResolver)
resolver = resolver._assign_resolver(ruleResolver)
var component = factory.buildComponent(inner, store, resolver)
export default component
