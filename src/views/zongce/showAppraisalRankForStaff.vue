<template>
  <page>
    <div slot="title">综测排名详情</div>
    <div slot="panel">
      <elx-table-layout>
        <template slot="headerLeft">
          <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
            <el-form-item label="学号">
              <el-input v-model="formInline.stuNo" placeholder="学号"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="formInline.stuName" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </template>
        <el-table :data="data" style="width: 100%" border size="mini">
          <el-table-column prop="orgName" label="组织名称">
          </el-table-column>
          <el-table-column prop="stuNo" label="学号">
          </el-table-column>
          <el-table-column prop="stuName" label="学生名称">
          </el-table-column>
          <el-table-column prop="score" label="成绩">
          </el-table-column>
          <el-table-column prop="rank" label="班级排名">
          </el-table-column>
        </el-table>
        <template slot="footer">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalRecord">
          </el-pagination>
        </template>
      </elx-table-layout>
    </div>
  </page>
</template>

  <script>
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";
Vue.use(Element);
export default {
  data() {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      projectCode: "",
      orgCode: "",
      formInline: {
        stuName: "",
        stuNo: ""
      },

      data: []
    };
  },
  watch: {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.currentPage = val;
      this.getData();
    },
    ...mapActions({
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      queryAppraisalRankForStaff:
        store.namespace + "/queryAppraisalRankForStaff"
    }),
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        projectCode: this.projectCode,
        orgCode: this.orgCode,
        stuName: this.formInline.stuName,
        stuNo: this.formInline.stuNo
      };
      //查询数据的方法
      this.queryAppraisalRankForStaff(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    getDict() {
      var requestData = {
        dicts: ["nation"]
      };
      this.getDictByDictNames(requestData).then(response => {
        this.getData();
      });
    },

    onSubmit() {
      this.pageInfo.currentPage = 1;
      this.getData(this.projectId);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getDict();
      if (!to.query.projectCode || !to.query.orgCode) {
        vm.$message.error("参数不正确");
      }
      vm.projectCode = to.query.projectCode;
      vm.orgCode = to.query.orgCode;
    });
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
.demo-form-inline {
  display: inline !important;
}
</style>