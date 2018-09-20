<template>
    <div>
        <page>
            <div slot="title">我的综测项目</div>
        </page>
        <elx-table-layout>
            <template slot="headerLeft">
                <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
                    <el-form-item label="项目名称">
                        <el-input v-model="formInline.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="学年">
                        <elx-select v-model="formInline.schoolYearId" placeholder="请选择">
                            <el-option v-for="item in schoolYearList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </elx-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="formInline.state" placeholder="请选择">
                            <el-option v-for="item in projectStateList" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </template>
            <el-table :data="data" style="width: 100%" border size="mini">
                <el-table-column prop="userCode" label="项目编码">
                </el-table-column>
                <el-table-column prop="name" label="项目名称">
                </el-table-column>
                <el-table-column prop="schoolYearName" label="学年">
                </el-table-column>
                <el-table-column prop="stuType" :formatter="stuTypeFormatter" label="学生类别">
                </el-table-column>
                <el-table-column prop="grade" :formatter="gradeFormatter" label="年级">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column prop="state" :formatter="stateFormatter" label="记录生成状态">
                </el-table-column>
                <el-table-column prop="startTime" label="记录生成开始时间">
                </el-table-column>
                <el-table-column prop="complateTime" label="记录生成完成时间">
                </el-table-column>
                <el-table-column label="操作" width="88" header-align="left" align="center">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button size="mini" @click="">
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-if="scope.row.state == 'ST' || scope.row.state == 'CO' " @click.native="showSchedule(scope.row)">查看进度</el-dropdown-item>
                                <el-dropdown-item v-else @click.native="createRecord(scope.row)">生成记录</el-dropdown-item>
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
        name: "",
        schoolYearId: 0,
        state: ""
      },
      orgProps: {
        label: "org_name",
        value: "org_code",
        children: "children"
      },
      orgList: [],
      data: [],
      schoolYearList: [],
      projectStateList: []
    };
  },
  watch: {},
  methods: {
    stateFormatter(r, c, v, i) {
      var arr = this.projectStateList;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].value == v) {
          return arr[i].label;
        }
      }
      return v;
    },
    stuTypeFormatter(r, c, v, i) {
      return v;
    },
    gradeFormatter(r, c, v, i) {
      return v;
    },
    showSchedule(row) {
        this.$router.push({
            path:"/zongce/appraisalResultRecord",
            query:{
                projectCode:row.code
            }
        })
    },
    createRecord(row) {
      this.processAppraisalRecord({ projectCode: row.code }).then(response => {
        this.$message.success("操作成功");
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
    getSchoolYearList() {
      this.schoolYearList = [];
      this.querySchoolYear({ currentPage: 1, pageSize: 99999 }).then(
        response => {
          this.schoolYearList = response.resBody.baseData;
          this.schoolYearList.unshift({ id: 0, name: "全部" });
        }
      );
    },
    ...mapActions({
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      queryProjectList: store.namespace + "/queryProjectList",
      processAppraisalRecord: store.namespace + "/processAppraisalRecord",
      getAppraisalProjectState: store.namespace + "/getAppraisalProjectState",
      querySchoolYear: store.namespace + "/querySchoolYear"
    }),
    getProjectStateList() {
      this.projectStateList = [];
      this.getAppraisalProjectState({}).then(response => {
        this.projectStateList = response.resBody;
        this.projectStateList.unshift({ value: "0", label: "全部" });
      });
    },
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        name: this.formInline.name,
        schoolYearId: this.formInline.schoolYearId,
        state: this.formInline.state
      };
      //查询数据的方法
      this.queryProjectList(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    onSubmit() {
      this.pageInfo.currentPage = 1;
      this.getData(this.projectId);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
      vm.getSchoolYearList();
      vm.getProjectStateList();
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