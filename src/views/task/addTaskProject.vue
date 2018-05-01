<template>
	<page :Breadcrumb="true">
			<div slot="title">项目管理</div>
			<div slot="panel" class="panel">
				
				<div class="panel-body">
					<el-form size="mini" :model="formStore.data" ref='form1' :rules='formStore.rules' label-width="120px">
						<el-form-item label="节点标题" prop="nodeTitle">
							<el-input size="mini" v-model="formStore.data.nodeTitle" placeholder="请输入节点标题"></el-input>
						</el-form-item>
						<el-form-item label="节点描述" prop="nodeDesc">
							<el-input size="mini" v-model="formStore.data.nodeDesc" placeholder="请输入节点标题"></el-input>
						</el-form-item>
						<el-form-item label="计划开始时间" prop="planStartTime">
							<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.data.planStartTime" type="date" placeholder="计划开始时间">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="计划完成时间" prop="planCompleteTime">
							<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.data.planCompleteTime" type="date" placeholder="计划完成时间">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="项目编号" prop="projectNo">
							<el-input size="mini" v-model="formStore.data.projectNo" placeholder="请输入项目编号"></el-input>
						</el-form-item>
						<el-form-item label="项目名称" prop="projectName">
							<el-input size="mini" v-model="formStore.data.projectName" placeholder="请输入项目名称"></el-input>
						</el-form-item>
						<el-form-item label="业务类别" prop="serviceTypeCode">
							<el-select v-model="formStore.data.serviceTypeCode" placeholder="请选择业务类别">
								<el-option v-for="(item,index) in serviceTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<el-button type="success" size="mini" @click="submitForm('form1')">提交</el-button>
				</div>
			</div>

	</page>
</template>

<script>
import { addTaskProject } from '~/api/task'

var serviceTypeList = [
  {
    label: '业务类别',
    value: '1001'
  }
]
var formStore = {}
formStore.data = {
  nodeTitle: '', // 节点标题
  nodeDesc: '', // 节点描述
  planStartTime: '', // 计划开始时间
  planCompleteTime: '', // 计划完成时间
  projectNo: '', // 项目编号
  projectName: '', // 项目名称
  serviceTypeCode: '' // 业务类别
}
formStore.rules = {
  nodeTitle: [], // 节点标题
  nodeDesc: [], // 节点描述
  planStartTime: [], // 计划开始时间
  planCompleteTime: [], // 计划完成时间
  projectNo: [], // 项目编号
  projectName: [], // 项目名称
  serviceTypeCode: [] // 业务类别
}
export default {
  data() {
    return {
      formStore,
      serviceTypeList // 业务类别列表
    }
  },
  methods: {
    submitForm: function(formName) {
      var data = this.formStore.data
      this.$refs[formName].validate(valid => {
        if (valid) {
          new Promise((resolve, reject) => {
            addTaskProject(data)
              .then(response => {
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>