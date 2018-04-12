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
import RquestPathConfig from '@/components/RequestUrlConfig.js'
import {
  Loading
} from 'element-ui'
Vue.use(GraceComponent)
var pagehContainer = GStoreFactory.buildHContainer()
var loadingVars
var treeStore = GStoreFactory.buildTreeStore()
treeStore.addConf('isCheckBox', true)
treeStore.setLazy(function(node, resolve) {
  console.log(node)
  return resolve([{
    'label': '贫困等级',
    'id': '201',
    'leaf': false,
    disabled: true
  }, {
    'label': '学习成绩',
    'id': '301',
    'leaf': true
  }])
})
treeStore.addConf('nodeClick', function(data, node, tree) {
  formDataStore.data.sex = '101'
})

var formDataStore = GStoreFactory.buildServiceFormData()
formDataStore.pushData({
  'sex': ''
})
formDataStore.pushData({
  'zy': []
})
formDataStore.pushData({
  'isOnePic': ''
})
formDataStore.pushData({
  'orgPath': []
})
var formStore = GStoreFactory.buildServiceForm(formDataStore)

/**
 * 一个Form中的select构建
 */
var selectStore = GStoreFactory.buildSmallSelectStore(formDataStore.data, 'sex')

axios.post('/act/test/json.do', {
  Content_Type: 'application/json',
  firstName: 'Fred',
  lastName: 'Flintstone',
  checkName: {
    'this': 'doit'
  }
})
  .then(function(response) {
    // alert(response);
    console.log(response)
  })
  .catch(function(error) {
    console.log(error)
  })

selectStore.pushAllByFormat([{ 'orgname': '登陆用户', 'orgId': '1099', 'orgi': '200', 'orgz': 'bins' }], { 'name': 'orgname', 'val': 'orgId' })

var checkBoxStore = GStoreFactory.buildSmallCheckBoxStore(formDataStore.data, 'zy')
checkBoxStore.pushData({
  'val': '101',
  'name': '化学'
})
checkBoxStore.pushData({
  'val': '102',
  'name': '物理'
})

var radioStore = GStoreFactory.buildSmallRadioStore(formDataStore.data, 'isOnePic')
radioStore.pushData({
  'val': '101',
  'name': '是'
})
radioStore.pushData({
  'val': '102',
  'name': '否'
})

var cascaderStore = GStoreFactory.buildSmallCascaderStore(formDataStore.data, 'orgPath')
cascaderStore.pushAll([{
  'value': '101',
  'label': '内蒙古大学',
  children: [{
    'value': '102',
    'label': '化学学院'
  }]
}])
/**
 * 要解决这个问题
 */
var index = new Vue({
  el: '#bodyBox',
  data: {
    pageHCon: pagehContainer,
    treeStore: treeStore,
    selectStore: selectStore,
    formStore: formStore,
    checkStore: checkBoxStore,
    radioStore: radioStore,
    cascaderStore: cascaderStore
  },
  beforeCreate: function() {
    loadingVars = Loading.service({
      fullscreen: true
    })
  },
  mounted: function() {
    setTimeout(() => {
      loadingVars.close()
    }, 2000)
    var that = this
    var height = GUtils.getClientHeight()
    pagehContainer.store.conf.prefHeight = height
  },
  methods: {
    getFormData: function() {
      console.log(formDataStore)
    }
  },
  watch: {
    'pageHCon.store.conf.resultHeight': function(val) {
      console.log(val)
    }
  }
})
