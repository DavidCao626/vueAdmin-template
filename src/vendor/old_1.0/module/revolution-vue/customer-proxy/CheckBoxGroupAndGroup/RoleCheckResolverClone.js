import Vue from 'vue'
import {
  Checkbox
} from 'element-ui'
import {
  CheckboxButton
} from 'element-ui'
import {
  CheckboxGroup
} from 'element-ui'
import '@/theme/index.css'
import inner from './template.vue'
import factory from '@/components/devote-vue/resolvers/ComponentFactory.js'
import modelResolver from '@/components/devote-vue/resolvers/resolverClass/ModelArrayBlockResolver.js'
import ruleResolver from '@/components/devote-vue/resolvers/resolverClass/RuleResolver.js'
import dataStoreResolver from '@/components/devote-vue/resolvers/resolverClass/DataStoreResolver.js'
import GUtils from '@/components/Utils.js'
import reqPath from '@/API/System/SystemManagerApi.js'

Vue.component(Checkbox.name, Checkbox)
Vue.component(CheckboxButton.name, CheckboxButton)
Vue.component(CheckboxGroup.name, CheckboxGroup)

/**
	 * 定义自己的数据块，template实际接收的数据块为store._fields,根据template的需求，定义自己的store
	 */
var store = {
  _fields: {
    isButton: true, // 选择项是否为Button
    isBorder: true, // 选择项是否带有边框
    size: 'mini', // 组件元素的大小
    /* 这里为el-checkboxGroup的默认数据块 ,可以参考Element的数据格式定义*/
    inner_prop: {
      size: 'mini',
      min: 0,
      'disabled': false
    },
    /* 这里为el-select的默认事件块 ,可以参考Element的数据格式定义*/
    inner_event: {},
    /* 定义选项数据加载时进行的转换*/
    props: {
      'label': 'val',
      'title': 'alias'
    },
    groups: []
  },
  loadCallBack: function(data) {
    this._fields.groups = data
  }
}
var resolver = factory.buildResovler()
resolver = resolver._assign_resolver(modelResolver)
resolver = resolver._assign_resolver(ruleResolver)
resolver = resolver._assign_resolver(dataStoreResolver)
var component = factory.buildComponent(inner, store, resolver)
component.getResolver().callStore(function(callback) {
  GUtils.post(reqPath.queryUserGrantRole, {}, function(data) {
    console.log(data)
    callback.call(component.getResolver(), data.resBody)
  })
})
export default component
