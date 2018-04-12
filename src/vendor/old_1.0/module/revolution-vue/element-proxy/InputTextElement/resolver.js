import Vue from 'vue'
import {
  Input
} from 'element-ui'
import {
  Form
} from 'element-ui'
import {
  FormItem
} from 'element-ui'
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Form.name, Form)
import '@/theme/index.css'
import _lodash from 'lodash'
import inner from './template.vue'

import factory from '@/components/devote-vue/resolvers/ComponentFactory.js'
import modelResolver from '@/components/devote-vue/resolvers/resolverClass/ModelBlockResolver.js'
import fieldsResolver from '@/components/devote-vue/resolvers/resolverClass/FieldsResolver.js'
import ruleResolver from '@/components/devote-vue/resolvers/resolverClass/RuleResolver.js'
/**
	 * 定义自己的数据块，template实际接收的数据块为store._fields,根据template的需求，定义自己的store
	 */
var store = {
  _resolver_name: 'fileInputResolver',
  _fields: {
    prepend: '', // 前置的块信息
    append: null, // 后置的块信息
    /* 这里为el-input的默认数据块 ,可以参考Element的数据格式定义*/
    inner_prop: {
      disabled: false,
      size: 'small',
      label: '名称'
    },
    /* 这里为el-select的默认事件块 ,可以参考Element的数据格式定义*/
    inner_event: {}
  }
}
/* 可用通过这里进行Resolver的装饰*/

var resolver = factory.buildResovler()
resolver = resolver._assign_resolver(modelResolver)
resolver = resolver._assign_resolver(ruleResolver)
resolver = resolver._assign_resolver(fieldsResolver)
var component = factory.buildComponent(inner, store, resolver)
export default component
