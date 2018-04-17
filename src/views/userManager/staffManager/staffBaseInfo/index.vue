<template>

	<div id="bodyBox">
		<gc-container :component-store="pageHCon">
			<div slot="header">
			</div>
			<gc-manager :component-store="pmanager">
				<template slot="quickSearchItems">
					<el-form-item label="职工编码" prop="staffCode">
						<el-input v-model="serviceForm.bindMutual.data.staffCode" size="mini"></el-input>
					</el-form-item>
				</template>
				<!-- 常用的操作-->
				<template slot="often">
					<el-button type="info" title="更多条件" size="mini" @click="addBaseInfoDV = true">新增</el-button>
					<el-button type="info" title="导出" size="mini">导出</el-button>
					<el-button type="info" title="导出" size="mini">打包</el-button>
				</template>
				<template slot="allSearchItems">
					<gc-form :component-store="moreForm">
						<el-form-item label="职工编码" prop="staffCode">
							<el-input v-model="moreForm.bindMutual.data.staffCode" size="mini"></el-input>
						</el-form-item>
						<el-form-item label="姓名" prop="name">
							<el-input v-model="moreForm.bindMutual.data.name" size="mini"></el-input>
						</el-form-item>
					</gc-form>
				</template>
				<template slot="dataCloumns">
					<el-table-column prop="staffCode" label="职工编码" sortable min-width="90">
					</el-table-column>
					<el-table-column prop="name" label="姓名" sortable min-width="60">
					</el-table-column>
					<el-table-column prop="identityNo" min-width="150" align='center' label="身份证号码">
					</el-table-column>
					<el-table-column prop="sexType" min-width="60" align='center' :formatter="formatSexType" label="性别">
					</el-table-column>
					<el-table-column prop="nation" min-width="60" align='center' :formatter="formatNation" label="民族">
					</el-table-column>
					<el-table-column prop="phone" align='center' min-width="90" label="手机号码">
					</el-table-column>
					<el-table-column prop="lastUpdateTime" min-width="90" align='center' label="最后修改时间">
					</el-table-column>
					<el-table-column prop="checkFlag" min-width="90" align='center' :formatter="formatCheckFlag" label="审核状态">
					</el-table-column>
				</template>
			</gc-manager>
		</gc-container>

		<el-dialog title="增加职工信息" :visible.sync="addBaseInfoDV" width="45vw" top="8vh">
			<div style="overflow-y:scroll;height:48vh;padding:0 15px">
				<!--<slot name="allSearchItems"></slot>-->
				<add-staff-base-info ref="addVue"></add-staff-base-info>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="saddBaseInfo('addForm')">增 加</el-button>
				<el-button size="small" @click="addBaseInfoDV= false">取 消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="编辑职工信息" :visible.sync="updateBaseInfoDV" width="45vw" top="8vh">
			<div style="overflow-y:scroll;height:48vh;padding:0 15px">
				<!--<slot name="allSearchItems"></slot>-->
				<update-staff-base-info ref="updateVue"></update-staff-base-info>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="supdateBaseInfo('updateForm')">修 改</el-button>
				<el-button size="small" @click="updateBaseInfoDV= false">取 消</el-button>
			</span>
		</el-dialog>

		<el-dialog title="审核职工信息" :visible.sync="checkBaseInfoDV" width="45vw" top="8vh">
			<div style="overflow-y:scroll;height:48vh;padding:0 15px">
				<!--<slot name="allSearchItems"></slot>-->
				<check-staff-base-info ref="checkVue"></check-staff-base-info>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="scheckBaseInfo('checkForm')">确 认</el-button>
				<el-button size="small" @click="checkBaseInfoDV= false">取 消</el-button>
			</span>
		</el-dialog>

		<el-dialog title="审核" :visible.sync="chDV" width="100%" top="10vh" :fullscreen="true">
			<cf :ck-params="ckParams"></cf>
		</el-dialog>

		<el-dialog title="分配职务" :visible.sync="resignationDV" width="70vw" top="3vh">

			<el-button v-if="addAndShowFlag" size="small" @click="allotDuty">分配职务</el-button>
			<el-button v-if="!addAndShowFlag" size="small" @click="addAndShowFlag = true">取消分配</el-button>
			<div style="border-bottom: 1px solid #F0F0F0;"></div>

			<div style="overflow-y:scroll;height:55vh;padding:0 3px">
				<div v-show="!addAndShowFlag">
					<el-form size="mini" :model="addUserDutyForm.formData.data" ref='addUserDutyForm' :rules='addUserDutyForm.formData.rules' label-width="80px">
						<el-form-item prop="loginName" label="登录名">
							{{addUserDutyForm.formData.data.loginName}}
						</el-form-item>
						<el-form-item prop="orgName" label="任职组织">
							<gc-s-cas :component-store="f_org_code"></gc-s-cas>
						</el-form-item>
						<el-form-item prop="definitionCode" label="职务">
							<el-select v-model="addUserDutyForm.formData.data.definitionCode" size="small">
								<el-option v-for="(item,index) in dutyList" :key="index" :label="item.dutyName" :value="item.dutyCode">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="beginDate" label="开始时间">
							<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="addUserDutyForm.formData.data.beginDate" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
						<el-form-item prop="expireData" label="结束时间">
							<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="addUserDutyForm.formData.data.expireData" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
						<el-form-item prop="isBandh" label="是否禁用">
							<el-radio-group v-model="addUserDutyForm.formData.data.isBandh">
								<el-radio-button v-for="(item,index) in isBandh" :key="index" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-form>
					<div>
						<el-button size="small" type="success" @click="addUserDuty">确 定</el-button>
						<el-button size="small" @click="addAndShowFlag = true">取 消</el-button>
					</div>
				</div>

				<el-table v-show="addAndShowFlag" size="small" :data="dutyTableData" style="width: 100%">

					<el-table-column prop="orgName" label="任职组织" width="90">
					</el-table-column>
					<el-table-column prop="targetUserTypeName" align='center' label="用户对象" min-width="90">
					</el-table-column>
					<el-table-column prop="definitionCode" align='center' label="职务代码" min-width="90">
					</el-table-column>
					<el-table-column prop="definitionName" align='center' label="职务名称" min-width="90">
					</el-table-column>
					<el-table-column prop="beginDate" align='center' label="开始日期" min-width="90">
					</el-table-column>
					<el-table-column prop="expireDate" align='center' label="结束日期" min-width="90">
					</el-table-column>
					<el-table-column prop="isBandh" align='center' label="是否停职" :formatter="formatIsBandh" min-width="90">
					</el-table-column>
					<el-table-column align='center' label="操作" min-width="120">
						<template slot-scope="scope">
							<el-button type="success" size="mini" @click="updateDuty(scope.$index, scope.row)">修 改</el-button>
							<el-button type="danger" size="mini" @click="deleteDuty(scope.$index, scope.row)">删 除</el-button>
						</template>
					</el-table-column>
				</el-table>

			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="resignationDV = false">关 闭</el-button>
			</span>
		</el-dialog>

		<el-dialog title="修改" :visible.sync="updateUserDutyDV" width="70vw" top="3vh">
			<div style="overflow-y:scroll;height:55vh;padding:0 3px">
				<el-form size="mini" :model="updateUserDutyForm.formData.data" ref='updateUserDutyForm' :rules='updateUserDutyForm.formData.rules' label-width="80px">
					<el-form-item prop="loginName" label="登录名">
						{{updateUserDutyForm.formData.data.loginName}}
					</el-form-item>
					<el-form-item prop="orgCode" label="任职组织">
						<gc-s-cas :component-store="f_org_code2"></gc-s-cas>
					</el-form-item>
					<el-form-item prop="definitionCode" label="职务">
						<el-select v-model="updateUserDutyForm.formData.data.definitionCode" size="small">
							<el-option v-for="(item,index) in dutyList" :key="index" :label="item.dutyName" :value="item.dutyCode">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="beginDate" label="开始时间">
						<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="updateUserDutyForm.formData.data.beginDate" type="date" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item prop="expireData" label="结束时间">
						<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="updateUserDutyForm.formData.data.expireData" type="date" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item prop="isBandh" label="是否禁用">
						<el-radio-group v-model="updateUserDutyForm.formData.data.isBandh">
							<el-radio-button v-for="(item,index) in isBandh" :key="index" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-form>
				<div>
					<el-button size="small" type="success" @click="updateUserDuty">确 定</el-button>
					<el-button size="small" @click="updateUserDutyDV = false">取 消</el-button>
				</div>
				</div>
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
import dataPath from '@/API/Staff/staff_info_manager.js'
import axios from 'axios'
import nations from './nations.js'
import updateStaffBaseInfo from './components/updateStaffBaseInfo.vue'
import addStaffBaseInfo from './components/addStaffBaseInfo.vue'
import checkStaffBaseInfo from './components/checkStaffBaseInfo.vue'
import reqPath from '@/API/System/SystemManagerApi.js'
import cf from '../checkStaffInfo/components/checkStaffInfo.vue'
Vue.use(GraceComponent)

// 获取码表数据
var requestData = {
  dicts: [
    'available',
    'is_bandh',
    'check_flag',
    'sex_type',
    'language',
    'stu_archives_type',
    'stu_archives_status',
    'special_type',
    'graduation_type',
    'stu_degree_type',
    'is_graduates'
  ]
}
var dictData = {}
var isBandh = []

// 获取码表数据结束
var dutyList = []

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
selectTableStore.addConf('expands', [
  {
    label: '审核备注:',
    attr: 'checkComment'
  }
])
selectTableStore.addConf('isExpand', true)
selectTableStore.addConf('isBorder', false)
selectTableStore.addConf('isRowOperation', true)
var ckParams = {}
ckParams.baseInfoBid = ''
ckParams.universityInfoBid = ''
ckParams.staffCode = ''
ckParams.loginName = ''

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
  name: [
    {
      required: true,
      message: '请输入活动名称',
      trigger: 'blur'
    }
  ]
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
  page_total: 1
})
pageStore.addAttr('bindMutual', formStoreData)

/**
 * 改造，定义默认的名称，不需要进行名称录入
 */
pageManagerStore.addAttr('serviceForm', formStore)
pageManagerStore.addAttr('serviceTable', selectTableStore)
pageManagerStore.addAttr('servicePage', pageStore)

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
      var arr = selectTableStore.store.conf.selects
      if (arr.length == 0) {
        alert('您没有选中任何数据')
      } else {
        var reArr = []
        for (var i = 0; i < arr.length; i++) {
          reArr.push(arr[i].id)
        }
        GUtils.post(
          dataPath.deleteMStaffBaseInfo,
          {
            ids: reArr
          },
          function(data) {
            // 批量删除成功
            loadData()
          }
        )
      }
    }
  }
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

// 组织组件
var f_org_code = GStoreFactory.buildSmallCascaderStore(
  addUserDutyFormData.data,
  'orgCode'
)
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
var f_org_code2 = GStoreFactory.buildSmallCascaderStore(
  updateUserDutyFormData.data,
  'orgCode'
)
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
export default {
  components: {
    addStaffBaseInfo,
    updateStaffBaseInfo,
    checkStaffBaseInfo,
    cf
  },
  data() {
    return {
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
    }
  },
  mounted: function() {
    var that = this
    var height = GUtils.getClientHeight()
    pagehContainer.store.conf.prefHeight = height

    GUtils.post(dataPath.getDictByDictNames, requestData, function(data) {
      dictData = data.resBody
      that.isBandh = dictData.is_bandh
    })
    GUtils.post(dataPath.queryDutyList, {}, function(data) {
      that.dutyList = data.resBody
      console.log(['dutyList', data])
    })
  },
  methods: {
    scheckBaseInfo: function(formName) {
      var that = this
      that.checkBaseInfoDV = false
      that.$refs.checkVue.submitForm(this.checkId)
    },
    supdateBaseInfo: function(formName) {
      var that = this
      console.log('确认更新')
      console.log(['updateStaffBaseInfo', updateStaffBaseInfo])
      that.$refs.updateVue.submitForm()
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
        name: '301',
        title: '学生会管理'
      })
    },
    addUserDuty: function() {
      var that = this
      GUtils.requestBody(
        dataPath.insertUserDuty,
        addUserDutyFormData.data,
        function(data) {
          GUtils.post(
            dataPath.queryUserDutyList,
            {
              loginName: addUserDutyFormData.data.loginName
            },
            function(data) {
              console.log(['userDutyList', data])
              that.dutyTableData = data.resBody
            }
          )
          that.addAndShowFlag = true
        }
      )
    },
    deleteDuty: function(index1, row) {
      var that = this
      GUtils.post(
        dataPath.deleteUserDuty,
        {
          id: row.id
        },
        function(data) {
          GUtils.post(
            dataPath.queryUserDutyList,
            {
              loginName: that.dutyTableLoginName
            },
            function(data) {
              console.log(['userDutyList', data])
              that.dutyTableData = data.resBody
            }
          )
        }
      )
    },
    updateDuty: function(index1, row) {
      var that = this
      that.updateUserDutyDV = true
      GUtils.post(
        dataPath.getUserDutyById,
        {
          id: row.id
        },
        function(data) {
          that.updateUserDutyForm.formData.pushData({
            orgCode: data.resBody.aOrgCode,
            beginDate: data.resBody.baseData.beginDate,
            expireData: data.resBody.baseData.expireDate,
            isBandh: data.resBody.baseData.isBandh,
            definitionCode: data.resBody.baseData.definitionCode,
            id: row.id
          })
        }
      )
    },
    updateUserDuty: function() {
      var that = this
      // 确认修改
      GUtils.requestBody(
        dataPath.updateUserDuty,
        updateUserDutyFormData.data,
        function(data) {
          GUtils.post(
            dataPath.queryUserDutyList,
            {
              loginName: updateUserDutyFormData.data.loginName
            },
            function(data) {
              console.log(['userDutyList', data])
              that.dutyTableData = data.resBody
            }
          )
          that.updateUserDutyDV = false
        }
      )
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
    var that = this
    selectTableStore.addConf('operations', [
      {
        name: 'edit',
        title: '编辑',
        operator: function(index1, row) {
          that.updateBaseInfoDV = true
          that.$options.components.updateStaffBaseInfo.methods.loadFormData.call(
            that.$options.components.updateStaffBaseInfo,
            row.id
          )
        }
      },
      {
        name: 'del',
        title: '删除',
        operator: function(index1, row) {
          GUtils.post(
            dataPath.deleteStaffBaseInfo,
            {
              id: row.id
            },
            function(data) {
              loadData()
            }
          )
        }
      },
      {
        name: 'check',
        title: '审核',
        operator: function(index1, row) {
          ckParams.baseInfoBid = row.id
          ckParams.universityInfoBid = ''
          ckParams.staffCode = row.staffCode
          ckParams.loginName = row.loginName

          GUtils.post(
            dataPath.getStaffUniversityInfoIdBy,
            {
              staffCode: row.staffCode
            },
            function(data) {
              ckParams.universityInfoBid = data.resBody.staffUniversityInfoId
              that.chDV = true
              console.log(['checkParams', ckParams])
              // 执行成功跳转页面携带上面的参数
            }
          )
        }
      },
      {
        name: 'renzhi',
        title: '任职',
        operator: function(index1, row) {
          that.dutyTableLoginName = row.loginName
          that.resignationDV = true
          addUserDutyFormData.pushData({
            orgName: '',
            loginName: row.loginName
          })
          updateUserDutyFormData.pushData({
            //	'id': row.id,
            orgName: '',
            loginName: row.loginName
          })
          GUtils.post(
            dataPath.queryUserDutyList,
            {
              loginName: row.loginName
            },
            function(data) {
              that.dutyTableData = data.resBody
            }
          )
        }
      }
    ])
  }
}

function loadData() {
  GUtils.post(
    dataPath.queryStaffBaseInfoList,
    formStore.bindMutual.data,
    function(data) {
      console.log(['loadData', data])
      selectTableStore.store.data = data.resBody.baseData
      formStoreData.pushData({
        page_total: data.resBody.totalPage
      })
    }
  )
}
</script>
