<template>
    <div>
        <page>
            <div slot="title">申请记录</div>
        </page>
        <elx-table-layout>
            <template slot="headerLeft">

                <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">

                    <el-form-item label="记录状态">
                        <el-select v-model="formInline.recordState" placeholder="记录状态">
                            <el-option v-for="item in recordStateList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </template>
            <el-table :data="data" style="width: 100%" border size="mini">
                <el-table-column prop="project_name" label="项目名称">
                </el-table-column>
                <el-table-column prop="year_type" label="年度">
                </el-table-column>
                <el-table-column prop="job_name" label="岗位名称">
                </el-table-column>
                <el-table-column prop="mobile" label="岗位联系人">
                </el-table-column>
                <el-table-column prop="state" label="申请状态状态" :formatter="stateFormatter">
                </el-table-column>
                <el-table-column prop="apply_time" label="申请时间">
                </el-table-column>
                <el-table-column prop="employ_time" label="录用时间">
                </el-table-column>
                <el-table-column prop="post_time" label="到岗时间">
                </el-table-column>

                <el-table-column label="操作" width="88" header-align="left" align="center">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button size="mini" @click="">
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="cancleApply(scope.row)">取消申请</el-dropdown-item>

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
      recordStateList: [],
      jobCode: "",
      formInline: {
        recordState: "0"
      },
      orgProps: {
        label: "org_name",
        value: "org_code",
        children: "children"
      },

      orgList: [],
      data: []
    };
  },
  watch: {},
  methods: {
    stateFormatter(row, column, cellValue, index) {
      var arr = this.recordStateList;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].value == cellValue) {
          return arr[i].label;
        }
      }
    },
    cancleApply(row) {
      this.deleteApplyRecord({ id: row.id }).then(response => {
        this.$message.success("取消成功");
        this.getData();
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
      queryApplyRecord: store.namespace + "/queryApplyRecordAndProject",
      getRecordStateDict: store.namespace + "/getRecordStateDict",
      deleteApplyRecord: store.namespace + "/deleteApplyRecord"
    }),
    getRecordStateList() {
      this.getRecordStateDict({}).then(response => {
        this.recordStateList = response.resBody;
        this.recordStateList.unshift({ label: "全部", value: "0" });
      });
    },
    getData() {
      var requestData = {
        recordState: this.formInline.recordState,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      //查询数据的方法
      this.queryApplyRecord(requestData).then(response => {
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
    getDict() {
      var requestData = {
        dicts: ["nation"]
      };
      this.getDictByDictNames(requestData).then(response => {
        this.getData();
        this.getOrgList();
        this.getRecordStateList();
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