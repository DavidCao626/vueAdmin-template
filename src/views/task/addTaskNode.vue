<template>
  <div>
    <el-form size="mini" :model="formStore.data" ref='form1' :rules='formStore.rules' label-width="160px">
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
    </el-form>
    <el-button type="success" size="mini" @click="submitForm('form1')">提交</el-button>

  </div>
</template>

<script>
import {
  addTaskNode,
  queryDutyByOrgCode,
  queryUserByDutyCodeAndOrgCode,
  queryUserOrg
} from '~/api/task'

export default {
  props: {
    rootNodeNoProp: {
      type: String,
      default: '0'
    },
    parentNodeNoProp: {
      type: String,
      default: '0'
    }
  },  watch: {
    parentNodeNoProp: function(val, oldval) {
      alert(val)
      this.formStore.data.parentNodeNo = val;
    },
    rootNodeNoProp: function(val, oldval) {
      this.formStore.data.rootNodeNo = val;
    }
  },
  data() {
    return {
      formStore: {
        data: {
          parentNodeNo: this.parentNodeNoProp,
          rootNodeNo: this.rootNodeNoProp,
          nodeTitle: '', // 节点标题
          nodeDesc: '', // 节点描述
          planStartTime: '', // 计划开始时间
          planCompleteTime: '', // 计划完成时间
          nodeOrgCode: [], // 节点所在机构
          liablerDutyCode: '', // 责任人职务
          liablerId: '' // 责任人id
        },
        rules: {
          nodeTitle: [], // 节点标题
          nodeDesc: [], // 节点描述
          planStartTime: [], // 计划开始时间
          planCompleteTime: [], // 计划完成时间
          nodeOrgCode: [], // 节点所在机构
          liablerDutyCode: [], // 责任人职务
          liablerId: [] // 责任人id
        }
      },
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
      var that = this
      data.nodeOrgCode = this.formStore.data.nodeOrgCode[
        this.formStore.data.nodeOrgCode.length - 1
      ]
      this.$refs[formName].validate(valid => {
        if (valid) {
          new Promise((resolve, reject) => {
            addTaskNode(data).then(response => {
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
  }
}
</script>

<style>

</style>