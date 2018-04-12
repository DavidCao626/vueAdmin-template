import Vue from 'vue'
import Element from 'element-ui'
import '@/theme/index.css'
import VueExpand from '@/components/VueExpand'
Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
import GraceComponent from '@/ComponentPackage/GraceComponents.js'
import dataPath from '@/API/Student/student_info_manager.js'
import axios from 'axios'
import nations from './nations.js'
Vue.use(GraceComponent)
import reqPath from '@/API/System/SystemManagerApi.js'
import addStuBaseInfo from './components/addStuBaseInfo.vue'
import updateStuBaseInfo from './components/updateStuBaseInfo.vue'
import checkForm from './components/checkForm.vue'
import cf from '@/module/userManager/studentManager/checkStuInfo/components/checkStuInfo.vue'
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
ckParams.stuNo = ''
ckParams.baseInfoId = ''
ckParams.personalInfoBid = ''
ckParams.universityInfoBid = ''
ckParams.loginName = ''
selectTableStore.addConf('operations', [{
  'name': 'edit',
  title: '编辑',
  operator: function(index1, row) {
    index.updateBaseInfoDV = true
    index.baseInfoId = row.id
  }
}, {
  'name': 'del',
  title: '删除',
  operator: function(index1, row) {
    GUtils.post(dataPath.deleteStudentBaseInfo, {
      'stuBaseInfoId': row.id
    }, function(data) {
      loadData()
    })
  }
}, {

  'name': 'check',
  title: '审核',
  operator: function(index1, row) {
    // 这几个参数需要传到审核页面
    ckParams.stuNo = row.stuNo
    ckParams.baseInfoId = row.id
    ckParams.personalInfoBid = ''
    ckParams.universityInfoBid = ''
    ckParams.loginName = row.loginName
    // 获取信息id的方法
    GUtils.post(dataPath.getAllInfoIdByStuNo, {
      'stuNo': row.stuNo
    }, function(data) {
      console.log(['getId', data])
      ckParams.personalInfoBid = data.resBody.stuPersonalInfoId
      ckParams.universityInfoBid = data.resBody.stuUniversityInfoId
      index.chDV = true
      console.log(['checkParams', ckParams])
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
  stuNo: '',
  name: ''
})
formStoreData.pushRules({

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
      vuemain.$message({
        showClose: true,
        message: '您没有中任数据',
        type: 'error'
      })
    } else {
      var reArr = []
      for (var i = 0; i < arr.length; i++) {
        reArr.push(arr[i].id)
      }

      GUtils.post(dataPath.deleteMoreStudentBaseInfo, {
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
    addStuBaseInfo,
    updateStuBaseInfo,
    checkForm,
    cf
  },
  data: {
    importFileUrl: dataPath.stuExcelReader,
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
    checkFormDV: false,
    baseInfoId: '0',
    temp1: '',
    checkCommentDV: false,
    checkCommentForm: {
      id: '',
      checkComment: '',
      checkStatus: ''
    }
  },
  mounted: function() {
    var height = GUtils.getClientHeight()
    pagehContainer.store.conf.prefHeight = height
  },
  methods: {
		   beforeAvatarUpload(file) {
		   	// 这里进行格式大小限制
      //      const isJPG = file.type === 'image/jpeg';
      //      const isLt2M = file.size / 1024 / 1024 < 2;
      //
      //      if (!isJPG) {
      //        this.$message.error('上传头像图片只能是 JPG 格式!');
      //      }
      //      if (!isLt2M) {
      //        this.$message.error('上传头像图片大小不能超过 2MB!');
      //      }
      //      return isJPG && isLt2M;
    },
    checkFun: function(state) {
      this.checkCommentForm.checkStatus = state
      this.checkCommentDV = true
    },
    scheckForm: function(formName) {
      var that = this

      GUtils.post(dataPath.checkStudentBaseInfo, this.checkCommentForm, function(data) {
        loadData()
        that.checkCommentDV = false
        that.checkFormDV = false
      })
    },
    supdateBaseInfo: function() {
      this.updateBaseInfoDV = false
      this.$refs.updateVue.updateStuBaseInfoSubmit()
      if (this.$refs.updateVue.loading == true) {
        // 重新加载数据
        loadData()
        this.$refs.updateVue.loading = false
      }
    },
    addBaseInfoBt: function() {
      this.addBaseInfoDV = true
    },
    saddBaseInfo: function() {
      // 确认增加
      this.addBaseInfoDV = false
      this.$refs.addVue.addStuBaseInfoSubmit()
      if (this.$refs.addVue.loading == true) {
        console.log(['增加后重新加载数据了'])
        loadData()
        this.$refs.addVue.loading = false
      }
    },
    testmd: function() {
      console.log(['testmd'])
    },
    addTab: function() {
      tabsStore.addTab({
        'name': '301',
        'title': '学生会管理'
      })
    },
    formatSexType: function(row, column, cellValue) {
      var sexDict = dictData.sex_type
      for (var i = 0; i < sexDict.length; i++) {
        if (sexDict[i].dict_key == cellValue) {
          return sexDict[i].dict_desc
        }
      }
    },
    formatIsGraduates: function(row, column, cellValue) {
      var isGraduatesDict = dictData.is_graduates
      for (var i = 0; i < isGraduatesDict.length; i++) {
        if (isGraduatesDict[i].dict_key == cellValue) {
          return isGraduatesDict[i].dict_desc
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
    iiloadData: function() {
      console.log(['父组件的loadData执行了'])
      loadData()
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
  GUtils.post(dataPath.getStudentBaseInfo, formStore.bindMutual.data, function(data) {
    console.log(['loadData', data])
    selectTableStore.store.data = data.resBody.responseData
    formStoreData.pushData({
      'page_total': data.resBody.pageCount
    })
  })
}
