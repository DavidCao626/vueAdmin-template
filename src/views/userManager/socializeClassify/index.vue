<template>
	<div id="bodyBox">
		<gc-container :component-store="pageHCon">
			<div slot="header">
			</div>
			<gc-manager :component-store="pmanager">
				<template slot="quickSearchItems">
					<el-form-item label="登录名" prop="userLoginName">
						<el-input v-model="serviceForm.bindMutual.data.userLoginName" size="mini"></el-input>
					</el-form-item>

				</template>
				<!-- 常用的操作-->
				<template slot="often">
					<!--<el-button type="info" title="更多条件" size="mini" @click="addUserInfoDV = true">新增</el-button>-->
					<el-button type="info" title="导出" size="mini">导出</el-button>
					<el-button type="info" title="导出" size="mini">打包</el-button>
				</template>
				<template slot="allSearchItems">
					<gc-form :component-store="moreForm">
						<el-form-item label="登录名" prop="name">
							<el-input v-model="moreForm.bindMutual.data.userLoginName" size="mini"></el-input>
						</el-form-item>
					</gc-form>
				</template>
				<template slot="dataCloumns">
					<el-table-column prop="userLoginName" min-width="60" label="登录名">
					</el-table-column>
					<el-table-column prop="name" label="姓名" min-width="60">
					</el-table-column>
					<el-table-column prop="officeOrgName" align='center' label="机构名称" min-width="60">
					</el-table-column>
					<el-table-column prop="memberCode" min-width="60" align='center' label="成员编号">
					</el-table-column>
					<el-table-column prop="startDate" min-width="60" align='center' label="开始日期">
					</el-table-column>
					<el-table-column prop="endDate" min-width="60" align='center' label="结束日期">
					</el-table-column>
					<el-table-column prop="available" min-width="60" align='center' label="是否可用" :formatter="formatAvailable">
					</el-table-column>
					<el-table-column prop="lastUpdateTime" min-width="90" align='center' label="最后修改时间">
					</el-table-column>
				</template>
			</gc-manager>
		</gc-container>

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
							{{addUserDutyForm.formData.data.orgName}}
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
					<el-form-item prop="orgName" label="任职组织">
						{{updateUserDutyForm.formData.data.orgName}}
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
import dataPath from '@/API/socializeClassify/socializeClassify.js'
import axios from 'axios'
// import nations from "./nations.js"

Vue.use(GraceComponent)

// 获取码表数据
var requestData = {
  dicts: ['available', 'is_bandh']
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
selectTableStore.addConf('expands', [
  {
    label: '开始日期',
    attr: 'startDate'
  },
  {
    label: '结束日期',
    attr: 'endDate'
  }
])
var dutyTableData = []
selectTableStore.addConf('isExpand', true)
selectTableStore.addConf('isBorder', false)
selectTableStore.addConf('isRowOperation', true)

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
    operator: function(servcieTable, serviceForm) {}
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

export default {
  data() {
    return {
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
    })
  },
  methods: {
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
            orgCode: data.resBody.orgCode,
            beginDate: data.resBody.beginDate,
            expireData: data.resBody.expireDate,
            isBandh: data.resBody.isBandh,
            definitionCode: data.resBody.definitionCode,
            id: row.id
          })
        }
      )
    },
    updateUserDuty: function() {
      // 确认修改
      var that = this
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
    // this.temp1 = this.$refs.updateVue.loading;
    var that = this
    selectTableStore.addConf('operations', [
      {
        name: 'check',
        title: '任职',
        operator: function(index1, row) {
          that.dutyTableLoginName = row.userLoginName
          that.resignationDV = true
          addUserDutyFormData.pushData({
            orgName: row.officeOrgName,
            loginName: row.userLoginName
          })
          updateUserDutyFormData.pushData({
            //	'id': "row.id",
            orgName: row.officeOrgName,
            loginName: row.userLoginName
          })
          GUtils.post(
            dataPath.queryUserDutyList,
            {
              loginName: row.userLoginName
            },
            function(data) {
              that.dutyTableData = data.resBody
            }
          )
        }
      }
    ])
  },
  beforeCteate: function() {}
}

// 加载数据的方法
function loadData() {
  GUtils.post(dataPath.queryData, formStore.bindMutual.data, function(data) {
    console.log(['loadData', data])
    selectTableStore.store.data = data.resBody.baseData
    formStoreData.pushData({
      page_total: data.resBody.dataCount
    })
  })
}
</script>
