<template>
	<div>
		<el-dialog title="认证信息" :visible.sync="updateUserInfoDV" width="45vw" top="8vh" @close="h">
			<div style="overflow-y:scroll;height:48vh;padding:0 15px">
				<el-form size="mini" :model="formStore.formData.data" ref="updateForm" :rules="formStore.formData.rules" label-width="100px">

					<!--<el-form-item label="登录名">
						<el-input size="mini" disabled v-model="formStore.formData.data.loginName"></el-input>
					</el-form-item>-->

					<el-form-item label="管理节点">
						<el-select v-model="formStore.formData.data.managerNodeCode" placeholder="请选择" @change="getUserObjectList">
							<el-option v-for="(item,index) in managerNodeList[0]" :key="item.index" :label="item.org_name" :value="item.node_code">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="用户对象">
						<el-select v-model="formStore.formData.data.userObjectCode" no-data-text="请先选择上一项" @change="getMemberDuty">
							<el-option v-for="(item,index) in userObjectList" :key="item.index" :label="item.user_object_name" :value="item.user_object_serial">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="职务">
						<el-select v-model="formStore.formData.data.dutyCode" :clearable="true" no-data-text="请先选择上一项" @change="getUserAuthOrgCode">
							<el-option v-for="(item,index) in userMember" :key="item.index" :label="item.duty_name" :value="item.duty_code">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="认证机构">
						<el-select v-model="formStore.formData.data.userAuthOrgCode" no-data-text="请先选择上一项">
							<el-option v-for="(item,index) in userAuthData" :key="item.index" :label="item.userAuthOrgName" :value="item.userAuthOrgCode">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="认证体">
						<span></span>
					</el-form-item>
				</el-form>
			</div>

			<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="updateUserAuth('updateForm')">修  改</el-button>
					<el-button size="small" @click="h">取  消</el-button>
  				</span>
		</el-dialog>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Element from 'element-ui'
	import '@/theme/index.css'
	import '@/styles/app.scss'
	import VueExpand from '@/components/VueExpand'
	Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
	import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
	import GraceComponent from '@/ComponentPackage/GraceComponents.js'
	import dataPath from '@/API/UserAuth/User_Auth_Info.js'
	Vue.use(GraceComponent)
var requestData = {
	  'dicts': ['check_flag', 'authState']
	}
	var dictData = {}
GUtils.post(dataPath.getDictByDictNames, requestData, function(data) {
	  dictData = data.resBody
})
var managerNodeList = []
GUtils.post(dataPath.queryNodeList, {}, function(data) {
	  managerNodeList.push(data.resBody)
})
var formStore = GStoreFactory.buildServiceForm()
var formDataStore = GStoreFactory.buildServiceFormData()
formDataStore.pushData({
	  id: '',
	  // loginName: "",
	  managerNodeCode: '', // 管理节点代码
	  dutyCode: '', // 职务代码
	  userAuthOrgCode: '', // 用户的认证机构
	  // authBody:{},认证体
	  userObjectCode: '' // 用户对象
	})
formDataStore.pushRules({})
formStore.addAttr('formData', formDataStore)

export default {
	  props: {
	    authUserInfoDVp: {
	      type: Boolean,
	      default: false
	    },
	    showData: {}
	  },
	  data() {
	    return {
	      formStore,
	      updateUserInfoDV: false,
	      managerNodeList,
	      userObjectList: [],
	      userMember: [],
	      userAuthData: []
	    }
	  },
	  computed: {},
	  watch: {
	    authUserInfoDVp() {
	      this.updateUserInfoDV = this.authUserInfoDVp
	    }
	  },
	  methods: {
	    test: function() {
	      console.log(this)
	    },
	    getUserAuthOrgCode: function(checkData) {
	      console.log(['getUserAuthOrgCode', checkData])
	      this.userAuthData = []
	      var userObjectCode = ''
      for (var i = 0; i < this.userMember.length; i++) {
	        if (this.userMember[i].duty_code == checkData) {
	          userObjectCode = this.userMember[i].target_user_type
	        }
	      }
	      var userAuthOrgName = ''
      var userAuthOrgCode = ''
      for (var i = 0; i < this.userObjectList.length; i++) {
	        if (this.userObjectList[i].user_object_serial == userObjectCode) {
	          userAuthOrgName = this.userObjectList[i].certification_org_name
	          userAuthOrgCode = this.userObjectList[i].certification_org_code
	        }
	      }
	      this.userAuthData.push({
	        'userAuthOrgName': userAuthOrgName,
	        'userAuthOrgCode': userAuthOrgCode
	      })
	      console.log(['this.userAuthData', this.userAuthData])
	    },
	    getMemberDuty: function(checkData) {
	      console.log(['member', checkData])
	      this.userMember = []

	      var that = this
	      GUtils.post(dataPath.queryUserMember, {
	        'userObjectCode': checkData
	      }, function(data) {
	        that.userMember = data.resBody
	      })
    },
	    getUserObjectList: function(checkData) {
	      delete this.formStore.formData.data.dutyCode
      formDataStore.pushData({
	        dutyCode: ''
	      })
	      console.log(checkData)
	      var that = this
	      GUtils.post(dataPath.queryUserObjectList, {
	        'nodeCode': checkData
	      }, function(data) {
	        console.log(data)
	        that.userObjectList = data.resBody
	      })
    },

	    updateUserAuth: function(formName) {
	      var that = this
	      this.formStore.formData.data.id = this.showData.id
	      GUtils.post(dataPath.updateUserAuth, this.formStore.formData.data, function(data) {
	        that.$parent.iload()
	        that.h()
	      })
    },
	    h() {
	      this.updateUserInfoDV = false
	      this.$emit('diafalse', false)
	    }
	  },
	  mounted: function() {}
	}
</script>

<style>

</style>