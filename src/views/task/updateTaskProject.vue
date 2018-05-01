<template>
	<div>
		<el-form size="mini" :model="formStore.data" ref='form1' :rules='formStore.rules' label-width="80px">
			<el-form-item label="项目名称" prop="noteTitle">
				<el-input size="mini" v-model="formStore.data.noteTitle" placeholder="请输入节点标题"></el-input>
			</el-form-item>
			<el-form-item label="节点描述" prop="nodeDesc">
				<el-input size="mini" v-model="formStore.data.nodeDesc" placeholder="请输入节点标题"></el-input>
			</el-form-item>
			<el-form-item label="计划开始时间" prop="planStartTime">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd hh:mm:ss" v-model="formStore.data.planStartTime" type="date" placeholder="计划开始时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="计划完成时间" prop="planCompleteTime">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd hh:mm:ss" v-model="formStore.data.planCompleteTime" type="date" placeholder="计划完成时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="项目编号" prop="projectNo">
				<el-input size="mini" v-model="formStore.data.projectNo" placeholder="请输入项目编号"></el-input>
			</el-form-item>
			<el-form-item label="业务类别" prop="serviceTypeCode">
				<el-select v-model="formStore.data.serviceTypeCode" placeholder="请选择业务类别">
					<el-option v-for="(item,index) in serviceTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<el-button type="success" size="mini" @click="submitForm">提交</el-button>
	</div>
</template>

<script>
	import { updateTaskProject, getTaskProject } from '~/api/task'

	//这个是要修改的项目的项目编号
	var systemSerialNo = "1001";

	var serviceTypeList = [{
		'label': '业务类别',
		'value': '1001'
	}];
	var formStore = {};
	formStore.data = {
		noteTitle: "", //节点标题
		nodeDesc: "", //节点描述
		planStartTime: "", //计划开始时间
		planCompleteTime: "", //计划完成时间
		projectNo: "", //项目编号
		serviceTypeCode: "" //业务类别
	}
	formStore.rules = {
		noteTitle: [], //节点标题
		nodeDesc: [], //节点描述
		planStartTime: [], //计划开始时间
		planCompleteTime: [], //计划完成时间
		projectNo: [], //项目编号
		serviceTypeCode: [] //业务类别
	}
	export default {
		data() {
			return {
				formStore,
				serviceTypeList //业务类别列表
			}
		},
		methods: {
			submitForm: function(formName) {
				var data = this.formStore.data;
				var that = this;
				data.systemSerialNo = systemSerialNo;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						new Promise((resolve, reject) => {
							updateTaskProject(data)
								.then(response => {
									 that.$message.success("成功!")
									resolve(response)
								})
								.catch(error => {
									reject(error)
								})
						})
					} else {
						return false;
					}
				});
			}
		},
		mounted: function() {
			new Promise((resolve, reject) => {
                var data = {
                    'systemSerialNo':systemSerialNo
                }
				getTaskProject(data)
					.then(response => {
						resolve(response)
						console.log(["updateTaskProjectData",response]);
					})
					.catch(error => {
						reject(error)
					})
			})
		}
	}
</script>

<style>

</style>