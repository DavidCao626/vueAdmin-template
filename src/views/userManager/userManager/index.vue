<template>

  <div id="bodyBox">
    <gc-container :component-store="pageHCon">
      <div slot="header">
      </div>
      <gc-manager :component-store="pmanager">
        <template slot="quickSearchItems">
          <el-form-item label="登录名" prop="loginName">
            <el-input v-model="serviceForm.bindMutual.data.loginName" size="mini"></el-input>
          </el-form-item>
        </template>
        <!-- 常用的操作-->
        <template slot="often">
          <el-button type="info" title="更多条件" size="mini" @click='addUserButton'>新增用户</el-button>
          <el-button type="info" title="导出" size="mini">导出</el-button>
          <el-button type="info" title="导出" size="mini">打包</el-button>
        </template>
        <template slot="allSearchItems">
          <gc-form :component-store="moreForm">
            <el-form-item label="登录名" prop="loginName">
              <el-input v-model="moreForm.bindMutual.data.loginName" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="moreForm.bindMutual.data.nickName" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNum">
              <el-input v-model="moreForm.bindMutual.data.phoneNum" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="用户状态" prop="userState">
              <el-select v-model="moreForm.bindMutual.data.userState" placeholder="请选择">
                <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </gc-form>
        </template>
        <template slot="dataCloumns">

          <el-table-column prop="login_name" label="登录名" min-width="120">
          </el-table-column>
          <el-table-column prop="nick_name" label="用户昵称" min-width="120">
          </el-table-column>
          <el-table-column prop="mobile_phone" min-width="120" label="手机号码">
          </el-table-column>
          <el-table-column prop="qq" min-width="120" label="QQ号码">
          </el-table-column>
          <el-table-column prop="email" min-width="120" label="邮箱">
          </el-table-column>
          <!--<el-table-column prop="definition_name" min-width="80" label="主要职务">
						</el-table-column>-->
          <el-table-column prop="user_state" min-width="60" label="状态">
          </el-table-column>
          <el-table-column prop="register_time" min-width="120" sortable label="注册时间">
          </el-table-column>
          <el-table-column prop="last_update_time" min-width="120" sortable label="最后修改时间">
          </el-table-column>

        </template>
      </gc-manager>
    </gc-container>
    <!--增加用户开始-->
    <el-dialog title="增加用户" :visible.sync="dialogVisible" width="45vw" top="8vh">
      <div style="overflow-y:scroll;height:48vh;padding:0 15px">
        <!--<slot name="allSearchItems"></slot>-->
        <el-form size="mini" :model="addUserForm.bindMutual.data" ref='addForm' :rules='addUserForm.bindMutual.rules' label-width="80px">
          <el-form-item prop='loginName' label="登录名">
            <el-col :span="20">
              <el-input v-model='addUserForm.bindMutual.data.loginName' size="mini" placeholder="请输入登录名"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop='loginPwd' label="密码">
            <el-col :span="20">
              <el-input type="password" v-model='addUserForm.bindMutual.data.loginPwd' size="mini" placeholder="请输入密码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop='nickName' label="昵称">
            <el-col :span="20">
              <el-input v-model='addUserForm.bindMutual.data.nickName' size="mini" placeholder="请输入昵称"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop='mobilePhone' label="手机号">
            <el-col :span="20">
              <el-input v-model='addUserForm.bindMutual.data.mobilePhone' size="mini" placeholder="请输入手机号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop='qq' label="QQ号">
            <el-col :span="20">
              <el-input v-model='addUserForm.bindMutual.data.qq' size="mini" placeholder="请输入QQ号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop='email' label="邮箱">
            <el-col :span="20">
              <el-input v-model='addUserForm.bindMutual.data.email' size="mini" placeholder="请输入邮箱"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="是否可用" prop='userState'>
            <gc-s-radio :component-store="addRadioStore"></gc-s-radio>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="saddUser('addForm')">增 加</el-button>
        <el-button size="small" @click="dialogVisible= false">取 消</el-button>
      </span>
    </el-dialog>
    <!--增加用户结束-->
    <!--修改用户开始-->
    <el-dialog title="修改用户" :visible.sync="updateUserDialogVisible" width="45vw" top="10vh">

      <div style="overflow-y:scroll;height:40vh;padding:0 15px">
        <!--<slot name="allSearchItems"></slot>-->

        <el-form size="mini" :model="updateUserForm.updateDate.data" ref="updateForm" :rules='updateUserForm.updateRules' label-width="80px">
          <el-form-item label="登录名">
            <el-col :span="18">
              <el-input disabled v-model='updateUserForm.updateDate.data.loginName' size="mini"></el-input>
            </el-col>
          </el-form-item>
          <!--<el-form-item prop='loginPwd' label="密码">
							<el-col :span="18">
								<el-input disabled type='password' v-model='updateUserForm.updateDate.data.loginPwd' size="mini" placeholder="请输入密码"></el-input>
							</el-col>
						</el-form-item>-->
          <el-form-item prop='nickName' label="昵称">
            <el-col :span="18">
              <el-input v-model='updateUserForm.updateDate.data.nickName' size="mini" placeholder="请输入昵称"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop='mobilePhone' label="手机号">
            <el-col :span="18">
              <el-input v-model='updateUserForm.updateDate.data.mobilePhone' size="mini" placeholder="请输入手机号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop='qq' label="QQ号">
            <el-col :span="18">
              <el-input v-model='updateUserForm.updateDate.data.qq' size="mini" placeholder="请输入QQ号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop='email' label="邮箱">
            <el-col :span="18">
              <el-input v-model='updateUserForm.updateDate.data.email' size="mini" placeholder="请输入邮箱"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="是否可用" prop='userState'>
            <gc-s-radio :component-store="updateRadioStore"></gc-s-radio>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="updateUser('updateForm')">修改</el-button>
        <el-button size="small" @click="updateUserDialogVisible= false">取 消</el-button>
      </span>
    </el-dialog>
    <!--修改用户结束-->

  </div>
</template>

<script>
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
import axios from 'axios'

Vue.use(GraceComponent)

var pagehContainer = GStoreFactory.buildVContainer()
var pageManagerStore = GStoreFactory.buildManagerPageStore()

pageManagerStore.addConf('loadData', function() {
  loadData()
})
pageManagerStore.addConf('workSpaceWidth', '40vw')

var selectTableStore = GStoreFactory.buildSelectTable()
selectTableStore.addConf('expands', [
  {
    label: '地址',
    attr: 'address'
  },
  {
    label: '名称',
    attr: 'name'
  }
])
selectTableStore.addConf('isExpand', true)
selectTableStore.addConf('isBorder', false)
selectTableStore.addConf('isRowOperation', true)
selectTableStore.addConf('deleteUser', {
  method: 'get',
  url: RquestPathConfig.deleteUserUrl
})
selectTableStore.addConf('deleteMoreUser', {
  method: 'post',
  url: RquestPathConfig.deleteMoreUrl
})
selectTableStore.addConf('resetUserPwd', {
  method: 'get',
  url: RquestPathConfig.resetUserPwdUrl
})

selectTableStore.addConf('storeLoader', {
  method: 'post',
  url: RquestPathConfig.getUserStoreUrl
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
formStoreData.pushRules({})

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
  page_total: 230
})
pageStore.addAttr('bindMutual', formStoreData)

/**
 * 改造，定义默认的名称，不需要进行名称录入
 */
pageManagerStore.addAttr('serviceForm', formStore)
pageManagerStore.addAttr('serviceTable', selectTableStore)
pageManagerStore.addAttr('servicePage', pageStore)

var tabsStore = GStoreFactory.buildTabsStore()
tabsStore.pushAll([
  {
    name: '101',
    title: '学生管理',
    link: 'form.html'
  },
  {
    name: '102',
    title: '学院管理'
  }
])
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
var addRadioStore = GStoreFactory.buildSmallRadioStore(
  addUserFormData.data,
  'userState'
)
addRadioStore.pushData({
  val: '1',
  name: '可用'
})
addRadioStore.pushData({
  val: '0',
  name: '停用'
})

addUserFormData.pushRules({
  loginName: [
    {
      required: true,
      message: '请输入登录名',
      trigger: 'blur'
    },
    {
      min: 4,
      max: 14,
      message: '登录名长度必须在4到14个字符之间',
      trigger: 'blur'
    }
  ],
  loginPwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 18,
      message: '密码长度必须在6到18个字符之间',
      trigger: 'blur'
    }
  ],
  nickName: [
    {
      min: 3,
      max: 20,
      message: '昵称长度必须在3到20个字符之间',
      trigger: 'blur'
    }
  ],
  qq: [
    {
      min: 5,
      max: 11,
      message: 'QQ号长度应在5到11个字符之间',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]*$/,
      message: 'QQ号码只能为数字',
      trigger: 'blur'
    }
  ],
  mobilePhone: [
    {
      min: 11,
      max: 11,
      message: '手机号码长度为11位',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]*$/,
      message: '手机号码只能为数字',
      trigger: 'blur'
    }
  ],
  email: [
    {
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      message: '请输入正确邮箱格式',
      trigger: 'blur'
    }
  ]
  /* email:[{

	}]*/
})
addUserFormStore.addAttr('bindMutual', addUserFormData)
addUserFormStore.addConf('storeLoader', {
  method: 'post',
  url: RquestPathConfig.addUserStoreUrl
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
  method: 'post',
  url: RquestPathConfig.updateUserUrl
})
var updateRadioStore = GStoreFactory.buildSmallRadioStore(
  updateFormData.data,
  'userState'
)
updateRadioStore.pushData({
  val: '1',
  name: '可用'
})
updateRadioStore.pushData({
  val: '0',
  name: '停用'
})
updateStore.addConf('updateUser', {
  method: 'post',
  url: RquestPathConfig.updateUserUrl
})
export default {
  data() {
    return {
      dialogVisible: false,
      updateUserDialogVisible: false,

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
      options: [
        {
          label: '不限',
          value: ''
        },
        {
          label: '可用',
          value: '1'
        },
        {
          label: '停用',
          value: '0'
        }
      ]
    }
  },
  mounted: function() {
    var height = GUtils.getClientHeight()
    pagehContainer.store.conf.prefHeight = height
  },
  methods: {
    updateUserDuty: function(formName) {
      // var that = this
      // that.$refs[formName].validate(valid => {
      //   if (valid) {
      //     that.dutyTableLoading = true
      //     var updateUserDutyConf =
      //       updateUserDutyStore.store.conf.updateUserDuty
      //     updateUserDutyConf.data = updateUserDutyStore.formData.data
      //     console.log(['updateUserDutyConf.data', updateUserDutyConf.data])
      //     that.updateUserDurtDV = false
      //     axios(updateUserDutyConf)
      //       .then(function(response) {
      //         console.log([
      //           'updateUserDutyStore',
      //           that.updateUserDutyStore.formData.data
      //         ])
      //         allotUserDuty(that.updateUserDutyStore.formData.data.userId)
      //         if (response.data.length == 0) {
      //           that.$message({
      //             showClose: true,
      //             message: '修改成功',
      //             type: 'success'
      //           })
      //         } else {
      //           that.$message({
      //             showClose: true,
      //             message: response.data.body.message,
      //             type: 'error'
      //           })
      //         }
      //       })
      //       .catch(function(error) {
      //         console.log(error)
      //         that.dutyTableLoading = false
      //       })
      //   } else {
      //     return false
      //   }
      // })
    },
    saveUserDuty: function(formName) {
      // var that = this
      // that.$refs[formName].validate(valid => {
      //   if (valid) {
      //     that.dutyTableLoading = true
      //     var saveUserDutyConfig = addUserDutyStore.store.conf.saveUserDuty
      //     saveUserDutyConfig.data = that.addUserDutyStore.formData.data
      //     that.addShow = true
      //     axios(saveUserDutyConfig)
      //       .then(function(response) {
      //         if (response.data.length == 0) {
      //           that.$message({
      //             showClose: true,
      //             message: '分配成功',
      //             type: 'success'
      //           })
      //           allotUserDuty(addUserDutyData.data.userId)
      //         } else {
      //           that.$message({
      //             showClose: true,
      //             message: response.data.body.message,
      //             type: 'error'
      //           })
      //         }
      //       })
      //       .catch(function(error) {
      //         console.log(error)
      //         that.dutyTableLoading = false
      //       })
      //   } else {
      //     return false
      //   }
      // })
    },
    getName: function(val) {
      // var t = dutyList.data
      // for (var i = 0; i < Object.keys(t).length; i++) {
      //   if (t[i]['definition_code'] == val) {
      //     addUserDutyStore.formData.data.definitionName =
      //       t[i]['definition_name']
      //   }
      // }
      // console.log(this)
    },
    getDName: function(val) {
      // var t = dutyList.data
      // for (var i = 0; i < Object.keys(t).length; i++) {
      //   if (t[i]['definition_code'] == val) {
      //     updateUserDutyStore.formData.data.definitionName =
      //       t[i]['definition_name']
      //   }
      // }
      // console.log(this)
    },
    addDutyButton: function() {
      console.log(['addDutyButton', this.dutyTableStore.store.conf.addShow])
      this.addShow = false
      console.log(['addDutyButton', this.dutyTableStore.store.conf.addShow])
    },
    handleEdit: function(index, row) {
      // var that = this
      // this.updateUserDurtDV = true
      // this.updateUserDutyLoading = true
      // var rDefinitionCode = row.definition_code.toString()
      // updateUserDutyData.pushData({
      //   userId: '',
      //   orgCode: [],
      //   definitionName: '',
      //   definitionCode: '',
      //   beginDate: '',
      //   expireDate: '',
      //   isBandh: 'Y',
      //   id: ''
      // })
      /* ---------------*/
      // var getUserDConf = {
      //   url: RquestPathConfig.getUserDutyByIdUrl,
      //   method: 'post'
      // }
      // getUserDConf.data = {
      //   id: row.id
      // }
      // axios(getUserDConf)
      //   .then(function(response) {
      //     that.updateUserDutyLoading = false
      //     updateUserDutyData.pushData({
      //       userId: response.data.body.resBody.userDuty[0].userId,
      //       orgCode: response.data.body.resBody.orgCodeArr,
      //       definitionName:
      //         response.data.body.resBody.userDuty[0].definitionName,
      //       definitionCode:
      //         response.data.body.resBody.userDuty[0].definitionCode,
      //       beginDate: response.data.body.resBody.userDuty[0].beginDate,
      //       expireDate: response.data.body.resBody.userDuty[0].expireDate,
      //       isBandh: response.data.body.resBody.userDuty[0].isBandh,
      //       id: response.data.body.resBody.userDuty[0].id
      //     })
      //   })
      //   .catch(function(error) {
      //     that.updateUserDutyLoading = false
      //     console.log(error)
      //   })
      /* ---------------*/
    },
    handleDelete: function(index, row) {
      // var that = this
      // that.dutyTableLoading = true
      // var deleteUserDutyConf = dutyTableStore.store.conf.deleteUserDuty
      // deleteUserDutyConf.data = {
      //   dutyId: row.id
      // }
      // axios(deleteUserDutyConf)
      //   .then(function(response) {
      //     that.dutyTableLoading = false
      //     if (response.data.length == 0) {
      //       allotUserDuty(row.user_id)
      //       that.$message({
      //         showClose: true,
      //         message: '删除成功',
      //         type: 'success'
      //       })
      //     } else {
      //       that.dutyTableLoading = false
      //       that.$message({
      //         showClose: true,
      //         message: response.data.body.message,
      //         type: 'error'
      //       })
      //     }
      //   })
      //   .catch(function(error) {
      //     that.dutyTableLoading = false
      //   })
    },
    addTab: function() {
      tabsStore.addTab({
        name: '301',
        title: '学生会管理'
      })
    },
    updateUser: function(formName) {
      var that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          pageManagerStore.store.conf.loaddings = true
          that.updateUserDialogVisible = false
          pageManagerStore.store.conf.loaddings = true
          var updateConfig = updateStore.store.conf.updateUser
          updateConfig.data = updateStore.updateDate.data
          axios(updateConfig)
            .then(function(response) {
              if (response.data.length == 0) {
                that.$message({
                  showClose: true,
                  message: '更新信息成功',
                  type: 'success'
                })
                pageManagerStore.store.conf.loaddings = false
                loadData()
              } else {
                that.$message({
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
      var that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.dialogVisible = false
          pageManagerStore.store.conf.loaddings = true
          var addRequestConfig = addUserFormStore.store.conf.storeLoader
          var addRequestData = addUserFormStore.bindMutual.data
          addRequestConfig.data = addRequestData
          axios(addRequestConfig)
            .then(function(response) {
              console.log(['response', response])
              if (response.data.length == 0) {
                that.$message({
                  showClose: true,
                  message: '恭喜你，增加用户成功',
                  type: 'success'
                })
                loadData()
                pageManagerStore.store.conf.loaddings = false
              } else {
                that.$message({
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
  },
  created: function() {
    var that = this

    pageManagerStore.addConf('operations', [
      {
        name: 'ex',
        title: '导入',
        operator: function(servcieTable, serviceForm) {}
      },
      {
        name: 'vh',
        title: '批量删除',
        operator: function(servcieTable, serviceForm) {
          pageManagerStore.store.conf.loaddings = true
          var arr = selectTableStore.store.conf.selects
          if (arr.length == 0) {
            that.$message({
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
              array: reArr
            }
            console.log(['delMoreConfig', delMoreConfig])
            axios(delMoreConfig)
              .then(function(response) {
                if (response.data.length == 0) {
                  that.$message({
                    showClose: true,
                    message: '删除成功',
                    type: 'success'
                  })
                  loadData()
                } else {
                  that.$message({
                    showClose: true,
                    message: response.data.body.message,
                    type: 'error'
                  })
                  loadData()
                  pageManagerStore.store.conf.loaddings = false
                }
              })
              .catch(function(error) {
                pageManagerStore.store.conf.loaddings = false
              })
          }
        }
      }
    ])

    selectTableStore.addConf('operations', [
      {
        name: 'edit',
        title: '编辑',
        operator: function(index, row) {
          that.updateUserDialogVisible = true
          var state = ''
          if (row.user_state == '可用') {
            state = '1'
          } else {
            state = '0'
          }
          var rNickName = ''
          if (row.nick_name != null) {
            rNickName = row.nick_name
          } else {
            rNickName = ''
          }
          var rMobilePhone = ''
          if (row.mobile_phone != null) {
            rMobilePhone = row.mobile_phone
          } else {
            rMobilePhone = ''
          }
          var rQq = ''
          if (row.qq != null) {
            rQq = row.qq
          } else {
            rQq = ''
          }
          var rEmail = ''
          if (row.email != null) {
            rEmail = row.email
          } else {
            rEmail = ''
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
      },
      {
        name: 'del',
        title: '删除',
        operator: function(index, row) {
          console.log(['row', row])
          pageManagerStore.store.conf.loaddings = true
          var delRequestConfig = selectTableStore.store.conf.deleteUser
          delRequestConfig.params = {
            userId: row.id
          }
          axios(delRequestConfig)
            .then(function(response) {
              if (response.data.length == 0) {
                that.$message({
                  showClose: true,
                  message: '删除成功',
                  type: 'success'
                })
                loadData()
                pageManagerStore.store.conf.loaddings = false
              } else {
                that.$message({
                  showClose: true,
                  message: response.data.body.message,
                  type: 'error'
                })
                loadData()
                pageManagerStore.store.conf.loaddings = false
              }
            })
            .catch(function(error) {
              pageManagerStore.store.conf.loaddings = false
            })
        }
      },
      {
        name: 'res',
        title: '重置密码',
        operator: function(index, row) {
          pageManagerStore.store.conf.loaddings = true
          var resetUserPwd = selectTableStore.store.conf.resetUserPwd
          resetUserPwd.params = {
            userId: row.id
          }
          axios(resetUserPwd)
            .then(function(response) {
              if (response.data.length == 0) {
                that.$message({
                  showClose: true,
                  message: '重置密码成功',
                  type: 'success'
                })
                pageManagerStore.store.conf.loaddings = false
                loadData()
              } else {
                that.$message({
                  showClose: true,
                  message: response.data.body.message,
                  type: 'error'
                })
                loadData()
                pageManagerStore.store.conf.loaddings = false
              }
            })
            .catch(function(error) {
              pageManagerStore.store.conf.loaddings = false
            })
        }
      }
    ])
  }
}

// 加载数据的方法
function loadData() {
  var requestData = formStore.bindMutual.data
  GUtils.post(RquestPathConfig.getUserStoreUrl, requestData, function(
    response
  ) {
    selectTableStore.store.data = response.resBody.rData
    formStoreData.pushData({
      page_total: response.totalPage
    })
  })
}

// function allotUserDuty(id) {}
</script>
