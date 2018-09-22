<template>
    <div>
        <page>
            <div slot="title">测评记录生成进度</div>
        </page>
        <elx-table-layout>

            <template slot="headerLeft">
                <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
                    <el-form-item label="状态">
                        <el-select v-model="formInline.state" placeholder="请选择">
                            <el-option v-for="item in recordStateList" :value="item.value" :label="item.label" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </template>
            <el-table :data="data" style="width: 100%" border size="mini">
                <el-table-column prop="projectName" label="项目名称">
                </el-table-column>
                <el-table-column prop="orgName" label="组织名称">
                </el-table-column>
                <el-table-column prop="state" :formatter="stateFormatter" label="状态">
                </el-table-column>
                <el-table-column prop="startTime" label="开始时间">
                </el-table-column>
                <el-table-column prop="complateTime" label="完成时间">
                </el-table-column>
                <el-table-column label="操作" width="88" header-align="left" align="center">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button size="mini" @click="">
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :disabled="scope.row.state != 'CO'" @click.native="showRank(scope.row)">查看排名</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
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
      formInline: {
        state: ""
      },
      projectCode: "",
      data: [],
      recordStateList: []
    };
  },
  watch: {},
  methods: {
    stateFormatter(r, c, v, i) {
      var arr = this.recordStateList;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].value == v) {
          return arr[i].label;
        }
      }
      return v;
    },
    showRank(row) {
      //查看排名
      this.$router.push({
        path: "/zongce/showAppraisalRankForStaff",
        query: {
          orgCode: row.orgCode,
          projectCode: row.projectCode
        }
      });
    },
    getRecordState() {
      this.recordStateList = [];
      this.getAppraisalRecordState({}).then(response => {
        this.recordStateList = response.resBody;
        this.recordStateList.unshift({ label: "全部", value: "0" });
      });
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
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      getAppraisalRecordState: store.namespace + "/getAppraisalRecordState",
      queryAppraisalRecord: store.namespace + "/queryAppraisalRecord"
    }),
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        state: this.formInline.state,
        projectCode: this.projectCode
      };
      //查询数据的方法
      this.queryAppraisalRecord(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
      });
    },
    onSubmit() {
      this.pageInfo.currentPage = 1;
      this.getData();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!to.query.projectCode) {
        vm.$message.error("参数不正确");
      }
      vm.projectCode = to.query.projectCode;
      vm.getData();
      vm.getRecordState();
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