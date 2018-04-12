import Vue from 'vue'
import {
  DatePicker
} from 'element-ui'
import '@/theme/index.css'
import inner from './template.vue'
import factory from '@/components/devote-vue/resolvers/ComponentFactory.js'
import modelResolver from '@/components/devote-vue/resolvers/resolverClass/ModelBlockResolver.js'
import ruleResolver from '@/components/devote-vue/resolvers/resolverClass/RuleResolver.js'
Vue.component(DatePicker.name, DatePicker)
/**
	 * 定义自己的数据块，template实际接收的数据块为store._fields,根据template的需求，定义自己的store
	 */
var store = {
  _fields: {
    /* 这里为el-select的默认数据块 ,可以参考Element的数据格式定义*/
    inner_prop: {
      size: 'small',
      disabled: false,
      placeholder: '选择日期与时间',
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    },
    /* 这里为el-select的默认事件块 ,可以参考Element的数据格式定义*/
    inner_event: {}
  }
}
var resolver = factory.buildResovler()
resolver = resolver._assign_resolver(modelResolver)
resolver = resolver._assign_resolver(ruleResolver)
var component = factory.buildComponent(inner, store, resolver)
export default component
