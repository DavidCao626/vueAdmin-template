import Vue from 'vue'
import Element from 'element-ui'
import '@/theme/index.css'
import VueExpand from '@/components/VueExpand'
Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
import GraceComponent from '@/ComponentPackage/GraceComponents.js'
import dataPath from '@/API/Staff/staff_info_manager.js'
import axios from 'axios'
import nations from './nations.js'
import updateStaffBaseInfo from './components/updateStaffBaseInfo.vue'
import addStaffBaseInfo from './components/addStaffBaseInfo.vue'
import checkStaffBaseInfo from './components/checkStaffBaseInfo.vue'
import reqPath from '@/API/System/SystemManagerApi.js'
import cf from '@/module/userManager/staffManager/checkStaffInfo/components/checkStaffInfo.vue'
Vue.use(GraceComponent)
// 获取码表数据
var requestData = {
  'dicts': ['available', 'is_bandh', 'check_flag', 'sex_type', 'language', 'stu_archives_type', 'stu_archives_status', 'special_type', 'graduation_type', 'stu_degree_type', 'is_graduates']
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
  console.log(['dutyList', data])
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
  orgCode: [],
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
  orgCode: [],
  beginDate: '',
  expireData: '',
  isBandh: 'N',
  definitionCode: ''
})
updateUserDutyFormData.pushRules({
  orgCode: []
})
updateUserDutyForm.addAttr('formData', updateUserDutyFormData)

var dutyTableData = []
var selectTableStore = GStoreFactory.buildSelectTable()
selectTableStore.addConf('expands', [{
  label: '审核备注:',
  attr: 'checkComment'
}])
selectTableStore.addConf('isExpand', true)
selectTableStore.addConf('isBorder', false)
selectTableStore.addConf('isRowOperation', true)
var ckParams = {}
ckParams.baseInfoBid = ''
ckParams.universityInfoBid = ''
ckParams.staffCode = ''
ckParams.loginName = ''
selectTableStore.addConf('operations', [{
  'name': 'edit',
  title: '编辑',
  operator: function(index1, row) {
    console.log(index)
    index.updateBaseInfoDV = true
    console.log(['editthis', index.$options.components.updateStaffBaseInfo.methods])
    index.$options.components.updateStaffBaseInfo.methods.loadFormData.call(index.$options.components.updateStaffBaseInfo, row.id)
  }
}, {
  'name': 'del',
  title: '删除',
  operator: function(index1, row) {
    GUtils.post(dataPath.deleteStaffBaseInfo, {
      'id': row.id
    }, function(data) {
      loadData()
    })
  }
}, {

  'name': 'check',
  title: '审核',
  operator: function(index1, row) {
    //			index.checkBaseInfoDV = true;
    //		index.$options.components.checkStaffBaseInfo.methods.loadFormData.call(index.$options.components.checkStaffBaseInfo, row.id);
    //		index.checkId = row.id;
    ckParams.baseInfoBid = row.id
    ckParams.universityInfoBid = ''
    ckParams.staffCode = row.staffCode
    ckParams.loginName = row.loginName

    GUtils.post(dataPath.getStaffUniversityInfoIdBy, {
      'staffCode': row.staffCode
    }, function(data) {
      ckParams.universityInfoBid = data.resBody.staffUniversityInfoId
      index.chDV = true
      console.log(['checkParams', ckParams])
      // 执行成功跳转页面携带上面的参数
    })
  }

}, {
  'name': 'renzhi',
  title: '任职',
  operator: function(index1, row) {
    index.dutyTableLoginName = row.loginName
    console.log(['index.dutyTableLoginName', index.dutyTableLoginName])
    index.resignationDV = true
    addUserDutyFormData.pushData({
      'orgName': '',
      'loginName': row.loginName
    })
    updateUserDutyFormData.pushData({
      //	'id': row.id,
      'orgName': '',
      'loginName': row.loginName
    })
    GUtils.post(dataPath.queryUserDutyList, {
      'loginName': row.loginName
    }, function(data) {
      console.log(['userDutyList', data])
      index.dutyTableData = data.resBody
    })
  }
}])
// selectTableStore.addConf("storeLoader",{"method":"get","url":RquestPathConfig.tableStoreUrl});
/**
 *  SelectTableStore end
 */

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
  staffCode: '',
  name: ''
})
formStoreData.pushRules({
  name: [{
    required: true,
    message: '请输入活动名称',
    trigger: 'blur'
  }]
})
/**
 *
 */

/**
 * 改造
 */
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

  }
}, {
  name: 'vh',
  title: '批量删除',
  operator: function(servcieTable, serviceForm) {
    var arr = selectTableStore.store.conf.selects
    if (arr.length == 0) {
      index.$message({
        showClose: true,
        message: '您没有中任数据',
        type: 'error'
      })
    } else {
      var reArr = []
      for (var i = 0; i < arr.length; i++) {
        reArr.push(arr[i].id)
      }
      GUtils.post(dataPath.deleteMStaffBaseInfo, {
        'ids': reArr
      }, function(data) {
        // 批量删除成功
        loadData()
      })
    }
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

// 组织组件
var f_org_code = GStoreFactory.buildSmallCascaderStore(addUserDutyFormData.data, 'orgCode')
f_org_code.addConf('expandTrigger', 'hover')
f_org_code.addConf('props', {
  value: 'org_code',
  label: 'org_name',
  children: 'children',
  disabled: 'disabled'
})
GUtils.post(reqPath.queryUserOrg, {}, function(data) {
  f_org_code.pushAll(data.resBody)
})
var f_org_code2 = GStoreFactory.buildSmallCascaderStore(updateUserDutyFormData.data, 'orgCode')
f_org_code2.addConf('expandTrigger', 'hover')
f_org_code2.addConf('props', {
  value: 'org_code',
  label: 'org_name',
  children: 'children',
  disabled: 'disabled'
})
GUtils.post(reqPath.queryUserOrg, {}, function(data) {
  f_org_code2.pushAll(data.resBody)
})
// 组织组件结束

/**
 * 要解决这个问题
 */
var index = new Vue({
  el: '#bodyBox',
  components: {
    addStaffBaseInfo,
    updateStaffBaseInfo,
    checkStaffBaseInfo,
    cf
  },
  data: {
    f_org_code2: f_org_code2, // 更新
    f_org_code: f_org_code,
    resignationDV: false,
    dutyTableData,
    addAndShowFlag: true,
    addUserDutyForm,
    updateUserDutyForm,
    dutyList,
    isBandh,
    dutyTableLoginName: '',
    updateUserDutyDV: false,
    ckParams,
    chDV: false,
    pageHCon: pagehContainer,
    pmanager: pageManagerStore,
    serviceForm: formStore,
    serviceTable: selectTableStore,
    moreForm: moreItemFormStore,
    tabsStore: tabsStore,
    addBaseInfoDV: false,
    updateBaseInfoDV: false,
    checkBaseInfoDV: false,
    checkId: ''
  },
  mounted: function() {
    var height = GUtils.getClientHeight()
    pagehContainer.store.conf.prefHeight = height
  },
  methods: {
    scheckBaseInfo: function(formName) {
      this.checkBaseInfoDV = false
      index.$refs.checkVue.submitForm(this.checkId)
    },
    supdateBaseInfo: function(formName) {
      console.log('确认更新')
      console.log(['updateStaffBaseInfo', updateStaffBaseInfo])
      // index.$options.components.updateStaffBaseInfo.methods.submitForm.call(index.$options.components.updateStaffBaseInfo);
      index.$refs.updateVue.submitForm()
      this.updateBaseInfoDV = false
    },
    saddBaseInfo: function(formName) {
      // 确认增加
      this.addBaseInfoDV = false
      console.log(['sadd', this])
      this.$refs.addVue.submitForm()
    },
    testmd: function() {
      console.log(['testmd'])
    },
    formatSexType: function(row, column, cellValue) {
      var sexDict = dictData.sex_type
      for (var i = 0; i < sexDict.length; i++) {
        if (sexDict[i].dict_key == cellValue) {
          return sexDict[i].dict_desc
        }
      }
    },
    formatCheckFlag: function(row, column, cellValue) {
      var checkFlagDict = dictData.check_flag
      for (var i = 0; i < checkFlagDict.length; i++) {
        if (checkFlagDict[i].dict_key == cellValue) {
          return checkFlagDict[i].dict_desc
        }
      }
    },
    formatNation: function(row, column, cellValue) {
      var nationsDict = nations.data
      for (var i = 0; i < nationsDict.length; i++) {
        if (nationsDict[i].id == cellValue) {
          return nationsDict[i].name
        }
      }
    },
    addTab: function() {
      tabsStore.addTab({
        'name': '301',
        'title': '学生会管理'
      })
    }, addUserDuty: function() {
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
          orgCode: data.resBody.aOrgCode,
          beginDate: data.resBody.baseData.beginDate,
          expireData: data.resBody.baseData.expireDate,
          isBandh: data.resBody.baseData.isBandh,
          definitionCode: data.resBody.baseData.definitionCode,
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
  GUtils.post(dataPath.queryStaffBaseInfoList, formStore.bindMutual.data, function(data) {
    console.log(['loadData', data])
    selectTableStore.store.data = data.resBody.baseData
    formStoreData.pushData({
      'page_total': data.resBody.totalPage
    })
  })
}
