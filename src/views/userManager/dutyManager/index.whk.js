import Vue from 'vue'
import Element from 'element-ui'
import '@/theme/index.css'
import VueExpand from '@/components/VueExpand'
Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
import GraceComponent from '@/ComponentPackage/GraceComponents.js'
import RquestPathConfig from '@/API/Duty/duty_manager_system.js'
import axios from 'axios'
import nroleCheck from '@/module/revolution-vue/customer-proxy/CheckBoxGroupAndGroup/DutyRoleCheckResolverClone.js'
import roleCheck from '@/module/revolution-vue/customer-proxy/CheckBoxGroupAndGroup/DutyRoleCheckResolverCheck.js'
Vue.use(GraceComponent)

var pagehContainer = GStoreFactory.buildVContainer()
var pageManagerStore = GStoreFactory.buildManagerPageStore()

var pageDataStore = GStoreFactory.buildServiceForm()
var rolesList = GStoreFactory.buildServiceFormData()
// var userTypeList = GStoreFactory.buildServiceFormData();
var memberData = [{
  'label': '是',
  'val': 'Y'
}, {
  'label': '否',
  'val': 'N'
}]

// ----------增加职务表单定义----------
var addDutyStore = GStoreFactory.buildServiceForm()
var addDutyFormData = GStoreFactory.buildServiceFormData()
addDutyFormData.pushData({
  dutyName: '',
  roleValue: '',
  targetUserType: '', // id
  available: 'Y', // 状态(是否可用)
  nRoleValue: [],
  isMember: 'Y'
})
addDutyFormData.pushRules({
  dutyName: [{
    required: true,
    message: '请输入职务名称',
    trigger: 'blur'
  }, {
    min: 1,
    max: 20,
    message: '长度在 1 到 20 个字符',
    trigger: 'blur'
  }],
  nRoleValue: [{
    required: true,
    message: '请选择角色',
    trigger: 'blur'
  }],
  targetUserType: [{
    required: true,
    message: '请选择用户类型',
    trigger: 'blur'
  }]

})

var addRadioStore = GStoreFactory.buildSmallRadioStore(addDutyFormData.data, 'available')
addRadioStore.pushData({
  'val': 'Y',
  'name': '可用'
})
addRadioStore.pushData({
  'val': 'N',
  'name': '停用'
})
addDutyStore.addAttr('formData', addDutyFormData)
addDutyStore.addConf('saveData', {
  'method': 'post',
  'url': RquestPathConfig.saveDuty
})
// ----------增加职务表单定义结束----------
// ----------更新职务表单定义结束----------
var updateDutyStore = GStoreFactory.buildServiceForm()
var updateDutyFormData = GStoreFactory.buildServiceFormData()
updateDutyFormData.pushData({
  dutyName: '',
  roleValue: '',
  targetUserType: '', //
  available: 'Y', // 状态(是否可用)
  nRoleValue: [],
  isMember: 'Y'
})
updateDutyFormData.pushRules({
  dutyName: [{
    required: true,
    message: '请输入职务名称',
    trigger: 'blur'
  }, {
    min: 1,
    max: 20,
    message: '长度在 1 到 20 个字符',
    trigger: 'blur'
  }],
  nRoleValue: [{
    required: true,
    message: '请选择角色',
    trigger: 'blur'
  }],
  targetUserType: [{
    required: true,
    message: '请选择用户类型',
    trigger: 'blur'
  }]

})

var updateRadioStore = GStoreFactory.buildSmallRadioStore(updateDutyFormData.data, 'available')
updateRadioStore.pushData({
  'val': 'Y',
  'name': '可用'
})
updateRadioStore.pushData({
  'val': 'N',
  'name': '停用'
})
updateDutyStore.addAttr('formData', updateDutyFormData)
updateDutyStore.addConf('updateData', {
  'method': 'post',
  'url': RquestPathConfig.updateDuty
})

// ----------更新职务表单定义结束----------

var n_f_role_val = GStoreFactory.buildSmallCheckBoxStore(addDutyFormData.data, 'nRoleValue')
n_f_role_val.addConf('isButton', false)

var u_f_role_val = GStoreFactory.buildSmallCheckBoxStore(updateDutyFormData.data, 'nRoleValue')
u_f_role_val.addConf('isButton', false)

// ----------加载角色列表---------

var rolesConf = {
  'method': 'post',
  'url': RquestPathConfig.getRoles
}
var iRolesList = []
pageManagerStore.store.conf.loaddings = true
axios(rolesConf).then(function(response) {
  iRolesList.push(response.data.body.resBody)
  console.log(['response.data.body.resBody', response.data.body.resBody])
  n_f_role_val.pushAllByFormat(response.data.body.resBody, {
    'name': 'lable',
    'val': 'val'
  })
  u_f_role_val.pushAllByFormat(response.data.body.resBody, {
    'name': 'lable',
    'val': 'val'
  })
  rolesList.pushData(response.data.body.resBody)
}).catch(function(error) {
  vuemain.$message({
    showClose: true,
    message: error.message,
    type: 'error'
  })
})
// ----------加载角色列表end---------

var roles = []
pageManagerStore.store.conf.loaddings = true
axios(rolesConf).then(function(response) {
  // rolesList.pushData(response.data.body.resBody);
  roles.push(response.data.body.resBody)
}).catch(function(error) {
  vuemain.$message({
    showClose: true,
    message: error.message,
    type: 'error'
  })
})

// ----------加载用户类型列表---------
var userTypeConf = {
  'method': 'post',
  'url': RquestPathConfig.getTargetUserType
}
var userTypeList = []
axios(userTypeConf).then(function(response) {
  pageManagerStore.store.conf.loaddings = false
  userTypeList.push(response.data.body.resBody)
}).catch(function(error) {
  pageManagerStore.store.conf.loaddings = false
  vuemain.$message({
    showClose: true,
    message: error.message,
    type: 'error'
  })
})
// ----------加载用户类型列表end---------
var userTypeConf = {
  'method': 'post',
  'url': RquestPathConfig.getTargetUserType
}
var userTypes = []
axios(userTypeConf).then(function(response) {
  pageManagerStore.store.conf.loaddings = false
  userTypes.push(response.data.body.resBody)
}).catch(function(error) {
  pageManagerStore.store.conf.loaddings = false
  vuemain.$message({
    showClose: true,
    message: error.message,
    type: 'error'
  })
})

pageManagerStore.addConf('loadData', function() {
  loadData()
})

var selectTableStore = GStoreFactory.buildSelectTable()
selectTableStore.addConf('expands', [{
  label: '地址',
  attr: 'address'
}, {
  label: '名称',
  attr: 'name'
}])
selectTableStore.addConf('isExpand', true)
selectTableStore.addConf('isBorder', false)
selectTableStore.addConf('isRowOperation', true)
selectTableStore.addConf('operations', [{
  'name': 'edit',
  title: '编辑',
  operator: function(index, row) {
    vuemain.udialogVisible = true
    console.log(['row', row])
    if (row.available == '不可用') {
      var ava = 'N'
    }
    if (row.available == '可用') {
      var ava = 'Y'
    }

    GUtils.post(RquestPathConfig.getDutyById, { 'id': row.id }, function(data) {
      console.log(['dataedit', data])
      updateDutyFormData.pushData({
        id: row.id,
        dutyName: data.resBody.baseData[0].dutyName,
        roleValue: '',
        targetUserType: data.resBody.baseData[0].targetUserType,
        available: data.resBody.baseData[0].available,
        isMember: data.resBody.baseData[0].isMember,
        nRoleValue: data.resBody.roleValArr
      })
    })
  }
}, {
  'name': 'del',
  title: '删除',
  operator: function(index, row) {
    console.log(['this is a click event', index, row])
    var deleteDutyConfig = selectTableStore.store.conf.deleteDuty
    deleteDutyConfig.data = {
      'id': row.id
    }
    axios(deleteDutyConfig)
      .then(function(response) {
        console.log(['response', response])
        if (response.data.length == 0) {
          vuemain.$message({
            showClose: true,
            message: '恭喜你，删除职务成功',
            type: 'success'
          })
          loadData()
        } else {
          vuemain.$message({
            showClose: true,
            message: response.data.body.message,
            type: 'error'
          })
          pageManagerStore.store.conf.loaddings = false
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}])
selectTableStore.addConf('storeLoader', {
  'method': 'post',
  'url': RquestPathConfig.getAllDuty
})
selectTableStore.addConf('deleteDuty', {
  'method': 'post',
  'url': RquestPathConfig.deleteDuty
})
selectTableStore.addConf('deleteMoreDuty', {
  'method': 'post',
  'url': RquestPathConfig.deleteMoreDuty
})
var formStore = GStoreFactory.buildServiceForm()
formStore.addConf('isInline', true)
var formStoreData = GStoreFactory.buildServiceFormData()
formStoreData.pushData({
  dutyName: '',
  roleValue: '',
  targetUserType: '',
  available: ''
})
formStoreData.pushRules({
  dutyName: [{
    max: 20,
    message: '长度不能大于20个字符',
    trigger: 'blur'
  }]
})
formStore.addAttr('bindMutual', formStoreData)
var moreItemFormStore = GStoreFactory.buildServiceForm()
moreItemFormStore.addConf('isInline', false)
moreItemFormStore.addConf('labelWidth', '80px')
moreItemFormStore.addConf('labelPosition', 'right')
moreItemFormStore.addConf('refDefined', 'moreForm')
moreItemFormStore.addAttr('bindMutual', formStoreData)
var pageStore = GStoreFactory.buildPageStore()
formStoreData.pushPage()
formStoreData.pushData({
  'page_total': 230
})
pageStore.addAttr('bindMutual', formStoreData)

pageManagerStore.addAttr('serviceForm', formStore)
pageManagerStore.addAttr('serviceTable', selectTableStore)
pageManagerStore.addAttr('servicePage', pageStore)

pageManagerStore.addConf('operations', [{
  name: 'ex',
  title: '导入',
  operator: function(servcieTable, serviceForm) {
    console.log(['this...', vuemain])
  }
}, {
  name: 'vh',
  title: '批量删除',
  operator: function(servcieTable, serviceForm) {
    pageManagerStore.store.conf.loaddings = true
    var arr = selectTableStore.store.conf.selects
    if (arr.length == 0) {
      vuemain.$message({
        showClose: true,
        message: '您没有中任何用户',
        type: 'error'
      })
      pageManagerStore.store.conf.loaddings = false
    } else {
      var reArr = []
      for (var i = 0; i < arr.length; i++) {
        reArr.push(arr[i].id)
      }
      var delMoreConfig = selectTableStore.store.conf.deleteMoreDuty
      delMoreConfig.data = {
        'array': reArr
      }
      console.log(['delMoreConfig', delMoreConfig])
      axios(delMoreConfig).then(function(response) {
        if (response.data.length == 0) {
          vuemain.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          loadData()
        } else {
          vuemain.$message({
            showClose: true,
            message: response.data.body.message,
            type: 'error'
          })
          loadData()
        }
      }).catch(function(error) {
        pageManagerStore.store.conf.loaddings = false
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
pageDataStore.addAttr('rolesList', rolesList)
// pageDataStore.addAttr("userTypeList", userTypeList);

console.log(['iRolesList', iRolesList])

nroleCheck.getResolver()._v_bind(addDutyStore.formData.data, 'nRoleValue')
roleCheck.getResolver()._v_bind(updateDutyStore.formData.data, 'nRoleValue')

var vuemain = new Vue({
  el: '#bodyBox',
  data: {
    memberData: memberData,
    userTypes: userTypes,
    roles: roles,
    pageHCon: pagehContainer,
    pmanager: pageManagerStore,
    serviceForm: formStore,
    serviceTable: selectTableStore,
    moreForm: moreItemFormStore,
    tabsStore: tabsStore,
    addDutyStore: addDutyStore,
    addRadioStore: addRadioStore,
    rolesList: pageDataStore.rolesList.data,
    userTypeList: userTypeList, // pageDataStore.userTypeList.data,
    dialogVisible: false,
    udialogVisible: false,
    updateDutyStore: updateDutyStore,
    updateRadioStore: updateRadioStore,
    n_f_role_val: n_f_role_val,
    u_f_role_val: u_f_role_val,
    options: [{
      label: '不限',
      value: ''
    }, {
      label: '可用',
      value: 'Y'
    }, {
      label: '停用',
      value: 'N'
    }]

  },
  components: {
	  'nrole-check': nroleCheck,
	  'role-check': roleCheck
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
    saveDuty: function(formName) {
      vuemain.$refs[formName].validate((valid) => {
        if (valid) {
          pageManagerStore.store.conf.loaddings = true
          var addDutyConfig = addDutyStore.store.conf.saveData
          console.log(['addDutyStore.formData.data', addDutyStore.formData.data])
          addDutyConfig.data = addDutyStore.formData.data
          axios(addDutyConfig)
            .then(function(response) {
              console.log(['response', response])
              if (response.data.length == 0) {
                vuemain.$message({
                  showClose: true,
                  message: '恭喜你，增加职务成功',
                  type: 'success'
                })
                vuemain.dialogVisible = false
                loadData()
              } else {
                vuemain.$message({
                  showClose: true,
                  message: response.data.body.message,
                  type: 'error'
                })
                pageManagerStore.store.conf.loaddings = false
                vuemain.dialogVisible = true
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        } else {
          return false
        }
      })
    },
    updateDuty: function(formName) {
      vuemain.$refs[formName].validate((valid) => {
        if (valid) {
          pageManagerStore.store.conf.loaddings = true
          var updateDutyConfig = updateDutyStore.store.conf.updateData
          console.log(['updateDutyStore.formData.data', updateDutyStore.formData.data])
          updateDutyConfig.data = vuemain.updateDutyStore.formData.data
          console.log(['updateDutyConfig', updateDutyConfig])
          axios(updateDutyConfig)
            .then(function(response) {
              console.log(['response', response])
              if (response.data.length == 0) {
                vuemain.$message({
                  showClose: true,
                  message: '恭喜你，更新职务成功',
                  type: 'success'
                })
                vuemain.udialogVisible = false
                loadData()
              } else {
                vuemain.$message({
                  showClose: true,
                  message: response.data.body.message,
                  type: 'error'
                })
                pageManagerStore.store.conf.loaddings = false
                vuemain.udialogVisible = true
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        } else {
          return false
        }
      })
    }
  },
  watch: {
    'pageHCon.store.conf.resultHeight': function(val) {
      this.pmanager.store.conf.workSpaceHeight = val - 4
      this.tabsStore.store.conf.height = val - 2
    }
  }
})

// 加载数据的方法
function loadData() {
  var requestConfig = selectTableStore.store.conf.storeLoader
  var requestData = formStore.bindMutual.data
  console.log(['requestData', requestData])
  requestConfig.data = requestData
  var that = vuemain
  pageManagerStore.store.conf.loaddings = true
  axios(requestConfig).then(function(response) {
    console.log(['respppppp', response])
    pageManagerStore.store.conf.loaddings = false
    selectTableStore.store.data = response.data.body.resBody.rData
    formStoreData.pushData({
      'page_total': response.data.body.resBody.totalPage
    })
  }).catch(function(error) {
    pageManagerStore.store.conf.loaddings = false
    that.$message({
      showClose: true,
      message: error.message,
      type: 'error'
    })
  })
}
