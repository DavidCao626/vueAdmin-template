<template>
	<div>
		<el-dialog title="认证信息" :visible.sync="addUserInfoDV" width="45vw" top="8vh" @close="h">
			<div style="overflow-y:scroll;height:48vh;padding:0 15px">

				<el-form size="mini" :model="formStore.formData.data" ref="addForm" :rules="formStore.formData.rules" disabled label-width="100px">
					<el-form-item label="登录名">
						 
					</el-form-item>
					<el-form-item label="管理节点">
						 
					</el-form-item>
					<el-form-item label="职务">
						 
					</el-form-item>
					<el-form-item label="用户对象">
						 
					</el-form-item>
					<el-form-item label="认证体">
						<span></span>
					</el-form-item>
				</el-form>
			</div>

			<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="addUserAuth('addForm')">增  加</el-button>
					<el-button size="small" @click="h">取  消</el-button>
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
	import dataPath from '@/API/UserAuth/User_Auth_Info.js'
	Vue.use(GraceComponent)
var requestData = {
	  'dicts': ['check_flag', 'authState']
	}
	var dictData = {}
GUtils.post(dataPath.getDictByDictNames, requestData, function(data) {
	  dictData = data.resBody
})

var formStore = GStoreFactory.buildServiceForm()
var formDataStore = GStoreFactory.buildServiceFormData()
formDataStore.pushData({
	  managerNodeCode: '', // 管理节点代码
	  dutyCode: '', // 职务代码
	  certOrg: '', // 用户的认证机构
	  // authBody:{},认证体
	  classifyCode: ''// 用户对象
	})
formStore.addAttr('formData', formDataStore)

export default {
	  props: {
	    authUserInfoDVp: {
	      type: Boolean,
	      default: false
	    }
	  },
	  data() {
	    return {
	      formStore,
	      addUserInfoDV: false
	    }
	  },
	  computed: {
	  },
	  watch: {
	    authUserInfoDVp() {
	      this.addUserInfoDV = this.authUserInfoDVp
	    }
	  },
	  methods: {
	    addUserAuth: function(formName) {
	      this.h()
	    },
	    h() {
	      this.addUserInfoDV = false
	      this.$emit('diafalse', false)
	    }
	  },
	  mounted: function() {
	  }
	}
</script>

<style>

</style>