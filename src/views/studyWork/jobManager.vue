<template>
  <page>
    <div slot="title">岗位管理</div>
    <div slot="panel">
      <elx-table-layout>
        <template slot="headerRight">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="发布岗位" placement="bottom">
              <el-button @click="insertJob" plain size="mini">
                发布岗位
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导入岗位" placement="bottom">
              <el-button @click="importJobBT" plain size="mini">
                导入岗位
              </el-button>
            </el-tooltip>
          </el-button-group>
        </template>
        <template slot="headerLeft">

          <el-form :inline="true" label-position="right" label-width="120px" :model="formInline" size="mini" class="demo-form-inline">
            <el-form-item label="所属项目:">
              <el-select v-model="formInline.projectId" placeholder="项目">
                <el-option v-for="(item,index) in projectList" :key="index" :value="item.id" :label="item.name">
                  <!-- <span style="float: left">{{ item.label }}</span> -->
                  <!-- <span style="float: right; color: #8492a6; font-size: 13px" v-html="projectState(item.state)"></span> -->
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="岗位状态:">
              <el-select v-model="formInline.jobState" placeholder="岗位状态">
                <el-option v-for="item in jobStateList" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核状态:">
              <el-select v-model="formInline.jobCheckState" placeholder="岗位状态">
                <el-option v-for="item in jobCheckStateList" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="岗位名称:">
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
          <el-table-column prop="checkState" label="审核状态" :formatter="checkStateFormatter">
          </el-table-column>
          <el-table-column prop="jobDemand" label="岗位要求">
          </el-table-column>
          <el-table-column prop="workTime" label="工作时间要求">
          </el-table-column>
          <el-table-column prop="monthWorkload" label="月工作时间">
          </el-table-column>
          <el-table-column prop="jobType" :formatter="jobTypeFormatter" label="岗位类型">
          </el-table-column>
          <el-table-column prop="applyNum" label="申请人数">
          </el-table-column>
          <el-table-column prop="noDisposeNum" label="录用人数">
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
                  <el-dropdown-item @click.native="updateJob(scope.row)">更新</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteJoba(scope.row)">删除</el-dropdown-item>
                  <el-dropdown-item @click.native="showRecord(scope.row)">查看申请</el-dropdown-item>
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

      <el-dialog title="导入岗位" :visible.sync="importDV">
        <el-form :model="formData">
          <el-form-item label="项目">
            <elx-select v-model="formData.projectId" placeholder="" @change="projectChange">
              <el-option v-for="item in projectList2" :key="item.id" :obj="item" :value="item.id" :label="item.name"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="文件上传">
            <br />
            <el-upload class="upload-demo" ref="upload" :action="importJobUrl" :limit='1' :onSuccess="onUploadSuccess2">
              <el-button size="small" type="primary" plain>
                <i class="el-icon-upload"></i> 点击上传文件</el-button>
              <div class="el-upload__tip" slot="tip">只能上传xlx/xlsx</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <a :href="templateUrl" style="color:blue" target='_blank'>
            模板下载
          </a>
          <el-button @click="importDV = false">取 消</el-button>
          <el-button type="primary" @click="importSubmit">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </page>
</template>

  <script>
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";

const importJobUrl = process.env.BASE_API + "/public/uploadJobFile.do";

Vue.use(Element);
export default {
  data() {
    return {
      importJobUrl: importJobUrl,
      projectList2: [], //导入岗位时选择
      formData: {
        id: 0,
        projectId: null,
        projectCode: "",
        fileId: 0
      },
      importDV: false,

      insertJobDV: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      templateUrl: "",
      jobStateList: [],
      projectList: [],
      projectStateList: [],
      formInline: {
        projectId: 0,
        name: "",
        jobState: "",
        jobCheckState: ""
      },
      orgProps: {
        label: "orgName",
        value: "orgCode",
        children: "children"
      },
      orgList: [],
      data: [],
      jobCheckStateList: []
    };
  },
  watch: {},
  methods: {
    onUploadSuccess2(response, file, fileList) {
      this.formData.fileId = response.body.resBody.fileId;
    },
    importSubmit() {
      this.importDV = false;

      if (!this.formData.fileId) {
        return this.$message.error("请先上传数据文件！");
      }
      this.$confirm(
        "此操作将在后台执行导入任务, 稍后您可以凭借任务单号查看导入结果",
        "提示",
        {
          confirmButtonText: "知道了",
          cancelButtonText: "取消操作",
          type: "warning"
        }
      ).then(() => {
        this.importJob({
          fileId: this.formData.fileId,
          projectId: this.formData.projectId,
          projectCode: this.formData.projectCode
        }).then(response => {
          this.dialogVisible = false;
          this.$refs["upload"].clearFiles();
          this.$notify({
            title: "后台任务提醒",
            message: "任务单号:" + response.resBody.batch + ",已创建。",
            duration: 0,
            type: "info",
            dangerouslyUseHTMLString: true
          });
        });
      });
    },
    importJobBT() {
      if(this.projectList2.length == 0){
        this.$message.error("当前不存在可发布岗位的勤工俭学项目")
        return;
      }

      this.importDV = true;
    },
    jobTypeFormatter(r, c, v, i) {
      if (v == "NB") {
        return "学院内部";
      } else if (v == "XJ") {
        return "校级岗位";
      } else {
        return v;
      }
    },
    projectChange(val, vueCom, obj) {
      this.formData.projectCode = obj.obj.code;
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
      var val = val.checkState;
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
        path: "/studyWork/insertJob"
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
      importJob: store.namespace + "/importJob",
      queryAllowPublishJobProject:
        store.namespace + "/queryAllowPublishJobProject",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      queryMyJobList: store.namespace + "/queryMyJobList",
      queryJobProjectList: store.namespace + "/queryJobProjectList",
      getJobStateDict: store.namespace + "/getJobStateDict",
      checkAllowJobUpdate: store.namespace + "/checkAllowJobUpdate",
      deleteJob: store.namespace + "/deleteJob",
      getProjectStateDict: store.namespace + "/getProjectStateDict",
      getJobCheckStateDict: store.namespace + "/getJobCheckStateDict",
      getJobTemplateUrl: store.namespace + "/getJobTemplateUrl"
    }),
    getJobCheckStateList() {
      this.getJobCheckStateDict({}).then(response => {
        this.jobCheckStateList = response.resBody;
        this.jobCheckStateList.unshift({ label: "全部", value: "0" });
      });
    },
    getProjectList2() {
      this.queryAllowPublishJobProject({}).then(response => {
        this.projectList2 = response.resBody;
      });
    },
    getUrl() {
      this.getJobTemplateUrl({}).then(r => {
        this.templateUrl = r.resBody.url;
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
      vm.getProjectList2();
      vm.getDict();
      vm.getUrl();
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