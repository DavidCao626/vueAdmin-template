<template>
    <div>
        <page>
            <div slot="title">岗位审核</div>
        </page>
        <elx-table-layout>
            <template slot="headerLeft">
                <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
                    <el-form-item label="审核状态">
                        <el-select v-model="formInline.jobCheckState" placeholder="岗位状态">
                            <el-option v-for="item in jobCheckStateList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="岗位名称">
                        <el-input v-model="formInline.name" placeholder="岗位名称"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </template>
            <template slot="headerRight">
                <el-button-group>
                    <el-tooltip class="item" effect="dark" content="通过选中" placement="bottom">
                        <el-button @click="okCheckBatch" plain size="mini">
                            通过
                        </el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="不通过选中" placement="bottom">
                        <el-button @click="noCheckBatch" plain size="mini">
                            不通过
                        </el-button>
                    </el-tooltip>
                </el-button-group>
            </template>
            <el-table :data="data" style="width: 100%" border size="mini" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                    <el-table-column prop="name" label="岗位名称">
                    </el-table-column>
                    <el-table-column prop="numbers" label="招聘名额">
                    </el-table-column>
                    <el-table-column prop="checkState" label="审核状态" :formatter="checkStateFormatter">
                    </el-table-column>
                    <el-table-column prop="jobDemand" label="岗位要求">
                    </el-table-column>
                    <el-table-column prop="workTime" label="工作时间要求">
                    </el-table-column>
                    <el-table-column prop="monthWorkload" label="月工作时间">
                    </el-table-column>
                    <el-table-column prop="remark" label="备注">
                    </el-table-column>
                    <el-table-column prop="publisherMobile" label="联系电话">
                    </el-table-column>
                    <el-table-column prop="publisherTime" label="发布时间">
                    </el-table-column>
                    <el-table-column label="操作" width="88" header-align="left" align="center">
                        <template slot-scope="scope">
                            <el-dropdown>
                                <el-button size="mini" @click="">
                                    <i class="el-icon-arrow-down"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="okCheck(scope.row)">通过</el-dropdown-item>
                                    <el-dropdown-item @click.native="noCheck(scope.row)">不通过</el-dropdown-item>
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
        <page>
            <div slot="panel" style="text-align: right">
                <el-button size="mini" @click="complateItem" type="primary">完成</el-button>
            </div>
        </page>
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
      multipleSelection: [],
      scopeId: null,
      itemId: null,
      insertJobDV: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      jobStateList: [],
      projectList: [],
      projectStateList: [],
      formInline: {
        projectId: 0,
        name: "",
        jobCheckState: "",
        jobState: ""
      },
      orgProps: {
        label: "org_name",
        value: "org_code",
        children: "children"
      },
      jobCheckStateList: [],
      orgList: [],
      data: []
    };
  },
  watch: {},
  methods: {
    complateItem() {
      this.completeUserPendingByItemId({ itemId: this.itemId }).then(
        response => {
          this.$message.success("操作成功");
          this.$router.go(-1);
        }
      );
    },
    okCheck(row) {
      var requestData = {
        idList: [row.id]
      };
      this.okCheckJobState(requestData).then(response => {
        this.getData();
        this.$message.success("操作成功");
      });
    },
    noCheck(row) {
      var requestData = {
        idList: [row.id]
      };
      this.noCheckJobState(requestData).then(response => {
        this.getData();
        this.$message.success("操作成功");
      });
    },
    okCheckBatch() {
      var requestArr = [];
      var source = this.multipleSelection;
      if (source.length == 0) {
        this.$message.error("请至少选择一条数据");
        return;
      }
      for (var i = 0; i < source.length; i++) {
        requestArr[i] = source[i].id;
      }
      var requestData = {
        idList: requestArr
      };
      this.okCheckJobState(requestData).then(response => {
        this.getData();
        this.$message.success("操作成功");
      });
    },
    noCheckBatch() {
      var requestArr = [];
      var source = this.multipleSelection;
      if (source.length == 0) {
        this.$message.error("请至少选择一条数据");
        return;
      }
      for (var i = 0; i < source.length; i++) {
        requestArr[i] = source[i].id;
      }
      var requestData = {
        idList: requestArr
      };
      this.noCheckJobState(requestData).then(response => {
        this.getData();
        this.$message.success("操作成功");
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    showRecord(row) {
      this.$router.push({
        path: "/studyWork/jobApplyRecord",
        query: {
          jobCode: row.code
        }
      });
    },
    checkStateFormatter(val) {
      var val = vala.checkState;
      console.log([val, this.jobCheckStateList]);
      for (var i = 0; i < this.jobCheckStateList.length; i++) {
        if (this.jobCheckStateList[i].value == val) {
          return this.jobCheckStateList[i].label;
        }
      }
    },
    stateFormatter(vala) {
      var val = vala.state;
      console.log([val, this.jobStateList]);
      for (var i = 0; i < this.jobStateList.length; i++) {
        if (this.jobStateList[i].value == val) {
          return this.jobStateList[i].label;
        }
      }
    },
    getProjectStateList() {
      this.getProjectStateDict({}).then(response => {
        this.projectStateList = response.resBody;
      });
    },
    projectState(val) {
      var obj = this.projectStateList.find(item => {
        return item.value == val;
      });
      return obj.label;
    },
    insertJob() {
      this.$router.push({
        path: "/studyWork/publishJob"
      });
    },
    deleteJoba(row) {
      this.deleteJob({ id: row.id }).then(response => {
        this.getData();
        this.$message.success("删除成功");
      });
    },
    updateJob(row) {
      this.checkAllowJobUpdate({ jobId: row.id }).then(response => {
        if (response.resBody.allow) {
          //允许更新
          this.$router.push({
            path: "/studyWork/publishJob",
            query: {
              id: row.id
            }
          });
        } else {
          this.$message.error("当前岗位不允许更新");
        }
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
      okCheckJobState: store.namespace + "/okCheckJobState",
      noCheckJobState: store.namespace + "/noCheckJobState：store",
      completeUserPendingByItemId:
        store.namespace + "/completeUserPendingByItemId",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      queryMyJobList: store.namespace + "/queryJobByProjectId",
      queryJobProjectList: store.namespace + "/queryJobProjectList",
      getJobStateDict: store.namespace + "/getJobStateDict",
      checkAllowJobUpdate: store.namespace + "/checkAllowJobUpdate",
      deleteJob: store.namespace + "/deleteJob",
      getProjectStateDict: store.namespace + "/getProjectStateDict",
      getJobCheckStateDict: store.namespace + "/getJobCheckStateDict"
    }),
    getJobCheckStateList() {
      this.getJobCheckStateDict({}).then(response => {
        this.jobCheckStateList = response.resBody;
        this.jobCheckStateList.unshift({ label: "全部", value: "0" });
      });
    },
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        projectId: this.formInline.projectId,
        name: this.formInline.name,
        jobState: this.formInline.jobState,
        jobCheckState: this.formInline.jobCheckState
      };
      //查询数据的方法
      this.queryMyJobList(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    getProjectList() {
      this.queryJobProjectList({}).then(response => {
        this.projectList = response.resBody;
        this.projectList.unshift({ id: 0, name: "全部" });
      });
    },
    getJobStateList() {
      this.getJobStateDict({}).then(response => {
        this.jobStateList = response.resBody;
        this.jobStateList.unshift({ label: "全部", value: "0" });
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
        console.log(["dict", response]);
        this.getData();
        this.getJobCheckStateList();
        this.getProjectList();
        this.getJobStateList();
        this.getProjectStateList();
      });
    },

    onSubmit() {
      this.pageInfo.currentPage = 1;
      this.getData(this.projectId);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!to.query.projectId || !to.query.scopeId || !to.query.itemId) {
        vm.$message.error("参数错误");
      } else {
        vm.scopeId = to.query.scopeId;
        vm.itemId = to.query.itemId;
        vm.formInline.projectId = to.query.projectId;
        vm.getDict();
      }
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