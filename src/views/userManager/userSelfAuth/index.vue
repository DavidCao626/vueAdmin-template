<template>
	<div id="bodyBox">
		<gc-hcontainer :component-store="pageHCon">
			<div style="margin-right:120px;margin-top:5px;margin-left:10px">
				<gc-form :component-store="formStore">
					<el-form-item label="管理机构" prop="title">
						<gc-s-sel :component-store="nf_manager_node_list"></gc-s-sel>
					</el-form-item>
					<el-form-item label="成员职务" prop="path_attr">
						<gc-s-sel :component-store="nf_manager_duty_list"></gc-s-sel>
					</el-form-item>
					<el-form-item label="用户对象" prop="classifyName">
						<el-input disabled v-model="formDataStore.data.classifyName" placeholder="用户对象名称"></el-input>
					</el-form-item>
					<el-form-item label="认证机构" prop="certOrgName">
						<el-input disabled v-model="formDataStore.data.certOrgName" placeholder="认证机构名称"></el-input>
					</el-form-item>
					<auth-body></auth-body>
					<el-form-item label="" prop="submit">
						<el-button type="success" @click="submitCert()" size="small">提交认证</el-button>
					</el-form-item>
				</gc-form>
			</div>
		</gc-hcontainer>
	</div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import '@/theme/index.css'
import axios from 'axios'
import VueExpand from '@/components/VueExpand'
Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
import GraceComponent from '@/ComponentPackage/GraceComponents.js'
import reqPath from '@/API/System/SystemManagerApi.js'
import inputCom from '@/module/revolution-vue/element-proxy/ItemListElement/resolver.js'

import { Loading } from 'element-ui'
Vue.use(GraceComponent)
var pagehContainer = GStoreFactory.buildHContainer()
var loadingVars
var formDataStore = GStoreFactory.buildServiceFormData()
formDataStore.pushData({
  managerNodeCode: ''
})
formDataStore.pushData({
  managerMemberDutyCode: ''
})
formDataStore.pushData({
  classifyCode: ''
})
formDataStore.pushData({
  classifyName: ''
})
formDataStore.pushData({
  certOrg: ''
})
formDataStore.pushData({
  certOrgName: ''
})
formDataStore.pushData({
  authBody: {}
})

var formStore = GStoreFactory.buildServiceForm(formDataStore)
formStore.addConf('isInline', false)
formStore.addConf('labelPosition', 'right')
formStore.addConf('labelWidth', '120px')

var nf_manager_duty_list = GStoreFactory.buildSmallSelectStore(
  formDataStore.data,
  'managerMemberDutyCode'
)
var nf_manager_node_list = GStoreFactory.buildSmallSelectStore(
  formDataStore.data,
  'managerNodeCode'
)
nf_manager_node_list.addConf('changeHandler', function(val) {
  nf_manager_duty_list.cleanData()
  formDataStore.setVal('classifyCode', '')
  formDataStore.setVal('classifyName', '')
  formDataStore.setVal('certOrg', '')
  formDataStore.setVal('certOrgName', '')
  formDataStore.setVal('managerMemberDutyCode', '')
  GUtils.post(
    reqPath.getManagerNodeMemberDuty,
    {
      managerNodeCode: val
    },
    function(data) {
      nf_manager_duty_list.pushAllByFormat(data.resBody, {
        name: 'dutyName',
        val: 'dutyCode'
      })
    }
  )
})

var authBodyStore = {}

nf_manager_duty_list.addConf('changeHandler', function(val) {
  console.log([this, authBodyStore])
  var managerNodeCode = formDataStore.getVal('managerNodeCode')
  formDataStore.setVal('classifyCode', '')
  formDataStore.setVal('classifyName', '')
  formDataStore.setVal('certOrg', '')
  formDataStore.setVal('certOrgName', '')
  GUtils.post(
    reqPath.getMemberDutyAuthRelaseInfo,
    {
      dutyCode: val,
      managerNodeCode: managerNodeCode
    },
    function(data) {
      var resolver = inputCom.getResolver()
      resolver.changeItems(data.resBody.classifyAuthDocument.items)
      formDataStore.mixData(data.resBody)
    }
  )
})

GUtils.post(
  reqPath.queryDecortor,
  {
    decoras: ['managerNodeConfigService']
  },
  function(data) {
    GUtils.assembleComponent(
      data.resBody,
      'managerOrgNode',
      nf_manager_node_list,
      {
        name: 'orgName',
        val: 'orgCode'
      }
    )
  }
)

var rules = {
  stuNo: [
    {
      type: 'isEmpty',
      conf: {},
      message: '学号'
    }
  ],
  code: [
    function(val) {
      if (!val || val == '') {
        return '校验码不能为空'
      } else {
        return true
      }
    }
  ],
  staffNo: [
    function(val) {
      if (!val || val == '') {
        return '职工编号不能为空'
      } else {
        return true
      }
    }
  ]
}

inputCom.getResolver().bindDataSource(formDataStore.data.authBody)
inputCom.getResolver().bindItemRules(rules)

export default {
  data() {
    return {
      pageHCon: pagehContainer,
      formStore: formStore,
      formDataStore: formDataStore,
      nf_manager_node_list: nf_manager_node_list,
      nf_manager_duty_list: nf_manager_duty_list
    }
  },
  components: {
    'auth-body': inputCom
  },
  beforeCreate: function() {
 // /  loadingVars = Loading.service({
   //   fullscreen: true
  //  })
  },
  mounted: function() {
    setTimeout(() => {
   //   loadingVars.close()
    }, 2000)
    var that = this
    var height = GUtils.getClientHeight()
    pagehContainer.store.conf.prefHeight = height
  },
  methods: {
    submitCert: function() {
      console.log(formDataStore)
      var validReulst = []
      if (inputCom.getResolver().validateItem(validReulst)) {
        console.log('validsucesss')
        GUtils.requestBody(reqPath.submitAuthCert, formDataStore.data, function(
          data
        ) {
          console.log(data)
        })
      }
    }
  },
  watch: {
    'pageHCon.store.conf.resultHeight': function(val) {
    }
  }
}
</script>
