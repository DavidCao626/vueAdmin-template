<template>

  <page>
    <div slot="title">综测排名详情</div>
    <div slot="panel">
      <elx-table-layout>
        <template slot="headerLeft">
          <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
            <el-form-item label="类型">
              <el-select v-model="formInline.type" placeholder="">
                <el-option label="校内综测" value="XN"></el-option>
                <el-option label="年度综测" value="ND"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学年">
              <el-select v-model="formInline.schoolYearId" placeholder="请选择">
                <el-option v-for="item in schoolYearList2" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
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
          <el-table-column prop="score" label="平均成绩">
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
      schoolYearList: [],
      schoolYearList2: [], //没全部
      orgCode: "",
      formInline: {
        type: "XN",
        schoolYearId: null
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
      querySchoolYear: store.namespace + "/querySchoolYear",
      queryAppraisalRankForStu: store.namespace + "/queryAppraisalRankForStu"
    }),
    getData() {
      this.data = [];
      if (!this.formInline.schoolYearId) {
        this.$message.error("请选择学年");
        return;
      }
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        schoolYearId: this.formInline.schoolYearId,
        type: this.formInline.type
      };
      //查询数据的方法
      this.queryAppraisalRankForStu(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    getSchoolYearList() {
      this.schoolYearList = [];
      this.querySchoolYear({ currentPage: 1, pageSize: 99999 }).then(
        response => {
          this.schoolYearList2 = JSON.parse(
            JSON.stringify(response.resBody.baseData)
          );

          this.schoolYearList = response.resBody.baseData;
          this.schoolYearList.unshift({ id: 0, name: "全部" });
        }
      );
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
      vm.getSchoolYearList();
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