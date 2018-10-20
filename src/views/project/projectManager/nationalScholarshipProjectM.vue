<template>
  <div>
    <page>
      <div slot="title">国家奖学金项目管理</div>
    </page>
    <elx-table-layout>
      <template slot="headerRight">
        <el-button-group>
          <el-tooltip class="item" effect="dark" content="新建项目" placement="bottom">
            <el-button @click="createProject" plain size="mini">
              新建
            </el-button>
          </el-tooltip>
        </el-button-group>
      </template>
      <template slot="headerLeft">

        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="项目名称">
            <el-input v-model="formInline.name" placeholder="项目名称"></el-input>
          </el-form-item>
          <el-form-item label="学年">
            <el-select v-model="formInline.yearType" placeholder="请选择" no-data-text="无数据,请尝试刷新页面">
              <el-option v-for="item in yearTypeList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.state" placeholder="项目状态">
              <el-option v-for="(item,index) in projectStateList" :key="index" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <el-table :data="data" style="width: 100%" border size="mini">
        <!-- <el-table-column prop="user_code" label="编码">
        </el-table-column> -->
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="school_year_name" label="学年">
        </el-table-column>
        <el-table-column prop="grade" label="年级" :formatter="gradeFormatter">
        </el-table-column>
        <el-table-column prop="stu_type" label="学生类型" :formatter="stuTypeFormatter">
        </el-table-column>
        <el-table-column prop="state" label="状态" :formatter="stateFormatter">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
        </el-table-column>
        <!-- <el-table-column label="操作" width="88" header-align="left" align="center">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button size="mini" @click="">
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="showProspectus(scope.row)">查阅计划书</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column> -->
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
        yearType: 0,
        name: "",
        state: "0"
      },
      yearTypeList: [],
      data: [],
      projectStateList: [],
      stuTypeList: [],
      gradeList: []
    };
  },
  watch: {},
  methods: {
    gradeFormatter(r, c, v, i) {
      if (v == null || v.length == 0) {
        return;
      }
      var stArr = v.split(",");
      var a = "";
      stArr.forEach(it => {
        this.gradeList.forEach(p => {
          if (p.dict_key == it) {
            a = a + p.dict_desc + ",";
            return;
          }
        });
      });
      a = a.substring(0, a.length - 1);
      return a;
    },
    stuTypeFormatter(r, c, v, i) {
      if (v == null || v.length == 0) {
        return;
      }
      var stArr = v.split(",");
      var a = "";
      stArr.forEach(it => {
        this.stuTypeList.forEach(p => {
          if (p.dict_key == it) {
            a = a + p.dict_desc + ",";
            return;
          }
        });
      });
      a = a.substring(0, a.length - 1);
      return a;
    },
    getSchoolYearList() {
      this.querySchoolYear({ currentPage: 1, pageSize: 99999 }).then(
        response => {
          this.yearTypeList = response.resBody.baseData;
          this.yearTypeList.unshift({ id: 0, name: "全部 " });
        }
      );
    },
    stateFormatter(r, c, v, i) {
      var arr = this.projectStateList;
      for (var j = 0; j < arr.length; j++) {
        if (arr[j].value == v) {
          return arr[j].label;
        }
      }
    },
    getProjectState() {
      this.querySubsidizeProjectState({}).then(response => {
        this.projectStateList = [];
        this.projectStateList = response.resBody;
        this.projectStateList.unshift({ label: "全部", value: "0" });
      });
    },
    createProject() {
      this.$router.push({
        path: "/project/nationalScholarship"
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
      queryPovertyProject: store.namespace + "/queryNationalScholarshipProject",
      querySchoolYear: store.namespace + "/querySchoolYear",
      querySubsidizeProjectState:
        store.namespace + "/querySubsidizeProjectState"
    }),
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        name: this.formInline.name,
        yearType: this.formInline.yearType,
        state: this.formInline.state
      };
      //查询数据的方法
      this.queryPovertyProject(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    getDict() {
      var requestData = {
        dicts: ["study_degree_code", "grade"]
      };
      this.getDictByDictNames(requestData).then(response => {
        this.gradeList = response.resBody.grade;
        this.stuTypeList = response.resBody.study_degree_code;
        this.getData();
      });
    },
    onSubmit() {
      this.pageInfo.currentPage = 1;
      this.getData();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getDict();
      vm.getSchoolYearList();
      vm.getProjectState();
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