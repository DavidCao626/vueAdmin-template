<template>
  <div>

    <el-form :model="projectApply.data" :rules="projectApply.rules" ref="form1" label-width="" size="mini">
      <el-form-item prop="applyProject" label="项目名称">
        <el-select v-model="projectApply.data.applyProject" @change="getServiceTypeList">
          <el-option v-for="(item,index) in projectList" :key="index" :value="item.systemSerialNo" :label="item.projectName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="serviceType" label="业务类别">
        <el-select v-model="projectApply.data.serviceType" @change="getChildService">
          <el-option v-for="(item,index) in serviceTypeList" :key="index" :value="item.serviceTypeCode" :label="item.serviceTypeName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="childServiceType" label="子业务类别">
        <el-select v-model="projectApply.data.childServiceType">
          <el-option v-for="(item,index) in serviceCTypeList" :key="index" :value="item.classifyCode" :label="item.classifyName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="evaluationType" label="关联测评类别">
        <el-select v-model="projectApply.data.evaluationType">
          <el-option v-for="(item,index) in anmeldenTypeList" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="applyReason" label="申请理由">
        <el-input type="textarea" v-model="projectApply.data.applyReason"></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {
  queryProjectList,
  getProjectInfoByNodeNo,
  queryChildService
} from "~/api/task";
var anmeldenTypeList = [
  {
    label: "数据",
    value: "nc"
  },
  {
    label: "数据",
    value: "cz"
  }
];

export default {
  computed: {
    projectApply: {
      get() {
        return this.$store.getters["projectApply"];
      }
    }
  },
  watch: {
    projectApply: {
      get() {
        return this.$store.getters["projectApply"];
      },

      handler: function(val) {
        this.$store.dispatch("updatetaskStyleDataprojectApply", val);
      },
      deep: true
    }
  },
  data() {
    return {
      anmeldenTypeList: [],
      projectList: [],
      serviceTypeList: [],
      serviceCTypeList: [],
      formData: {
        rules: {}
      }
    };
  },
  methods: {
    getServiceTypeList(val) {
      var that = this;
      getProjectInfoByNodeNo({ nodeNo: val }).then(data => {
        that.serviceTypeList = [];
        that.serviceTypeList.push(data.resBody);
      });
    },
    getChildService(val) {
      debugger;
      var that = this;
      queryChildService({ serviceTypeCode: val }).then(data => {
        that.serviceCTypeList = data.resBody;
      });
    }
  },
  mounted: function() {
    var that = this;
    queryProjectList({}).then(data => {
      that.projectList = data.resBody;
    });
  }
};
</script>

<style>

</style>