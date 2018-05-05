<template>

  <div>
    <el-form size="mini" :model="formStore.data" ref='form1' :rules='formStore.rules' label-width="150px">
      <el-form-item label="节点标题" prop="nodeTitle">
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
      <el-form-item label='请选择节点组织' prop="nodeOrgCode">
        <el-cascader :change-on-select='true' expand-trigger="click" :props="orgProps" :options="orgList" v-model="formStore.data.nodeOrgCode" @change="orgCodeChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label='请选择责任人职务' prop="liablerDutyCode">
        <el-select v-model="formStore.data.liablerDutyCode" @change="dutyCodeChange" placeholder="请选择责任人职务">
          <el-option v-for="(item,index) in dutyList" :key="index" :label="item.duty_name" :value="item.duty_code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='请选择责任人' prop='liablerId'>
        <el-select v-model="formStore.data.liablerId" placeholder="请选择责任人">
          <el-option v-for="(item,index) in userList" :key="index" :label="item.nick_name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='请选择业务场景' prop='serviceSceneCode'>
        <el-select v-model="formStore.data.serviceSceneCode" placeholder="请选择业务场景">
          <el-option v-for="(item,index) in serviceSceneList" :key="index" :label="item.sceneName" :value="item.sceneSeq"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="success" size="mini" @click="submitForm('form1')">提交</el-button>

  </div>

</template>

<script>
import {
  addTaskFacade,
  queryDutyByOrgCode,
  queryUserByDutyCodeAndOrgCode,
  queryUserOrg,
  querySceneByProjectSystemSerialNo
} from '~/api/task'

var serviceSceneList = []

export default {
  props: ['parentNodeNo', 'rootNodeNo'],
  data() {
    return {
      formStore: {
        data: {
          parentNodeNo: this.parentNodeNo,
          rootNodeNo: this.rootNodeNo,
          nodeTitle: '', // 节点标题
          nodeDesc: '', // 节点描述
          planStartTime: '', // 计划开始时间
          planCompleteTime: '', // 计划完成时间
          nodeOrgCode: [], // 节点所在机构
          liablerDutyCode: '', // 责任人职务
          liablerId: '', // 责任人id
          serviceSceneCode: '' // 业务场景
        },
        rules: {
          nodeTitle: [], // 节点标题
          nodeDesc: [], // 节点描述
          planStartTime: [], // 计划开始时间
          planCompleteTime: [], // 计划完成时间
          nodeOrgCode: [], // 节点所在机构
          liablerDutyCode: [], // 责任人职务
          liablerId: [], // 责任人id
          serviceSceneCode: [] // 业务场景
        }
      },
      serviceSceneList,
      orgList: [],
      dutyList: [],
      userList: [],
      orgProps: {
        value: 'org_code',
        label: 'org_name'
      }
    }
  },
  methods: {
    submitForm(formName) {
      var data = JSON.parse(JSON.stringify(this.formStore.data))
      data.nodeOrgCode = this.formStore.data.nodeOrgCode[
        this.formStore.data.nodeOrgCode.length - 1
      ]
      var that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          new Promise((resolve, reject) => {
            addTaskFacade(data).then(response => {
              that.$message.success('成功!')
            })
          })
        } else {
          return false
        }
      })
    },
    // 组织变化触发的方法,加载组织下职务
    orgCodeChange: function(val) {
      this.formStore.data.liablerDutyCode = ''
      console.log(val)
      var data = {
        orgCode: val
      }
      new Promise((resolve, reject) => {
        queryDutyByOrgCode(data)
          .then(response => {
            resolve(response)
            console.log(['queryDutyByOrgCode', response])
            this.dutyList = response.resBody
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 职务被选中触发的方法加载责任人列表
    dutyCodeChange: function(val) {
      this.formStore.data.liablerId = ''
      var data = {
        orgCode: this.formStore.data.nodeOrgCode,
        dutyCode: val
      }
      new Promise((resolve, reject) => {
        queryUserByDutyCodeAndOrgCode(data)
          .then(response => {
            resolve(response)
            console.log(['queryUserByDutyCodeAndOrgCode', response])
            this.userList = response.resBody
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  mounted: function() {
    new Promise((resolve, reject) => {
      queryUserOrg().then(response => {
        this.orgList = response.resBody
      })
    })
    var querySceneData = { systemSerialNo: this.rootNodeNo }
    new Promise((resolve, reject) => {
      querySceneByProjectSystemSerialNo(querySceneData).then(response => {
        this.serviceSceneList = response.resBody
      })
    })
  }
}
</script>

<style>

</style>