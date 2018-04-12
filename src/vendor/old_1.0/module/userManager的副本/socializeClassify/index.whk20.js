import Vue from 'vue'
import Element from 'element-ui'
import '@/theme/index.css'
import VueExpand from '@/components/VueExpand'
Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
import GraceComponent from '@/ComponentPackage/GraceComponents.js'
import dataPath from '@/API/socializeClassify/socializeClassify.js'
import axios from 'axios'
// import nations from "./nations.js"

Vue.use(GraceComponent)
// 获取码表数据
var requestData = {
  'dicts': ['available', 'is_bandh']
}
var dictData = {}
var isBandh = []
GUtils.post(dataPath.getDictByDictNames, requestData, function(data) {
  dictData = data.resBody
  index.isBandh = dictData.is_bandh
})
// 获取码表数据结束
var dutyList = []
GUtils.post(dataPath.queryDutyList, {}, function(data) {
  index.dutyList = data.resBody
})

var pagehContainer = GStoreFactory.buildVContainer()
var pageManagerStore = GStoreFactory.buildManagerPageStore()
pageManagerStore.addConf('loadData', function() {
  loadData()
})
/**
 *  SelectTableStore start
 */
var addUserDutyForm = GStoreFactory.buildServiceForm()
var addUserDutyFormData = GStoreFactory.buildServiceFormData()
var updateUserDutyForm = GStoreFactory.buildServiceForm()
var updateUserDutyFormData = GStoreFactory.buildServiceFormData()
addUserDutyFormData.pushData({
  id: '',
  orgName: '',
  loginName: '',
  orgCode: '',
  beginDate: '',
  expireData: '',
  isBandh: 'N',
  definitionCode: ''
})
addUserDutyFormData.pushRules({
  orgCode: []
})
addUserDutyForm.addAttr('formData', addUserDutyFormData)

updateUserDutyFormData.pushData({
  id: '',
  orgName: '',
  loginName: '',
  orgCode: '',
  beginDate: '',
  expireData: '',
  isBandh: 'N',
  definitionCode: ''
})
updateUserDutyFormData.pushRules({
  orgCode: []
})
updateUserDutyForm.addAttr('formData', updateUserDutyFormData)

var selectTableStore = GStoreFactory.buildSelectTable()
selectTableStore.addConf('expands', [{
  label: '开始日期',
  attr: 'startDate'
}, {
  label: '结束日期',
  attr: 'endDate'
}])
var dutyTableData = []
selectTableStore.addConf('isExpand', true)
selectTableStore.addConf('isBorder', false)
selectTableStore.addConf('isRowOperation', true)
selectTableStore.addConf('operations', [{
  'name': 'check',
  title: '任职',
  operator: function(index1, row) {
    index.dutyTableLoginName = row.userLoginName
    console.log(['index.dutyTableLoginName', index.dutyTableLoginName])
    index.resignationDV = true
    addUserDutyFormData.pushData({
      'orgName': row.officeOrgName,
      'loginName': row.userLoginName
    })
    updateUserDutyFormData.pushData({
      //	'id': "row.id",
      'orgName': row.officeOrgName,
      'loginName': row.userLoginName
    })
    GUtils.post(dataPath.queryUserDutyList, {
      'loginName': row.userLoginName
    }, function(data) {
      console.log(['userDutyList', data])
      index.dutyTableData = data.resBody
    })
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
  userLoginName: ''
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
  components: {},

  data: {
    pageHCon: pagehContainer,
    pmanager: pageManagerStore,
    serviceForm: formStore,
    serviceTable: selectTableStore,
    moreForm: moreItemFormStore,
    tabsStore: tabsStore,
    resignationDV: false,
    dutyTableData,
    addAndShowFlag: true,
    addUserDutyForm,
    updateUserDutyForm,
    dutyList,
    isBandh,
    dutyTableLoginName: '',
    updateUserDutyDV: false
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
    addUserDuty: function() {
      GUtils.requestBody(dataPath.insertUserDuty, addUserDutyFormData.data, function(data) {
        GUtils.post(dataPath.queryUserDutyList, {
          'loginName': addUserDutyFormData.data.loginName
        }, function(data) {
          console.log(['userDutyList', data])
          index.dutyTableData = data.resBody
        })
        index.addAndShowFlag = true
      })
    },
    deleteDuty: function(index1, row) {
      GUtils.post(dataPath.deleteUserDuty, {
        'id': row.id
      }, function(data) {
        GUtils.post(dataPath.queryUserDutyList, {
          'loginName': index.dutyTableLoginName
        }, function(data) {
          console.log(['userDutyList', data])
          index.dutyTableData = data.resBody
        })
      })
    },
    updateDuty: function(index1, row) {
      index.updateUserDutyDV = true
      GUtils.post(dataPath.getUserDutyById, {
        'id': row.id
      }, function(data) {
        index.updateUserDutyForm.formData.pushData({
          orgCode: data.resBody.orgCode,
          beginDate: data.resBody.beginDate,
          expireData: data.resBody.expireDate,
          isBandh: data.resBody.isBandh,
          definitionCode: data.resBody.definitionCode,
          id: row.id
        })
      })
    },
    updateUserDuty: function() {
      // 确认修改
      GUtils.requestBody(dataPath.updateUserDuty, updateUserDutyFormData.data, function(data) {
        GUtils.post(dataPath.queryUserDutyList, {
          'loginName': updateUserDutyFormData.data.loginName
        }, function(data) {
          console.log(['userDutyList', data])
          index.dutyTableData = data.resBody
        })
        index.updateUserDutyDV = false
      })
    },
    formatAvailable: function(row, column, cellValue) {
      var fa = dictData.available
      for (var i = 0; i < fa.length; i++) {
        if (fa[i].dict_key == cellValue) {
          return fa[i].dict_desc
        }
      }
    },
    formatIsBandh: function(row, column, cellValue) {
      var fib = dictData.is_bandh
      for (var i = 0; i < fib.length; i++) {
        if (fib[i].dict_key == cellValue) {
          return fib[i].dict_desc
        }
      }
    },
    iload: function() {
      loadData()
    },
    allotDuty: function() {
      this.addAndShowFlag = false
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
  GUtils.post(dataPath.queryData, formStore.bindMutual.data, function(data) {
    console.log(['loadData', data])
    selectTableStore.store.data = data.resBody.baseData
    formStoreData.pushData({
      'page_total': data.resBody.dataCount
    })
  })
}
