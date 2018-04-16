<template>
	<div>
		<div class="icontent" v-for="(data,index) in reData[0]" @click="editContent(data.id)">
			<el-form size="mini" label-width="80px">
				<el-form-item label="机构名称">
					<span>{{data.orgName}}</span>
				</el-form-item>
				<el-form-item label="用户对象">
					<span>{{data.userObject}}</span>
				</el-form-item>
				<el-form-item label="认证机构">
					<span>{{data.checkOrgName}}</span>
				</el-form-item>
				<el-form-item label="对象别名">
					<span>{{data.alias}}</span>
				</el-form-item>
				<el-form-item label="是否可用">
					<span>{{data.available}}</span>
				</el-form-item>
			</el-form>
		</div>

		<!-- 编辑用户对象 -->
		<el-dialog title="编辑用户对象" :visible.sync="editDV" width="45vw" top="10vh">
			<div style="overflow-y:scroll;height:40vh;padding:0 15px">
				<iedit :edit-id="editId" ref="editForm"></iedit>
			</div>
			<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="editUserObject()">保存</el-button>
					<el-button size="small"  type="danger" @click="delContent()">删除</el-button>
				    <el-button size="small" @click="editDV= false">取 消</el-button>
  				</span>
		</el-dialog>
		<!-- 编辑用户对象结束 -->

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
	import reqPath from '@/API/System/SystemManagerApi.js'
	import iedit from './iedit.vue'
	Vue.use(GraceComponent)
import dataPath from '@/API/ManagerNode/manager_node.js'
	// reData由ajax 返回
	var reData = []

function loadData() {
	  reData.splice(0, reData.length)
	GUtils.post(dataPath.getManagerNodeObject, {}, function(data) {
	    console.log(data)
	    reData.push(data.resBody)
	})
}
	export default {
	  components: {
	    iedit
	  },
	  data() {
	    return {
	      reData: reData,
	      editId: '',
	      editDV: false
	
	    }
	  },
	  methods: {
	    loadData: function() {
	      loadData()
	    },
	    editContent: function(id) {
	      this.editDV = true
	      this.editId = id
	      var that = this
	      GUtils.post(dataPath.getUserManagerNodeById, {
	        'id': id
	      }, function(data) {
	        console.log(['editForm', that.$refs['editForm'].formStore])
	        console.log(['resdata', data])
	        // var t = that.$refs["editForm"].formStore.formData.data
	        console.log(['editForm1', that.$refs['editForm'].formStore.formData.data])
	        that.$refs['editForm'].formStore.formData.data.alias = data.resBody.resData[0].alias
	        that.$refs['editForm'].formStore.formData.data.available = data.resBody.resData[0].available
	        that.$refs['editForm'].formStore.formData.data.userObjectId = data.resBody.resData[0].userObjectId
	        that.$refs['editForm'].formStore.formData.data.orgCode = data.resBody.CheckOrgCodergCode
	        console.log(['editForm', that.$refs['editForm'].formStore.formData.data.orgCode])
	      })
    },
	    editUserObject: function(id) {
	      this.editDV = false
	      this.$refs['editForm'].formStore.formData.data.id = this.editId
	      GUtils.post(dataPath.updateManagerNodeUserObject, this.$refs['editForm'].formStore.formData.data, function(data) {
	        // 更新成功
	        loadData()
	      })
    },
	    delContent: function() {
	      this.editDV = false
	      var id = this.editId
	      GUtils.post(dataPath.deleteManagerNodeUserObject, {
	        'id': id
	      }, function(data) {
	        // 删除成功
	        loadData()
	      })
    }
	  },
	  beforeCreate: function() {
	    loadData()
	  }
	}
</script>

<style>
	.icontent {
		border-radius: 15px;
		border: solid #EEEEEE 1px;
		margin: 20px;
		padding: 20px;
	}
	
	.icontent:hover {
		border: solid #A0CFFF 1px;
		cursor: pointer;
	}
</style>