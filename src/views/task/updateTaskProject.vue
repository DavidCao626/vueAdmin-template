<template>
	<div>
		<el-form size="mini" :model="formStore.data" ref='form1' :rules='formStore.rules' label-width="80px">
			<el-form-item label="项目名称" prop="nodeTitle">
				<el-input size="mini" v-model="formStore.data.nodeTitle" placeholder="请输入节点标题"></el-input>
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
					<el-option v-for="(item,index) in serviceTypeList" :key="index" :label="item.classifyName" :value="item.classifyCode"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<el-button type="success" size="mini" @click="submitForm('form1')">提交</el-button>
	</div>
</template>

<script>
import { queryServiceTypeList, updateTaskProject, getTaskProject } from '~/api/task'

export default {
  props: {
    systemSerialNo: {
      type: String,
      default: 'P15255736419785625'
    }
  },
  data() {
    return {
      formStore: {
        data: {
          nodeTitle: '', // 节点标题
          nodeDesc: '', // 节点描述
          planStartTime: '', // 计划开始时间
          planCompleteTime: '', // 计划完成时间
          projectNo: '', // 项目编号
          serviceTypeCode: '' // 业务类别
        },
        rules: {
          nodeTitle: [], // 节点标题
          nodeDesc: [], // 节点描述
          planStartTime: [], // 计划开始时间
          planCompleteTime: [], // 计划完成时间
          projectNo: [], // 项目编号
          serviceTypeCode: [] // 业务类别
        }
      },
      serviceTypeList: {
        label: '业务类别',
        value: '1001'
      } // 业务类别列表
    }
  },
  methods: {
    submitForm: function(formName) {
      var data = this.formStore.data
      var that = this
      data.systemSerialNo = this.systemSerialNo
      this.$refs[formName].validate(valid => {
        if (valid) {
          new Promise((resolve, reject) => {
            updateTaskProject(data)
              .then(response => {
                that.$message.success('成功!')
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
  },
  mounted: function() {
    new Promise((resolve, reject) => {
      var data = {
        systemSerialNo: this.systemSerialNo
      }
	      getTaskProject(data)
	        .then(response => {
	          resolve(response)
	          console.log(['updateTaskProjectData', response])
          this.formStore.data = response.resBody
        })
	        .catch(error => {
	          reject(error)
	        })
    }),
			    new Promise((resolve, reject) => {
      queryServiceTypeList()
        .then(response => {
          this.serviceTypeList = response.resBody
        })
    })
	  }
}
</script>

<style>

</style>