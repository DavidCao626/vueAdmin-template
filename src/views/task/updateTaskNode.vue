<template>
  <div>
    <el-form size="mini" :model="formStore.data" ref='form1' :rules='formStore.rules' label-width="80px">
      <el-form-item label="计划开始时间" prop="planStartTime">
        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.data.planStartTime" type="date" placeholder="计划开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="计划完成时间" prop="planCompleteTime">
        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.data.planCompleteTime" type="date" placeholder="计划完成时间">
        </el-date-picker>
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
  queryUserOrg,
  getTaskNodeBySystemSerialNo,
  updateTaskNode
} from "~/api/task";

export default {
  props: {
    systemSerialNoProp: {
      type: String,
      default: "N15255746693951251"
    }
  },
  watch: {
    systemSerialNoProp(val, oldval) {
      this.systemSerialNo = val;
         new Promise((resolve, reject) => {
      var data = {
        systemSerialNo: this.systemSerialNo
      };
      getTaskNodeBySystemSerialNo(data).then(response => {
       this.formStore.data.systemSerialNo = response.resBody.baseData.systemSerialNo;
        this.formStore.data.planStartTime = response.resBody.baseData.planStartTime;
        this.formStore.data.planCompleteTime = response.resBody.baseData.planCompleteTime;
      });
    });
    }
  },
  data() {
    return {
      systemSerialNo: this.systemSerialNoProp,
      formStore: {
        data: {
          planStartTime: "", // 计划开始时间
          planCompleteTime: "" // 计划完成时间
        },
        rules: {
          planStartTime: [], // 计划开始时间
          planCompleteTime: [] // 计划完成时间
        }
      },
      orgList: [],
      dutyList: [],
      userList: [],
      orgProps: {
        value: "org_code",
        label: "org_name"
      }
    };
  },
  methods: {
    submitForm(formName) {
      var data = JSON.parse(JSON.stringify(this.formStore.data));
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          new Promise((resolve, reject) => {
            updateTaskNode(data).then(response => {
              that.$message.success("成功!");
            });
          });
        } else {
          return false;
        }
      });
    }
  },
  mounted: function() {
    new Promise((resolve, reject) => {
      var data = {
        systemSerialNo: this.systemSerialNo
      };
      getTaskNodeBySystemSerialNo(data).then(response => {
        this.formStore.data.systemSerialNo = response.resBody.baseData.systemSerialNo;
        this.formStore.data.planStartTime = response.resBody.baseData.planStartTime;
        this.formStore.data.planCompleteTime = response.resBody.baseData.planCompleteTime;
      });
    });
  }
};
</script>

<style>
</style>