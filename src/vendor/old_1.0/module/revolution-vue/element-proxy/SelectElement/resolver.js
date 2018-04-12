import Vue from 'vue'
import {
  Select
} from 'element-ui'
import {
  Option
} from 'element-ui'
import {
  OptionGroup
} from 'element-ui'
import '@/theme/index.css'
import inner from './template.vue'
import factory from '@/components/devote-vue/resolvers/ComponentFactory.js'
import modelResolver from '@/components/devote-vue/resolvers/resolverClass/ModelBlockResolver.js'
import ruleResolver from '@/components/devote-vue/resolvers/resolverClass/RuleResolver.js'
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(OptionGroup.name, OptionGroup)

/**
	 * 定义自己的数据块，template实际接收的数据块为store._fields,根据template的需求，定义自己的store
	 */
var store = {
  _fields: {
    isGroup: true, // 是否是分组数据
    /* 这里为el-select的默认数据块 ,可以参考Element的数据格式定义*/
    inner_prop: {
      size: 'small',
      filterable: true,
      disabled: false
    },
    /* 这里为el-select的默认事件块 ,可以参考Element的数据格式定义*/
    inner_event: {
    },
    /* 定义选项数据加载时进行的转换*/
    props: {
      'groupLable': 'label',
      'itemLable': 'label',
      'itemValue': 'value'
    }
  },
  loadCallBack: function(data) {
    if (this.isGroup) {
      this._fields.groups = data
    } else {
      this._fields.options = data
    }
  }
}
var resolver = factory.buildResovler()
resolver = resolver._assign_resolver(modelResolver)
resolver = resolver._assign_resolver(ruleResolver)
var component = factory.buildComponent(inner, store, resolver)
export default component
