<template>
  <div>
    <page>
      <div slot="title">岗位申请</div>
    </page>
    <elx-table-layout>
      <template slot="headerLeft">

        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <!-- <el-form-item label="所属项目">
            <el-select v-model="formInline.projectId" placeholder="项目">
              <el-option v-for="(item,index) in projectList" :key="index" :value="item.id" :label="item.name"> -->
                <!-- <span style="float: left">{{ item.label }}</span> -->
                <!-- <span style="float: right; color: #8492a6; font-size: 13px" v-html="projectState(item.state)"></span> -->
              <!-- </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="机构">
            <el-select v-model="formInline.orgCode" placeholder="请选择" no-data-text="暂无可申请岗位">
              <el-option v-for="(item,index) in orgList" :key="index" :label="item.org_name" :value="item.org_code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位状态">
            <el-select v-model="formInline.jobState" placeholder="岗位状态">
              <el-option v-for="item in jobStateList" :key="item.value" :value="item.value" :label="item.label"></el-option>
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
      <el-table :data="data" style="width: 100%" border size="mini">
        <el-table-column prop="name" label="岗位名称">
        </el-table-column>
        <el-table-column prop="numbers" label="招聘名额">
        </el-table-column>
        <el-table-column prop="state" label="岗位状态" :formatter="stateFormatter">
        </el-table-column>
        <el-table-column prop="applyNum" label="申请人数">
        </el-table-column>
        <el-table-column prop="noDisposeNum" label="录用人数">
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
                <el-dropdown-item @click.native="apply(scope.row)">申请</el-dropdown-item>
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

    <el-dialog title="请选择" :visible.sync="applyDV">
      <el-form :model="applyFormData">
        <el-form-item label="简历">
          <el-select v-model="applyFormData.resumeId" placeholder="请选择">
            <el-option v-for="item in resumeList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="applyDV = false">取 消</el-button>
        <el-button type="primary" @click="applySubmit">确 定</el-button>
      </div>
    </el-dialog>

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
      applyDV: false,
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
        projectId: null,
        name: "",
        jobState: "",
        orgCode:""
      },
      orgProps: {
        label: "org_name",
        value: "org_code",
        children: "children"
      },
      applyFormData: {
        jobCode: "",
        resumeId: null
      },
      orgList: [],
      data: [],
      resumeList: []
    };
  },
  watch: {},
  methods: {
    apply(row) {
      //岗位申请
      this.applyDV = true;
      this.applyFormData.jobCode = row.code;
    },
    applySubmit() {
      this.insertApplyRecord(this.applyFormData).then(response => {
        this.$message.success("申请成功");
        this.getData();
        this.applyDV = false;
      });
    },
    showRecord(row) {
      this.$router.push({
        path: "/studyWork/jobApplyRecord",
        query: {
          jobCode: row.code
        }
      });
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
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      queryMyJobList: store.namespace + "/queryJobList",
      queryJobProjectList: store.namespace + "/queryNoEndProejct",
      getJobStateDict: store.namespace + "/getJobStateDict",
      checkAllowJobUpdate: store.namespace + "/checkAllowJobUpdate",
      deleteJob: store.namespace + "/deleteJob",
      getProjectStateDict: store.namespace + "/getProjectStateDict",
      insertApplyRecord: store.namespace + "/insertApplyRecord",
      queryUserResume: store.namespace + "/queryUserResume",
      queryCanApplyJobOrg:store.namespace + "/queryCanApplyJobOrg"
    }),
    getResumeList() {
      var requestData = {
        currentPage: 1,
        pageSize: 99999
      };
      this.queryUserResume(requestData).then(response => {
        this.resumeList = response.resBody.baseData;
      });
    },
    getData() {
      if(this.formInline.orgCode == null ||this.formInline.orgCode == ''){
        this.$message.error("请选择一个机构");
        return;
      }
      var requestData = { 
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        projectId: this.formInline.projectId,
        name: this.formInline.name,
        jobState: this.formInline.jobState,
        orgCode:this.formInline.orgCode
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
      });
    },
    getJobStateList() {
      this.getJobStateDict({}).then(response => {
        this.jobStateList = response.resBody;
        this.jobStateList.unshift({ label: "全部", value: "0" });
      });
    },
    getOrgList() {
      this.queryCanApplyJobOrg({}).then(response => {
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
        // this.getData();
        this.getOrgList();
        this.getProjectList();
        this.getJobStateList();
        this.getProjectStateList();
        this.getResumeList();
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