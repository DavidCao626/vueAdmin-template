<template>
	<el-form :inline="true" :model="formInline" class="demo-form-inline">

		<el-form-item label="请选择筛选条件">
			<el-select v-model="formInline.trem" placeholder="请选择">
				<el-option label="人事编号" value="staffNum"></el-option>
				<el-option label="教职工姓名" value="staffName"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="">
			<el-input v-model="formInline.choose" placeholder="请输入"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">开始查询</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	import Vue from 'vue'
	import GUtils from '@/components/Utils.js'
	import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
	import GraceComponent from '@/ComponentPackage/GraceComponents.js'
	import staffRequetPath from '@/API/Teacher/teacherStaff_manager.js'
	import axios from 'axios'
	Vue.use(GraceComponent)

var pagehContainer = GStoreFactory.buildVContainer()
var pageManagerStore = GStoreFactory.buildManagerPageStore()

pageManagerStore.addConf('loadData', function() {
	  loadData()
})
pageManagerStore.addConf('workSpaceWidth', '40vw')

var pageDataStore = GStoreFactory.buildServiceForm()
var staffList = GStoreFactory.buildServiceFormData()

var staffConf = {
	  'method': 'post',
	  'url': staffRequetPath.getAllStaff
}

pageManagerStore.store.conf.loaddings = true
axios(staffConf).then(function(response) {
	  console.log(['response', response])
  pageManagerStore.store.conf.loaddings = false
  staffList.pushData(response.data.body.resBody)
}).catch(function(error) {
	pageManagerStore.store.conf.loaddings = false
  vuemain.$message({
	    showClose: true,
	    message: error.message,
	    type: 'error'
	})
})
export default {
	  data() {
	    return {
	      formInline: {
	        choose: '',
	        trem: 'staffName'
	      }
	    }
	  },
	  methods: {
	    onSubmit() {
	      /* formInline   */
	      /* select * from nn where trem = choose*/
	      console.log(this.formInline.choose)
	    }
	  }
	}
</script>

<style>

</style>