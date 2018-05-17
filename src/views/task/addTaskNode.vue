<template>
  <div>
    <el-form size="mini" :model="formStore.data" ref='form1' :rules='formStore.rules' label-width="160px">
      <el-form-item label="计划开始时间" prop="planStartTime">
        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.data.planStartTime" type="date" placeholder="计划开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="计划完成时间" prop="planCompleteTime">
        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.data.planCompleteTime" type="date" placeholder="计划完成时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label='请选择节点组织' prop="nodeOrgCode">
        <el-checkbox-group v-model="formStore.data.orgs" :min="1">
          <el-checkbox v-for="org in orgList" :label="org.orgCode" :key="org.orgCode">{{org.orgName}}</el-checkbox>
        </el-checkbox-group>
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
  queryChildOrg
} from "~/api/task";

export default {
  props: {
    rootNodeNoProp: {
      type: String,
      default: "P15263734043798326"
    },
    parentNodeNoProp: {
      type: String,
      default: "P15263734043798326"
    }
  },
  watch: {
    parentNodeNoProp: function(val, oldval) {
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
          planStartTime: "", // 计划开始时间
          planCompleteTime: "", // 计划完成时间
          orgs: [] // 节点所在机构
        },
        rules: {
          planStartTime: [], // 计划开始时间
          planCompleteTime: [], // 计划完成时间
          orgs: [] // 节点所在机构
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
            addTaskNode(data).then(response => {
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
      queryChildOrg().then(response => {
        this.orgList = response.resBody;
      });
    });
  }
};
</script>

<style>
</style>