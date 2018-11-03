import Vue from 'vue'
import Element from 'element-ui'
import '@/theme/index.css'
import axios from 'axios'
import VueExpand from '@/components/VueExpand'
Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
import GraceComponent from '@/ComponentPackage/GraceComponents.js'
import reqPath from '@/API/System/SystemManagerApi.js'
import {
  Loading
} from 'element-ui'

Vue.use(GraceComponent)
var pagehContainer = GStoreFactory.buildHContainer()
var loadingVars
var treeStore = GStoreFactory.buildTreeStore()
treeStore.addConf('isCheckBox', true)
treeStore.addConf('rootName', '机构管理')
treeStore.addConf('rootNo', '10')
treeStore.addConf('defaultProps', {
  'children': 'children',
  'label': 'orgName',
  'isLeaf': 'leaf'
})
treeStore.setLazy(function(node, resolve) {
  if (!node) {
    GUtils.msgInfo('请选择某一个节点后操作！')
    return
  }
  var pserial = node.data.orgCode
  if (node.level == 1) {
    pserial = node.data.root_no
  }
  GUtils.post(reqPath.queryChildOrg, {
    'pCode': pserial
  }, function(data) {
    resolve(data.resBody)
  })
})

/**
 * 以下为更新组织时的Form
 */
var formDataStore = GStoreFactory.buildServiceFormData()
formDataStore.pushData({
  'orgCode': ''
})
formDataStore.pushData({
  'orgName': ''
})
formDataStore.pushData({
  'orgAbbreviationName': ''
})
formDataStore.pushData({
  'PCode': ''
})
formDataStore.pushData({
  'socialNo': ''
})
formDataStore.pushData({
  'orgType': ''
})
formDataStore.pushData({
  'orgCategory': ''
})
formDataStore.pushData({
  'available': ''
})
formDataStore.pushData({
  'areaCode': []
})
var formStore = GStoreFactory.buildServiceForm(formDataStore)
formStore.addConf('isInline', false)
formStore.addConf('labelPosition', 'right')
formStore.addConf('labelWidth', '120px')

var f_type = GStoreFactory.buildSmallSelectStore(formDataStore.data, 'orgType')
var f_category = GStoreFactory.buildSmallSelectStore(formDataStore.data, 'orgCategory')
var f_available = GStoreFactory.buildSmallRadioStore(formDataStore.data, 'available')
var f_area_code = GStoreFactory.buildSmallCascaderStore(formDataStore.data, 'areaCode')
f_area_code.addConf('props', {
  value: 'code',
  label: 'name',
  children: 'children',
  disabled: 'disabled'
})
/**
 * 在懒加载的方式下，需要设置数据加载与默认值加载
 */
f_area_code.setLazy(function(val, store) {
  var node = GStoreFactory.searchCascaderDataNode(val, store, function(currentNode, val, store) {
    if (currentNode.code == val[val.length - 1]) {
      return currentNode.children
    } else {
      return false
    }
  })
  if (node) {
    GUtils.post(reqPath.queryChildArea, {
      'val': val
    }, function(data) {
      GUtils.reBuildArray(node, data.resBody.children)
    })
  }
}, function(val, store) {
  GUtils.post(reqPath.queryDefaultArea, {
    'val': val
  }, function(data) {
    store.data = data.resBody
    var tempData = store.data
    store.conf.track.push(0, tempData)
    var i = 1
    while (tempData && tempData[0]) {
      tempData = tempData[0].children
      store.conf.track.push(i, tempData)
      i++
    }
  })
})

/**
 * 以下为新增组织的表单的设计
 */
var nchild_formDataStore = GStoreFactory.buildServiceFormData()
nchild_formDataStore.pushData({
  'orgName': ''
})
nchild_formDataStore.pushData({
  'orgAbbreviationName': ''
})
nchild_formDataStore.pushData({
  'PCode': ''
})
nchild_formDataStore.pushData({
  'socialNo': ''
})
nchild_formDataStore.pushData({
  'orgType': ''
})
nchild_formDataStore.pushData({
  'orgCategory': ''
})
nchild_formDataStore.pushData({
  'available': 'Y'
})
nchild_formDataStore.pushData({
  'areaCode': ['15']
})
var nchild_formStore = GStoreFactory.buildServiceForm(nchild_formDataStore)
nchild_formStore.addConf('isInline', false)
nchild_formStore.addConf('labelPosition', 'right')
nchild_formStore.addConf('labelWidth', '120px')
var n_f_type = GStoreFactory.buildSmallSelectStore(nchild_formDataStore.data, 'orgType')
var n_f_category = GStoreFactory.buildSmallSelectStore(nchild_formDataStore.data, 'orgCategory')
var n_f_available = GStoreFactory.buildSmallRadioStore(nchild_formDataStore.data, 'available')
var n_f_area_code = GStoreFactory.buildSmallCascaderStore(nchild_formDataStore.data, 'areaCode')
n_f_area_code.addConf('props', {
  value: 'code',
  label: 'name',
  children: 'children',
  disabled: 'disabled'
})
/**
 * 在懒加载的方式下，需要设置数据加载与默认值加载
 */
n_f_area_code.setLazy(function(val, store) {
  var node = GStoreFactory.searchCascaderDataNode(val, store, function(currentNode, val, store) {
    if (currentNode.code == val[val.length - 1]) {
      return currentNode.children
    } else {
      return false
    }
  })
  if (node) {
    // console.log(node);
    GUtils.post(reqPath.queryChildArea, {
      'val': val
    }, function(data) {
      GUtils.reBuildArray(node, data.resBody.children)
    })
  }
}, function(val, store) {
  GUtils.post(reqPath.queryDefaultArea, {
    'val': val
  }, function(data) {
    store.data = data.resBody
    var tempData = store.data
    store.conf.track.push(0, tempData)
    var i = 1
    while (tempData && tempData[0]) {
      console.log(tempData)
      tempData = tempData[0].children
      store.conf.track.push(i, tempData)
      i++
    }
  })
})
/**
 * 通过一个请求，对页面的组件进行数据初始化
 */
GUtils.post(reqPath.queryDecortor, {
  'decoras': ['DoneDecorator', 'orgTypeAndCategoryDecorator']
}, function(data) {
  GUtils.assembleComponent(data.resBody, 'isUse', n_f_available, {
    'name': 'dict_desc',
    'val': 'dict_key'
  })
  GUtils.assembleComponent(data.resBody, 'orgType', n_f_type, {
    'name': 'name',
    'val': 'val'
  })
  GUtils.assembleComponent(data.resBody, 'orgCategory', n_f_category, {
    'name': 'name',
    'val': 'val'
  })
  GUtils.assembleComponent(data.resBody, 'isUse', f_available, {
    'name': 'dict_desc',
    'val': 'dict_key'
  })
  GUtils.assembleComponent(data.resBody, 'orgType', f_type, {
    'name': 'name',
    'val': 'val'
  })
  GUtils.assembleComponent(data.resBody, 'orgCategory', f_category, {
    'name': 'name',
    'val': 'val'
  })
})

treeStore.addConf('nodeClick', function(data, node, tree) {
  console.log(node)
  if (node.data.root_no) {
    index.nchildEnable = false
    index.updateEnable = true
    index.nchild_formDataStore.data.PCode = data.root_no
    index.activeName = 'second'
    index.nchild_name = node.data.orgName
  } else {
    index.nchildEnable = false
    index.updateEnable = false
    index.nchild_formDataStore.data.PCode = node.data.orgCode
    index.nchild_name = node.data.orgName
    GUtils.post(reqPath.queryOrgInfo, {
      'orgCode': node.data.orgCode
    }, function(data) {
      var result = data.resBody.org
      index.formDataStore.data.orgName = result.orgName
      index.formDataStore.data.orgCode = result.orgCode
      index.formDataStore.data.PCode = result.pcode
      index.formDataStore.data.available = result.available
      index.formDataStore.data.socialNo = result.socialNo
      index.formDataStore.data.orgType = result.orgType
      index.formDataStore.data.orgCategory = result.orgCategory
      index.formDataStore.data.orgAbbreviationName = result.orgAbbreviationName
      index.formDataStore.data.areaCode = data.resBody.area
      f_area_code.store.conf.defaultStack.call(this, data.resBody.area, f_area_code.store)
    })
  }
})

var index = new Vue({
  el: '#bodyBox',
  data: {
    pageHCon: pagehContainer,
    treeStore: treeStore,
    formStore: formStore,
    formDataStore: formDataStore,
    nchild_formDataStore: nchild_formDataStore,
    nchild_formStore: nchild_formStore,
    n_f_type: n_f_type,
    n_f_category: n_f_category,
    n_f_available: n_f_available,
    n_f_area_code: n_f_area_code,
    f_type: f_type,
    f_category: f_category,
    f_available: f_available,
    f_area_code: f_area_code,
    activeName: '',
    nchildEnable: true,
    updateEnable: true,
    nchild_name: ''
  },
  beforeCreate: function() {
    //loadingVars = Loading.service({
     // fullscreen: true
    //})
  },
  mounted: function() {
    setTimeout(() => {
     // loadingVars.close()
    }, 2000)
    var that = this
    var height = GUtils.getClientHeight()
    pagehContainer.store.conf.prefHeight = height
  },
  methods: {
    add: function() {
      GUtils.post(reqPath.addOrg, nchild_formDataStore.data, function(data) {
        console.log(data)
      }, function(error) {
        console.log(error)
      })
    },
    update: function() {
      GUtils.post(reqPath.updateOrg, formDataStore.data, function(data) {
        console.log(data)
      }, function(error) {
        console.log(error)
      })
    },
    updateNodeChild: function() {
      var selectNode = this.treeStore.store.conf.selectedNode
    }
  },
  watch: {
    'pageHCon.store.conf.resultHeight': function(val) {
      // console.log(val);
    }
  }
})
