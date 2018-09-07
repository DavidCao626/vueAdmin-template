<template>
    <div>
        <page>
            <div slot="title">励志奖学金申请记录</div>
        </page>
        <elx-table-layout>
            <el-table :data="data" style="width: 100%" border size="mini">
                <el-table-column prop="studentName" label="学生名称">
                </el-table-column>
                <el-table-column prop="stuOrgName" label="组织">
                </el-table-column>
                <el-table-column prop="serviceTypeName" label="业务类别">
                </el-table-column>
                <el-table-column prop="childServiceTypeName" label="子业务类别">
                </el-table-column>
                <el-table-column prop="projectName" label="项目名称">
                </el-table-column>
                <el-table-column prop="classRecommend" label="班级推荐" :formatter="recommendFormatter">
                </el-table-column>
                <el-table-column prop="collegeRecommend" label="学院推荐" :formatter="recommendFormatter">
                </el-table-column>
                <el-table-column prop="schoolRecommend" label="学校推荐" :formatter="recommendFormatter">
                </el-table-column>
            </el-table>
            <template slot="footer">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalRecord">
                </el-pagination>
            </template>
        </elx-table-layout>
    </div>
</template>

  <script>
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "../_store/index.js";
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
      formInline: {
        orgCode: [] //组织机构
      },
      childSerList: [],
      data: []
    };
  },
  watch: {},
  methods: {
    recommendFormatter(r, c, v, i) {
      var arr = this.childSerList;
      for (var j = 0; j < arr.length; j++) {
        if (arr[j].classifyCode == v) {
          return arr[j].classifyName;
        }
      }
    },
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
      queryPovertyApply: store.namespace + "/queryMotivationalScholarshipApply",
      queryAllClassifyChild: store.namespace + "/queryAllClassifyChild"
    }),
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      //查询数据的方法
      this.queryPovertyApply(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo.totalRecord = response.resBody.pageInfo.totalRecord;
      });
    },
    getChildSer() {
      this.queryAllClassifyChild({}).then(response => {
        this.childSerList = response.resBody;
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
        vm.getChildSer();
      vm.getDict();
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