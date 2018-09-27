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
        <el-select disabled v-model="formStore.data.step" placeholder="请选择职务">
          <el-option v-for="(item,index) in serviceSceneList" :key="index" :label="item.name" :value="item.step"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="success" size="mini" @click="submitForm('form1')">提交</el-button>
  </div>
</template>

<script>
import {
  updateTaskFacade,
  queryDutyByOrgCode,
  queryUserByDutyCodeAndOrgCode,
  queryUserOrg,
  queryAlltaskDefFacade,
  getNodeTaskFacadeBySystemSerialNo,
  querySceneByProjectSystemSerialNo
} from "~/api/task";

var resolverList = [
  {
    label: "外观类",
    value: "1001"
  }
];
var serviceSceneList = [
  {
    label: "业务场景",
    value: "1001"
  }
];
var serviceTypeList = [
  {
    label: "业务类型",
    value: "1001"
  }
];

var formStore = {};
formStore.data = {
  systemSerialNo: "",
  planStartTime: "", // 计划开始时间
  planCompleteTime: "", // 计划完成时间
  step: ""
};
formStore.rules = {
  planStartTime: [], // 计划开始时间
  planCompleteTime: [], // 计划完成时间
  step: [] //场景
};
export default {
  props: {
    systemSerialNoProp: {
      type: String,
      default: "P15255736419785625"
    }
  },
  watch: {
    systemSerialNoProp(val, oldval) {
      this.formStore.data.systemSerialNo = val;
      var that = this;
      var getNodeTaskFacadeData = {
        systemSerialNo: this.formStore.data.systemSerialNo
      };
      new Promise((resolve, reject) => {
        getNodeTaskFacadeBySystemSerialNo(getNodeTaskFacadeData).then(
          response => {
            this.formStore.data.systemSerialNo =
              response.resBody.baseData.systemSerialNo;
            this.formStore.data.planStartTime =
              response.resBody.baseData.planStartTime;
            this.formStore.data.planCompleteTime =
              response.resBody.baseData.planCompleteTime;
            this.formStore.data.step = response.resBody.baseData.step;
            var querySceneData = {
              parentNodeNo: response.resBody.baseData.parentNodeNo,
              rootNodeNo: response.resBody.baseData.rootNodeNo
            };
            new Promise((resolve, reject) => {
              queryAlltaskDefFacade(querySceneData).then(response => {
                that.serviceSceneList = response.resBody;
              });
            });
          }
        );
      });
    }
  },
  data() {
    return {
      formStore: {
        data: {
          systemSerialNo: this.systemSerialNoProp,
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
      resolverList,
      serviceSceneList,
      serviceTypeList,
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
      var that = this;
      var data = JSON.parse(JSON.stringify(this.formStore.data));
      this.$refs[formName].validate(valid => {
        if (valid) {
          new Promise((resolve, reject) => {
            updateTaskFacade(data).then(response => {
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
    var that = this;
    var getNodeTaskFacadeData = {
      systemSerialNo: this.formStore.data.systemSerialNo
    };
    new Promise((resolve, reject) => {
      getNodeTaskFacadeBySystemSerialNo(getNodeTaskFacadeData).then(
        response => {
          this.formStore.data.systemSerialNo =
            response.resBody.baseData.systemSerialNo;
          this.formStore.data.planStartTime =
            response.resBody.baseData.planStartTime;
          this.formStore.data.planCompleteTime =
            response.resBody.baseData.planCompleteTime;
          this.formStore.data.step = response.resBody.baseData.step;
          var querySceneData = {
            parentNodeNo: response.resBody.baseData.parentNodeNo,
            rootNodeNo: response.resBody.baseData.rootNodeNo
          };
          new Promise((resolve, reject) => {
            queryAlltaskDefFacade(querySceneData).then(response => {
              that.serviceSceneList = response.resBody;
            });
          });
        }
      );
    });
  }
};
</script>

<style>
</style>