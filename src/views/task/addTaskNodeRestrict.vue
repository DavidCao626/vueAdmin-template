<template>
	<div>
		<el-form size="mini" :model="formStore.data" ref='form1' :rules='formStore.rules' label-width="80px">
			<el-form-item label="约束节点操作" prop="nodeAction">
				<el-select v-model="formStore.data.nodeAction" placeholder="请选择">
					<el-option v-for="(item,index) in nodeActionList" :key="index" :label="item.dict_desc" :value="item.dict_key"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="请选择节点" prop="restrictNodeNo">
				<el-select v-model="formStore.data.restrictNodeNo" placeholder="请选择">
					<el-option v-for="(item,index) in nodeList" :key="index" :label="item.nodeTitle" :value="item.systemSerialNo"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="约束节点状态" prop="restrictState">
				<el-select v-model="formStore.data.restrictState" placeholder="请选择">
					<el-option v-for="(item,index) in restrictStateList" :key="index" :label="item.dict_desc" :value="item.dict_key"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<el-button type="success" size="mini" @click="submitForm('form1')">提交</el-button>

	</div>
</template>

<script>
	import { insertTaskNodeRestrict, querySameNodeBySystemSerialNo, getDictByDictNames } from '~/api/task'

	var nodeNo = "P15249259149571375"; //要约束的节点

	var formStore = {}
	formStore.data = {
		'nodeNo': nodeNo,
		'nodeAction': "",
		'restrictNodeNo': "",
		'restrictState': ""
	}
	formStore.rules = {
		'nodeNo': nodeNo,
		'nodeAction': [],
		'restrictNodeNo': [],
		'restrictState': []
	}
	export default {
		data() {
			return {
				formStore,
				nodeActionList: [],
				nodeList: [],
				restrictStateList: []
			}
		},
		methods: {
			submitForm (formName) {
				var data = this.formStore.data;
				var that = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						new Promise((resolve, reject) => {
							insertTaskNodeRestrict(data)
								.then(response => {
									 that.$message.success("成功!")
								})
								.catch(error => {})
						})
					} else {
						return false;
					}
				})
			}
		},
		mounted: function() {
			var dictData = {
				'dicts': ['node_action', 'node_state']
			}
			new Promise((resolve, reject) => {
				getDictByDictNames(dictData)
					.then(response => {
						this.nodeActionList = response.resBody.node_action;
						this.restrictStateList = response.resBody.node_state;
					})
					.catch(error => {})
			})

			var queryChildData = {
				'systemSerialNo': nodeNo
			}
			new Promise((resolve, reject) => {
				querySameNodeBySystemSerialNo(queryChildData)
					.then(response => {
						this.nodeList = response.resBody
					})
					.catch(error => {})
			})
		}

	}
</script>

<style>

</style>