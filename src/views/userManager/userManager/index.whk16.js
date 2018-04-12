import Vue from 'vue'
import Element from 'element-ui'
import '@/theme/index.css'
import VueExpand from '@/components/VueExpand'
Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
import GraceComponent from '@/ComponentPackage/GraceComponents.js'
import RquestPathConfig from '@/API/User/user_manager_system.js'
import reqPath from '@/API/System/SystemManagerApi.js'
import axios from 'axios'

Vue.use(GraceComponent)

var pagehContainer = GStoreFactory.buildVContainer()
var pageManagerStore = GStoreFactory.buildManagerPageStore()

pageManagerStore.addConf('loadData', function() {
  loadData()
})
pageManagerStore.addConf('workSpaceWidth', '40vw')

// var pageDataStore = GStoreFactory.buildServiceForm();
// var orgList = GStoreFactory.buildServiceFormData();
// var dutyList = GStoreFactory.buildServiceFormData();
// var tempRowUserId = 0;
// //----------加载组织列表---------
// var orgConf = {
//	"method": "post",
//	"url": RquestPathConfig.getOrgsUrl
// }
// pageManagerStore.store.conf.loaddings = true;
// axios(orgConf).then(function(response) {
//	console.log(["response", response]);
//	pageManagerStore.store.conf.loaddings = false;
//	orgList.pushData(response.data.body.resBody);
// }).catch(function(error) {
//	pageManagerStore.store.conf.loaddings = false;
//	vuemain.$message({
//		showClose: true,
//		message: error.message,
//		type: 'error'
//	});
// });
//
// var dutyListConf = {
//	"method": "post",
//	"url": RquestPathConfig.getDutyListUrl
// }
// axios(dutyListConf).then(function(response) {
//	dutyList.pushData(response.data.body.resBody);
//	pageManagerStore.store.conf.loaddings = false;
// }).catch(function(error) {
//	pageManagerStore.store.conf.loaddings = false;
//	vuemain.$message({
//		showClose: true,
//		message: error.message,
//		type: 'error'
//	});
// });

// ----------加载职务列表end---------
// pageDataStore.addAttr("orgList", orgList);
// pageDataStore.addAttr("dutyList", dutyList);
// //-----职务分配相关
// var dutyTableStore = GStoreFactory.buildServiceForm();
// var dutyTableData = GStoreFactory.buildServiceFormData();
// dutyTableData.pushData({
//	tData: []
// });
// dutyTableStore.addAttr("tableData", dutyTableData);
// dutyTableStore.addConf("getUserDuty", {
//	"method": "post",
//	"url": RquestPathConfig.getUserDutyUrl
// });
// dutyTableStore.addConf("deleteUserDuty", {
//	"method": "post",
//	"url": RquestPathConfig.deleteUserDutyUrl
// });
//
// dutyTableStore.addConf("loading", false);
// //-----职务分配结束
// //----增加用户职务表单定义
// var addUserDutyStore = GStoreFactory.buildServiceForm();
// var addUserDutyData = GStoreFactory.buildServiceFormData();
// addUserDutyData.pushData({
//	userId: "",
//	orgCode: [],
//	definitionName: "",
//	definitionCode: "",
//	beginDate: "",
//	expireDate: "",
//	isBandh: "N"
// });
// addUserDutyData.pushRules({
//	orgCode: [{
//		required: true,
//		message: '此项不能为空',
//		trigger: 'blur'
//	}],
//	definitionCode: [{
//		required: true,
//		message: '此项不能为空',
//		trigger: 'blur'
//	}],
//	beginDate: [{
//		required: true,
//		message: '此项不能为空',
//		trigger: 'blur'
//	}],
//	expireDate: [{
//		required: true,
//		message: '此项不能为空',
//		trigger: 'blur'
//	}],
//	isBandh: [{
//		required: true,
//		message: '此项不能为空',
//		trigger: 'blur'
//	}]
// });
// var addDutyRadioStore = GStoreFactory.buildSmallRadioStore(addUserDutyData.data, 'isBandh');
// addDutyRadioStore.pushData({
//	"val": "Y",
//	"name": "是"
// });
// addDutyRadioStore.pushData({
//	"val": "N",
//	"name": "否"
// });
// addUserDutyStore.addAttr("formData", addUserDutyData);
// addUserDutyStore.addConf("saveUserDuty", {
//	"method": "POST",
//	"url": RquestPathConfig.saveUserDutyUrl
// });
// //----增加用户职务表单定义结束
// //----更新用户职务表单定义
// var updateUserDutyStore = GStoreFactory.buildServiceForm();
// var updateUserDutyData = GStoreFactory.buildServiceFormData();
// updateUserDutyData.pushData({
//	userId: "",
//	orgCode: [],
//	definitionName: "",
//	definitionCode: "",
//	beginDate: "",
//	expireDate: "",
//	isBandh: "N",
//	id: ""
// });
// updateUserDutyData.pushRules({
//	orgCode: [{
//		required: true,
//		message: '此项不能为空',
//		trigger: 'blur'
//	}],
//	definitionCode: [{
//		required: true,
//		message: '此项不能为空',
//		trigger: 'blur'
//	}],
//	beginDate: [{
//		required: true,
//		message: '此项不能为空',
//		trigger: 'blur'
//	}],
//	expireDate: [{
//		required: true,
//		message: '此项不能为空',
//		trigger: 'blur'
//	}],
//	isBandh: [{
//		required: true,
//		message: '此项不能为空',
//		trigger: 'blur'
//	}]
// });
// var updateDutyRadioStore = GStoreFactory.buildSmallRadioStore(updateUserDutyData.data, 'isBandh');
// updateDutyRadioStore.pushData({
//	"val": "Y",
//	"name": "是"
// });
// updateDutyRadioStore.pushData({
//	"val": "N",
//	"name": "否"
// });
// updateUserDutyStore.addAttr("formData", updateUserDutyData);
// updateUserDutyStore.addConf("updateUserDuty", {
//	"method": "POST",
//	"url": RquestPathConfig.updateUserDutyUrl
// });
// //----更新用户职务表单定义结束

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
selectTableStore.addConf('deleteUser', {
  'method': 'get',
  'url': RquestPathConfig.deleteUserUrl
})
selectTableStore.addConf('deleteMoreUser', {
  'method': 'post',
  'url': RquestPathConfig.deleteMoreUrl
})
selectTableStore.addConf('resetUserPwd', {
  'method': 'get',
  'url': RquestPathConfig.resetUserPwdUrl
})

selectTableStore.addConf('operations', [{
  'name': 'edit',
  title: '编辑',
  operator: function(index, row) {
    vuemain.updateUserDialogVisible = true
    if (row.user_state == '可用') {
      var state = '1'
    } else {
      var state = '0'
    }
    if (row.nick_name != null) {
      var rNickName = row.nick_name
    } else {
      var rNickName = ''
    }
    if (row.mobile_phone != null) {
      var rMobilePhone = row.mobile_phone
    } else {
      var rMobilePhone = ''
    }
    if (row.qq != null) {
      var rQq = row.qq
    } else {
      var rQq = ''
    }
    if (row.email != null) {
      var rEmail = row.email
    } else {
      var rEmail = ''
    }

    updateFormData.pushData({
      id: row.id,
      loginName: row.login_name,
      nickName: rNickName,
      mobilePhone: rMobilePhone,
      qq: rQq,
      email: rEmail,
      userState: state
    })
  }
}, {
  'name': 'del',
  title: '删除',
  operator: function(index, row) {
    console.log(['row', row])
    pageManagerStore.store.conf.loaddings = true
    var delRequestConfig = selectTableStore.store.conf.deleteUser
    delRequestConfig.params = {
      'userId': row.id
    }
    axios(delRequestConfig).then(function(response) {
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
        pageManagerStore.store.conf.loaddings = false
      }
    }).catch(function(error) {
      pageManagerStore.store.conf.loaddings = false
    })
  }
}, {
  'name': 'res',
  title: '重置密码',
  operator: function(index, row) {
    pageManagerStore.store.conf.loaddings = true
    var resetUserPwd = selectTableStore.store.conf.resetUserPwd
    resetUserPwd.params = {
      'userId': row.id
    }
    axios(resetUserPwd).then(function(response) {
      if (response.data.length == 0) {
        vuemain.$message({
          showClose: true,
          message: '重置密码成功',
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
        pageManagerStore.store.conf.loaddings = false
      }
    }).catch(function(error) {
      pageManagerStore.store.conf.loaddings = false
    })
  }
}/*, {
	"name": "renzhi",
	title: "分配职务",
	operator: function(index, row) {
		if(dutyTableData.data.tData.length != 0) {
			//清空数组
			dutyTableData.data.tData.splice(0, dutyTableData.data.tData.length);
		}

		console.log(["分配职务row", row]);
		vuemain.dutyDialogVisible = true;
		addUserDutyData.data.userId = row.id;
		updateUserDutyData.data.userId = row.id;
		allotUserDuty(row.id);

	}

}*/])
selectTableStore.addConf('storeLoader', {
  'method': 'post',
  'url': RquestPathConfig.getUserStoreUrl
})

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
  loginName: '',
  nickName: '',
  phoneNum: '',
  userState: '',
  registerTime: ''

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
  'page_total': 230
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
    console.log(['vuemain', vuemain])
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
      var delMoreConfig = selectTableStore.store.conf.deleteMoreUser
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

// -------增加用户表单定义--------
var addUserFormStore = GStoreFactory.buildServiceForm()
var addUserFormData = GStoreFactory.buildServiceFormData()
addUserFormData.pushData({
  loginName: '',
  loginPwd: '',
  nickName: '',
  mobilePhone: '',
  qq: '',
  email: '',
  userState: '1'
})
var addRadioStore = GStoreFactory.buildSmallRadioStore(addUserFormData.data, 'userState')
addRadioStore.pushData({
  'val': '1',
  'name': '可用'
})
addRadioStore.pushData({
  'val': '0',
  'name': '停用'
})

addUserFormData.pushRules({
  loginName: [{
    required: true,
    message: '请输入登录名',
    trigger: 'blur'
  }, {
    min: 4,
    max: 14,
    message: '登录名长度必须在4到14个字符之间',
    trigger: 'blur'
  }],
  loginPwd: [{
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }, {
    min: 6,
    max: 18,
    message: '密码长度必须在6到18个字符之间',
    trigger: 'blur'
  }],
  nickName: [{
    min: 3,
    max: 20,
    message: '昵称长度必须在3到20个字符之间',
    trigger: 'blur'
  }],
  qq: [{
    min: 5,
    max: 11,
    message: 'QQ号长度应在5到11个字符之间',
    trigger: 'blur'
  }, {
    pattern: /^[0-9]*$/,
    message: 'QQ号码只能为数字',
    trigger: 'blur'
  }],
  mobilePhone: [{
    min: 11,
    max: 11,
    message: '手机号码长度为11位',
    trigger: 'blur'
  }, {
    pattern: /^[0-9]*$/,
    message: '手机号码只能为数字',
    trigger: 'blur'
  }],
  email: [{
    pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    message: '请输入正确邮箱格式',
    trigger: 'blur'
  }]
  /* email:[{

	}]*/
})
addUserFormStore.addAttr('bindMutual', addUserFormData)
addUserFormStore.addConf('storeLoader', {
  'method': 'post',
  'url': RquestPathConfig.addUserStoreUrl
})
// 增加用户表单定义结束
// --------更新用户表单定义--------
var updateStore = GStoreFactory.buildServiceForm()
updateStore.addConf('disabled', true)
var updateFormData = GStoreFactory.buildServiceFormData()

updateFormData.pushRules()
updateFormData.pushData({
  id: '',
  loginName: '',
  nickName: '',
  mobilePhone: '',
  qq: '',
  email: '',
  userState: ''
})
updateStore.addAttr('updateDate', updateFormData)
updateStore.addAttr('updateRules', addUserFormData.rules)
updateStore.addConf('updateUser', {
  'method': 'post',
  'url': RquestPathConfig.updateUserUrl
})
var updateRadioStore = GStoreFactory.buildSmallRadioStore(updateFormData.data, 'userState')
updateRadioStore.pushData({
  'val': '1',
  'name': '可用'
})
updateRadioStore.pushData({
  'val': '0',
  'name': '停用'
})
updateStore.addConf('updateUser', {
  'method': 'post',
  'url': RquestPathConfig.updateUserUrl
})
// --------更新用户表单定义结束--------

/* var f_org_code = GStoreFactory.buildSmallCascaderStore(addUserDutyData.data, 'orgCode');

//f_org_code.addConf("change",function(e){
//	//点击组织回调
//	console.log(["change",e]);
//});
f_org_code.addConf('expandTrigger','hover');
f_org_code.addConf("props", {
	value: 'org_code',
	label: 'org_name',
	children: 'children',
	disabled: 'disabled'
});
var f_org_code2 = GStoreFactory.buildSmallCascaderStore(updateUserDutyData.data, 'orgCode');
f_org_code2.addConf('isSelectChange',false);
//f_org_code2.addConf("change",function(e){
//	//点击组织回调
//	console.log(["change",e]);
//});
f_org_code2.addConf('expandTrigger','hover');
f_org_code2.addConf("props", {
	value: 'org_code',
	label: 'org_name',
	children: 'children',
	disabled: 'disabled'
});

f_org_code2.addConf("disabled", false);
f_org_code.addConf("disabled", false);
GUtils.post(reqPath.queryUserOrg, {}, function(data) {
	f_org_code.pushAll(data.resBody);
	f_org_code2.pushAll(data.resBody);
});
*/
var vuemain = new Vue({
  el: '#bodyBox',
  data: {
    // f_org_code2: f_org_code2,
    // updateUserDutyLoading: false,
    // dutyTableLoading: false,
    // updateUserDurtDV: false,
    // addShow: true,
    // dutyDialogVisible: false,
    dialogVisible: false,
    updateUserDialogVisible: false,
    // f_org_code: f_org_code,
    // addDutyRadioStore: addDutyRadioStore,
    // //updateDutyRadioStore: updateDutyRadioStore,
    // orgList: pageDataStore.orgList.data,
    // dutyList: pageDataStore.dutyList.data,
    //	addUserDutyStore: addUserDutyStore,
    // updateUserDutyStore: updateUserDutyStore,
    // dutyTableStore: dutyTableStore,
    pageHCon: pagehContainer,
    pmanager: pageManagerStore,
    serviceForm: formStore,
    serviceTable: selectTableStore,
    moreForm: moreItemFormStore,
    tabsStore: tabsStore,
    addUserForm: addUserFormStore,
    addRadioStore: addRadioStore,
    updateRadioStore: updateRadioStore,
    updateUserForm: updateStore,
    options: [{
      label: '不限',
      value: ''
    }, {
      label: '可用',
      value: '1'
    }, {
      label: '停用',
      value: '0'
    }]
  },
  mounted: function() {
    var height = GUtils.getClientHeight()
    pagehContainer.store.conf.prefHeight = height
  },
  methods: {
    //		change:function(a1){
    //			console.log(["a1",a1])
    //		},
    updateUserDuty: function(formName) {
      vuemain.$refs[formName].validate((valid) => {
        if (valid) {
          vuemain.dutyTableLoading = true
          var updateUserDutyConf = updateUserDutyStore.store.conf.updateUserDuty
          updateUserDutyConf.data = updateUserDutyStore.formData.data
          console.log(['updateUserDutyConf.data', updateUserDutyConf.data])
          vuemain.updateUserDurtDV = false
          axios(updateUserDutyConf).then(function(response) {
            console.log(['updateUserDutyStore', vuemain.updateUserDutyStore.formData.data])
            allotUserDuty(vuemain.updateUserDutyStore.formData.data.userId)
            if (response.data.length == 0) {
              vuemain.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
            } else {
              vuemain.$message({
                showClose: true,
                message: response.data.body.message,
                type: 'error'
              })
            }
          })
            .catch(function(error) {
              console.log(error)
              vuemain.dutyTableLoading = false
            })
        } else {
          return false
        }
      })
    },
    saveUserDuty: function(formName) {
      vuemain.$refs[formName].validate((valid) => {
        if (valid) {
          vuemain.dutyTableLoading = true
          var saveUserDutyConfig = addUserDutyStore.store.conf.saveUserDuty
          saveUserDutyConfig.data = vuemain.addUserDutyStore.formData.data
          vuemain.addShow = true
          axios(saveUserDutyConfig).then(function(response) {
            if (response.data.length == 0) {
              vuemain.$message({
                showClose: true,
                message: '分配成功',
                type: 'success'
              })
              allotUserDuty(addUserDutyData.data.userId)
            } else {
              vuemain.$message({
                showClose: true,
                message: response.data.body.message,
                type: 'error'
              })
            }
          })
            .catch(function(error) {
              console.log(error)
              vuemain.dutyTableLoading = false
            })
        } else {
          return false
        }
      })
    },
    getName: function(val) {
      var t = dutyList.data
      for (var i = 0; i < Object.keys(t).length; i++) {
        if (t[i]['definition_code'] == val) {
          addUserDutyStore.formData.data.definitionName = t[i]['definition_name']
        }
      }
      console.log(this)
    },
    getDName: function(val) {
      var t = dutyList.data
      for (var i = 0; i < Object.keys(t).length; i++) {
        if (t[i]['definition_code'] == val) {
          updateUserDutyStore.formData.data.definitionName = t[i]['definition_name']
        }
      }
      console.log(this)
    },
    addDutyButton: function() {
      console.log(['addDutyButton', this.dutyTableStore.store.conf.addShow])
      this.addShow = false
      console.log(['addDutyButton', this.dutyTableStore.store.conf.addShow])
    },
    handleEdit: function(index, row) {
      console.log(['编辑', row])
      this.updateUserDurtDV = true
      this.updateUserDutyLoading = true
      console.log(['row.orgCode', row.org_code])
      var rDefinitionCode = row.definition_code.toString()
      updateUserDutyData.pushData({
        userId: '',
        orgCode: [],
        definitionName: '',
        definitionCode: '',
        beginDate: '',
        expireDate: '',
        isBandh: 'Y',
        id: ''
      })
      /* ---------------*/
      var getUserDConf = {
        'url': RquestPathConfig.getUserDutyByIdUrl,
        'method': 'post'
      }
      getUserDConf.data = {
        'id': row.id
      }
      axios(getUserDConf).then(function(response) {
        vuemain.updateUserDutyLoading = false
        updateUserDutyData.pushData({
          userId: response.data.body.resBody.userDuty[0].userId,
          orgCode: response.data.body.resBody.orgCodeArr,
          definitionName: response.data.body.resBody.userDuty[0].definitionName,
          definitionCode: response.data.body.resBody.userDuty[0].definitionCode,
          beginDate: response.data.body.resBody.userDuty[0].beginDate,
          expireDate: response.data.body.resBody.userDuty[0].expireDate,
          isBandh: response.data.body.resBody.userDuty[0].isBandh,
          id: response.data.body.resBody.userDuty[0].id
        })
      })
        .catch(function(error) {
          vuemain.updateUserDutyLoading = false
          console.log(error)
        })

      /* ---------------*/
    },
    handleDelete: function(index, row) {
      console.log(['删除', row])
      vuemain.dutyTableLoading = true
      var deleteUserDutyConf = dutyTableStore.store.conf.deleteUserDuty
      deleteUserDutyConf.data = {
        'dutyId': row.id
      }
      axios(deleteUserDutyConf)
        .then(function(response) {
          vuemain.dutyTableLoading = false
          if (response.data.length == 0) {
            allotUserDuty(row.user_id)
            vuemain.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
          } else {
            vuemain.dutyTableLoading = false
            vuemain.$message({
              showClose: true,
              message: response.data.body.message,
              type: 'error'
            })
          }
        })
        .catch(function(error) {
          console.log(error)
          vuemain.dutyTableLoading = false
        })
    },
    addTab: function() {
      tabsStore.addTab({
        'name': '301',
        'title': '学生会管理'
      })
    },
    updateUser: function(formName) {
      vuemain.$refs[formName].validate((valid) => {
        if (valid) {
          pageManagerStore.store.conf.loaddings = true
          vuemain.updateUserDialogVisible = false
          pageManagerStore.store.conf.loaddings = true
          var updateConfig = updateStore.store.conf.updateUser
          updateConfig.data = updateStore.updateDate.data
          axios(updateConfig)
            .then(function(response) {
              if (response.data.length == 0) {
                vuemain.$message({
                  showClose: true,
                  message: '更新信息成功',
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
                this.dialogVisible = true
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
    addUserButton: function() {
      this.dialogVisible = true
    },
    // 增加用户的方法
    saddUser: function(formName) {
      vuemain.$refs[formName].validate((valid) => {
        if (valid) {
          vuemain.dialogVisible = false
          pageManagerStore.store.conf.loaddings = true
          var addRequestConfig = addUserFormStore.store.conf.storeLoader
          var addRequestData = addUserFormStore.bindMutual.data
          addRequestConfig.data = addRequestData
          axios(addRequestConfig)
            .then(function(response) {
              console.log(['response', response])
              if (response.data.length == 0) {
                vuemain.$message({
                  showClose: true,
                  message: '恭喜你，增加用户成功',
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
                this.dialogVisible = true
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
    console.log(['length', response.data.body])
    if (response.data.body.resBody == null) {
      pageManagerStore.store.conf.loaddings = false
      vuemain.$message({
        showClose: true,
        message: response.data.body.message,
        type: 'error'
      })
    } else {
      pageManagerStore.store.conf.loaddings = false
      selectTableStore.store.data = response.data.body.resBody.rData
      formStoreData.pushData({
        'page_total': response.data.body.resBody.totalPage
      })
    }
  }).catch(function(error) {
    pageManagerStore.store.conf.loaddings = false
    that.$message({
      showClose: true,
      message: error.message,
      type: 'error'
    })
  })
}

function allotUserDuty(id) {
  vuemain.dutyTableLoading = true

  var getUserDutyConf = dutyTableStore.store.conf.getUserDuty
  getUserDutyConf.data = {
    'userId': id
  }
  axios(getUserDutyConf).then(function(response) {
    console.log(['分配职务response', response])
    if (response.data.length == 0) {
      // 无数据
    } else {
      dutyTableData.pushData({
        'tData': response.data.body.resBody
      })
    }
    vuemain.dutyTableLoading = false
  }).catch(function(error) {
    console.log(error)
    vuemain.dutyTableLoading = false
  })
}
