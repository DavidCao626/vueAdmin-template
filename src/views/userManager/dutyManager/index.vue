<template>
  <div id="bodyBox">
    <gc-container :component-store="pageHCon">
      <div slot="header">
      </div>
      <gc-manager :component-store="pmanager">
        <template slot="quickSearchItems">
          <el-form-item label="职务名称" prop="dutyName">
            <el-input v-model="serviceForm.bindMutual.data.dutyName" size="mini"></el-input>
          </el-form-item>
        </template>
        <template slot="often">
          <el-button type="info" title="更多条件" size="mini" @click="dialogVisible= true">新增</el-button>
          <el-button type="info" title="导出" size="mini">导出</el-button>
          <el-button type="info" title="导出" size="mini">打包</el-button>
        </template>
        <template slot="allSearchItems">
          <gc-form :component-store="moreForm">
            <el-form-item label="职务名称" prop="dutyName">
              <el-input v-model="serviceForm.bindMutual.data.dutyName" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop='targetUserType' label="用户类型">
              <el-col :span="20">
                <el-select v-model="serviceForm.bindMutual.data.targetUserType" placeholder="请选择用户类型">
                  <el-option v-for="(item,index) in userTypes[0]" :key="index" :label="item.userObjectName" :value="item.userObjectSerial">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="职务状态" prop="available">
              <el-select v-model="moreForm.bindMutual.data.available" placeholder="请选择">
                <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </gc-form>
        </template>
        <template slot="dataCloumns">
          <el-table-column prop="duty_code" label="职务代码" width="200">
          </el-table-column>
          <el-table-column prop="duty_name" label="职务名称" sortable width="200">
          </el-table-column>
          <el-table-column prop="target_user_type" width="220" sortable label="用户对象类型">
          </el-table-column>
          <el-table-column prop="available" width="220" sortable label="状态">
          </el-table-column>
          <el-table-column prop="last_update_time" min-width="220" sortable label="最后更新时间">
          </el-table-column>
        </template>
      </gc-manager>
    </gc-container>
    <el-dialog title="增加职务" :visible.sync="dialogVisible" width="45vw" top="8vh">

      <div style="overflow-y:scroll;height:48vh;padding:0 15px">
        <el-form size="mini" :model="addDutyStore.formData.data" ref='addForm' :rules='addDutyStore.formData.rules' label-width="80px">
          <el-form-item prop='dutyName' label="职务名称">
            <el-col :span="20">
              <el-input v-model='addDutyStore.formData.data.dutyName' size="mini" placeholder="请输入职务名称"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="对应角色" prop="nRoleValue">
            <nrole-check></nrole-check>
          </el-form-item>

          <el-form-item prop='targetUserType' label="用户类型">

            <el-col :span="20">
              <el-select v-model="addDutyStore.formData.data.targetUserType" placeholder="请选择用户类型">
                <el-option v-for="(item,index) in userTypeList[0]" :key="index" :label="item.userObjectName" :value="item.userObjectSerial">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item prop='isMember' label="成员职务">
            <el-radio-group v-model="addDutyStore.formData.data.isMember" size="small">
              <el-radio-button v-for="(item,index) in memberData" :key="index" :label="item.val">{{item.label}}</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="是否可用" prop='available'>
            <gc-s-radio :component-store="addRadioStore"></gc-s-radio>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="saveDuty('addForm')">增 加</el-button>
        <el-button size="small" @click="dialogVisible= false">取 消</el-button>
      </span>
    </el-dialog>
    <!--增加职务结束-->
    <!--更新职务开始-->
    <el-dialog title="编辑职务" :visible.sync="udialogVisible" width="45vw" top="8vh">
      <div style="overflow-y:scroll;height:48vh;padding:0 15px">
        <el-form size="mini" :model="updateDutyStore.formData.data" ref='updateForm' :rules='updateDutyStore.formData.rules' label-width="80px">
          <el-form-item prop='dutyName' label="职务名称">
            <el-col :span="20">
              <el-input disabled v-model='updateDutyStore.formData.data.dutyName' size="mini" placeholder="请输入职务名称"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="对应角色" prop="nRoleValue">
            <role-check></role-check>
          </el-form-item>
          <el-form-item prop='targetUserType' label="用户类型">
            <el-col :span="20">
              <el-select v-model="updateDutyStore.formData.data.targetUserType" placeholder="请选择用户类型">
                <el-option v-for="(item,index) in userTypeList[0]" :key="index" :label="item.userObjectName" :value="item.userObjectSerial">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item prop='isMember' label="成员职务">
            <el-radio-group v-model="updateDutyStore.formData.data.isMember" size="small">
              <el-radio-button v-for="(item,index) in memberData" :key="index" :label="item.val">{{item.label}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否可用" prop='available'>
            <gc-s-radio :component-store="updateRadioStore"></gc-s-radio>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="updateDuty('updateForm')">确 定</el-button>
        <el-button size="small" @click="udialogVisible= false">取 消</el-button>
      </span>
    </el-dialog>
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
import RquestPathConfig from '@/API/Duty/duty_manager_system.js'
import axios from 'axios'
import nroleCheck from '@/module/revolution-vue/customer-proxy/CheckBoxGroupAndGroup/DutyRoleCheckResolverClone.js'
import roleCheck from '@/module/revolution-vue/customer-proxy/CheckBoxGroupAndGroup/DutyRoleCheckResolverCheck.js'
Vue.use(GraceComponent)

var pagehContainer = GStoreFactory.buildVContainer()
var pageManagerStore = GStoreFactory.buildManagerPageStore()
var pageDataStore = GStoreFactory.buildServiceForm()
var rolesList = GStoreFactory.buildServiceFormData()
var memberData = [
  {
    label: '是',
    val: 'Y'
  },
  {
    label: '否',
    val: 'N'
  }
]
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
  dutyName: [
    {
      required: true,
      message: '请输入职务名称',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 20,
      message: '长度在 1 到 20 个字符',
      trigger: 'blur'
    }
  ],
  nRoleValue: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'blur'
    }
  ],
  targetUserType: [
    {
      required: true,
      message: '请选择用户类型',
      trigger: 'blur'
    }
  ]
})

var addRadioStore = GStoreFactory.buildSmallRadioStore(
  addDutyFormData.data,
  'available'
)
addRadioStore.pushData({
  val: 'Y',
  name: '可用'
})
addRadioStore.pushData({
  val: 'N',
  name: '停用'
})
addDutyStore.addAttr('formData', addDutyFormData)
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
  dutyName: [
    {
      required: true,
      message: '请输入职务名称',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 20,
      message: '长度在 1 到 20 个字符',
      trigger: 'blur'
    }
  ],
  nRoleValue: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'blur'
    }
  ],
  targetUserType: [
    {
      required: true,
      message: '请选择用户类型',
      trigger: 'blur'
    }
  ]
})

var updateRadioStore = GStoreFactory.buildSmallRadioStore(
  updateDutyFormData.data,
  'available'
)
updateRadioStore.pushData({
  val: 'Y',
  name: '可用'
})
updateRadioStore.pushData({
  val: 'N',
  name: '停用'
})
updateDutyStore.addAttr('formData', updateDutyFormData)
updateDutyStore.addConf('updateData', {
  method: 'post',
  url: RquestPathConfig.updateDuty
})

// ----------更新职务表单定义结束----------

var n_f_role_val = GStoreFactory.buildSmallCheckBoxStore(
  addDutyFormData.data,
  'nRoleValue'
)
n_f_role_val.addConf('isButton', false)

var u_f_role_val = GStoreFactory.buildSmallCheckBoxStore(
  updateDutyFormData.data,
  'nRoleValue'
)
u_f_role_val.addConf('isButton', false)

// ----------加载角色列表---------

var iRolesList = []
var roles = []
pageManagerStore.store.conf.loaddings = true
GUtils.post(RquestPathConfig.getRoles, {}, function(response) {
  console.log(['getRoles', response])
  iRolesList.push(response.resBody)
  roles.push(response.resBody)
  n_f_role_val.pushAllByFormat(response.resBody, {
    name: 'lable',
    val: 'val'
  })
  u_f_role_val.pushAllByFormat(response.resBody, {
    name: 'lable',
    val: 'val'
  })
  rolesList.pushData(response.resBody)
})

// ----------加载用户类型列表---------
var userTypeList = []
var userTypes = []
GUtils.post(RquestPathConfig.getTargetUserType, {}, function(response) {
  pageManagerStore.store.conf.loaddings = false
  userTypeList.push(response.resBody)
  userTypes.push(response.resBody)
})
// ----------加载用户类型列表end---------

pageManagerStore.addConf('loadData', function() {
  loadData()
})

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

selectTableStore.addConf('storeLoader', {
  method: 'post',
  url: RquestPathConfig.getAllDuty
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
  dutyName: [
    {
      max: 20,
      message: '长度不能大于20个字符',
      trigger: 'blur'
    }
  ]
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
  page_total: 230
})
pageStore.addAttr('bindMutual', formStoreData)

pageManagerStore.addAttr('serviceForm', formStore)
pageManagerStore.addAttr('serviceTable', selectTableStore)
pageManagerStore.addAttr('servicePage', pageStore)

pageManagerStore.addConf('operations', [
  {
    name: 'ex',
    title: '导入',
    operator: function(servcieTable, serviceForm) {}
  }
  // ,
  // {
  //   name: "vh",
  //   title: "批量删除",
  //   operator: function(servcieTable, serviceForm) {
  //     pageManagerStore.store.conf.loaddings = true;
  //     var arr = selectTableStore.store.conf.selects;
  //     if (arr.length == 0) {
  //       alert("您没有中任何用户");
  //       pageManagerStore.store.conf.loaddings = false;
  //     } else {
  //       var reArr = [];
  //       for (var i = 0; i < arr.length; i++) {
  //         reArr.push(arr[i].id);
  //       }
  //       GUtils.post(RquestPathConfig.deleteMoreDuty, { array: reArr }, function(
  //         response
  //       ) {});
  //     }
  //   }
  // }
])
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
pageDataStore.addAttr('rolesList', rolesList)
// pageDataStore.addAttr("userTypeList", userTypeList);

console.log(['iRolesList', iRolesList])

nroleCheck.getResolver()._v_bind(addDutyStore.formData.data, 'nRoleValue')
roleCheck.getResolver()._v_bind(updateDutyStore.formData.data, 'nRoleValue')

export default {
  data() {
    return {
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
      options: [
        {
          label: '不限',
          value: ''
        },
        {
          label: '可用',
          value: 'Y'
        },
        {
          label: '停用',
          value: 'N'
        }
      ]
    }
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
        name: '301',
        title: '学生会管理'
      })
    },
    saveDuty: function(formName) {
      var that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          GUtils.post(
            RquestPathConfig.saveDuty,
            addDutyStore.formData.data,
            function(response) {
              that.dialogVisible = false
              loadData()
            }
          )
        } else {
          return false
        }
      })
    },
    updateDuty: function(formName) {
      var that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          pageManagerStore.store.conf.loaddings = true
          var updateDutyConfig = updateDutyStore.store.conf.updateData
          console.log([
            'updateDutyStore.formData.data',
            updateDutyStore.formData.data
          ])
          updateDutyConfig.data = that.updateDutyStore.formData.data
          console.log(['updateDutyConfig', updateDutyConfig])
          axios(updateDutyConfig)
            .then(function(response) {
              console.log(['response', response])
              if (response.data.length == 0) {
                that.$message({
                  showClose: true,
                  message: '恭喜你，更新职务成功',
                  type: 'success'
                })
                that.udialogVisible = false
                loadData()
              } else {
                that.$message({
                  showClose: true,
                  message: response.data.body.message,
                  type: 'error'
                })
                pageManagerStore.store.conf.loaddings = false
                that.udialogVisible = true
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
  beforeCreate: function() {},
  created: function() {
    var that = this
    selectTableStore.addConf('operations', [
      {
        name: 'edit',
        title: '编辑',
        operator: function(index, row) {
          that.udialogVisible = true
          GUtils.post(RquestPathConfig.getDutyById, { id: row.id }, function(
            data
          ) {
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
      }
      // ,
      // {
      //   name: "del",
      //   title: "删除",
      //   operator: function(index, row) {
      //     GUtils.post(RquestPathConfig.deleteDuty, { id: row.id }, function(
      //       response
      //     ) {
      //       loadData();
      //     });
      //     pageManagerStore.store.conf.loaddings = false;
      //   }
      // }
    ])
  }
}

// 加载数据的方法
function loadData() {
  var requestData = formStore.bindMutual.data
  pageManagerStore.store.conf.loaddings = true
  GUtils.post(RquestPathConfig.getAllDuty, requestData, function(response) {
    pageManagerStore.store.conf.loaddings = false
    selectTableStore.store.data = response.resBody.rData
    formStoreData.pushData({
      page_total: response.resBody.totalPage
    })
  })
}
</script>