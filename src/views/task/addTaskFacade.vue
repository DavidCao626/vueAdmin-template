<template>
  <div>
    <el-form size="mini" :model="formStore.data" ref='form1' :rules='formStore.rules' label-width="150px">
      <el-form-item label="计划开始时间" prop="planStartTime">
        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd hh:mm:ss" v-model="formStore.data.planStartTime" type="date" placeholder="计划开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="计划完成时间" prop="planCompleteTime">
        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd hh:mm:ss" v-model="formStore.data.planCompleteTime" type="date" placeholder="计划完成时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择场景" prop="step">
        <el-select v-model="formStore.data.step" placeholder="请选择职务">
          <el-option v-for="(item,index) in serviceSceneList" :key="index" :label="item.name" :value="item.step"></el-option>
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
  querySceneByProjectSystemSerialNo,
  queryAlltaskDefFacade,
  queryChildOrg
} from "~/api/task";
var serviceSceneList = [];
export default {
  props: {
    parentNodeNoProp: {
      type: String,
      default: "N15263914734706887"
    },
    rootNodeNoProp: {
      type: String,
      default: "P15263913800090150"
    }
  },
  watch: {
    parentNodeNoProp: function(val, oldval) {
      this.formStore.data.parentNodeNo = val;
      var querySceneData = {
        /*需要父节点和根节点*/
        parentNodeNo: this.formStore.data.parentNodeNo,
        rootNodeNo: this.formStore.data.rootNodeNo
      };
      new Promise((resolve, reject) => {
        queryAlltaskDefFacade(querySceneData).then(response => {
          this.serviceSceneList = response.resBody;
        });
      });
    },
    rootNodeNoProp: function(val, oldval) {
      this.formStore.data.rootNodeNo = val;
      var querySceneData = {
        /*需要父节点和根节点*/
        parentNodeNo: this.formStore.data.parentNodeNo,
        rootNodeNo: this.formStore.data.rootNodeNo
      };
      new Promise((resolve, reject) => {
        queryAlltaskDefFacade(querySceneData).then(response => {
          this.serviceSceneList = response.resBody;
        });
      });
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
          step: ""
        },
        rules: {
          planStartTime: [], // 计划开始时间
          planCompleteTime: [], // 计划完成时间
          step: [] //场景
        }
      },
      serviceSceneList,
      orgList: [],
      dutyList: [],
      userList: [],
      orgProps: {
      label: "orgName",
        value: "orgCode",
        children: "children"
      }
    };
  },
  methods: {
    submitForm(formName) {
      var data = JSON.parse(JSON.stringify(this.formStore.data));
      // data.nodeOrgCode = this.formStore.data.nodeOrgCode[
      //   this.formStore.data.nodeOrgCode.length - 1
      // ];
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          new Promise((resolve, reject) => {
            addTaskFacade(data).then(response => {
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
    var querySceneData = {
      /*需要父节点和根节点*/
      parentNodeNo: this.formStore.data.parentNodeNo,
      rootNodeNo: this.formStore.data.rootNodeNo
    };
    new Promise((resolve, reject) => {
      queryAlltaskDefFacade(querySceneData).then(response => {
        this.serviceSceneList = response.resBody;
      });
    });
  }
};
</script>

<style>
</style>