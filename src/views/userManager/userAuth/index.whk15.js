import Vue from 'vue'
import Element from 'element-ui'
import '@/theme/index.css'
import VueExpand from '@/components/VueExpand'
Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
import GraceComponent from '@/ComponentPackage/GraceComponents.js'
import dataPath from '@/API/UserAuth/User_Auth_Info.js'
import axios from 'axios'
// import nations from "./nations.js"
import authForm from './components/authForm.vue'
import addForm from './components/addForm.vue'
import updateForm from './components/updateForm.vue'

Vue.use(GraceComponent)
// 获取码表数据
var istateData = []
var requestData = {
  'dicts': ['check_flag', 'authState']
}
var dictData = {}
GUtils.post(dataPath.getDictByDictNames, requestData, function(data) {
  dictData = data.resBody
  istateData.push(dictData.authState)
})
// 获取码表数据结束
var showData = {
  auth_user_name: '',
  manager_node_name: '',
  duty_name: '',
  user_object_name: '',
  auth_body: '',
  itemBeanList: ''
}
var updateAuthData = {
  id: '',
  loginName: ''
}

var pagehContainer = GStoreFactory.buildVContainer()
var pageManagerStore = GStoreFactory.buildManagerPageStore()
pageManagerStore.addConf('loadData', function() {
  loadData()
})
/**
 *  SelectTableStore start
 */

var selectTableStore = GStoreFactory.buildSelectTable()
selectTableStore.addConf('expands', [{
  label: '认证信息',
  attr: 'auth_result_message'
}])
selectTableStore.addConf('isExpand', true)
selectTableStore.addConf('isBorder', false)
selectTableStore.addConf('isRowOperation', true)
selectTableStore.addConf('operations', [{

  'name': 'check',
  title: '审核',
  operator: function(index1, row) {
    GUtils.post(dataPath.getUserAuthInfoById, {
      'id': row.id
    }, function(data) {
			  showData.id = row.id
      showData.auth_user_name = data.resBody.baseData.user_login_name
      showData.manager_node_name = data.resBody.baseData.manager_node_name
      showData.duty_name = data.resBody.baseData.duty_name
      showData.user_object_name = data.resBody.baseData.user_object_name
      showData.auth_body = data.resBody.authBodyMap
      showData.itemBeanList = data.resBody.itemBeanList
    })
    index.authUserInfoDV = true
  }
}])

/**
 * 快速查询表单定义
 */
var formStore = GStoreFactory.buildServiceForm()
formStore.addConf('isInline', true)

/**
 * 表单数据对象定义
 */
var formStoreData = GStoreFactory.buildServiceFormData()
formStoreData.pushData({
  userLoginName: '',
  state: ''
})
formStoreData.pushRules({

})
formStore.addAttr('bindMutual', formStoreData)

/**
 * 全部条件查询的
 */
var moreItemFormStore = GStoreFactory.buildServiceForm()
moreItemFormStore.addConf('isInline', false)
moreItemFormStore.addConf('labelWidth', '80px')
moreItemFormStore.addConf('labelPosition', 'right')
moreItemFormStore.addAttr('bindMutual', formStoreData)

/**
 * 表单定义结束
 */
var pageStore = GStoreFactory.buildPageStore()
formStoreData.pushPage()
formStoreData.pushData({
  'page_total': 1
})
pageStore.addAttr('bindMutual', formStoreData)

/**
 * 改造，定义默认的名称，不需要进行名称录入
 */
pageManagerStore.addAttr('serviceForm', formStore)
pageManagerStore.addAttr('serviceTable', selectTableStore)
pageManagerStore.addAttr('servicePage', pageStore)

pageManagerStore.addConf('operations', [{
  name: 'ex',
  title: '导入',
  operator: function(servcieTable, serviceForm) {
    console.log(['this', index])
  }
}, {
  name: 'vh',
  title: '批量删除',
  operator: function(servcieTable, serviceForm) {

  }
}])

var tabsStore = GStoreFactory.buildTabsStore()
tabsStore.pushAll([{
  'name': '101',
  'title': '学生管理',
  'link': 'form.html'
}, {
  'name': '102',
  'title': '学院管理'
}])
tabsStore.addConf('activeTab', '101')

var index = new Vue({
  el: '#bodyBox',
  components: {
    authForm,
    addForm,
    updateForm
  },

  data: {
    pageHCon: pagehContainer,
    pmanager: pageManagerStore,
    serviceForm: formStore,
    serviceTable: selectTableStore,
    moreForm: moreItemFormStore,
    tabsStore: tabsStore,
    authUserInfoDV: false,
    addUserInfoDV: false,
    updateUserInfoDV: false,
    showData,
    updateAuthData,
    istateData: istateData

  },
  mounted: function() {
    var height = GUtils.getClientHeight()
    pagehContainer.store.conf.prefHeight = height
  },
  methods: {
    addTab: function() {
      tabsStore.addTab({
        'name': '301',
        'title': '学生会管理'
      })
    },
    addUserInfobt: function() {
      this.addUserInfoDV = true
    },
    formatState: function(row, column, cellValue) {
      var stateData = dictData.authState
      for (var i = 0; i < stateData.length; i++) {
        if (stateData[i].dict_key == cellValue) {
          return stateData[i].dict_desc
        }
      }
    },
    diafalse: function() {
      this.authUserInfoDV = false
    },
    diafalse2: function() {
      this.addUserInfoDV = false
    },
    diafalse3: function() {
      this.updateUserInfoDV = false
    },
    iload: function() {
      loadData()
    }
  },
  watch: {
    'pageHCon.store.conf.resultHeight': function(val) {
      this.pmanager.store.conf.workSpaceHeight = val - 4
      this.tabsStore.store.conf.height = val - 2
    },
    temp1: function() {
      console.log('temp1')
    }
  },
  created: function() {
    // this.temp1 = this.$refs.updateVue.loading;
  }
})

// 加载数据的方法
function loadData() {
  GUtils.post(dataPath.queryUserAuthInfoList, formStore.bindMutual.data, function(data) {
    console.log(['loadData', data])
    selectTableStore.store.data = data.resBody.baseData
    formStoreData.pushData({
      'page_total': data.resBody.dataCount
    })
  })
}
