<template>
    <div>
        <page>
            <div slot="title">励志奖学金项目管理</div>
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
                    <el-form-item label="年度">
                        <el-select v-model="formInline.yearType" placeholder="请选择" no-data-text="无数据,请尝试刷新页面">
                            <el-option v-for="item in yearTypeList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="formInline.state" placeholder="项目状态">
                            <el-option v-for="(item,index) in projectStateList" :key="index" :value="item.dict_key" :label="item.dict_desc"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </template>
            <el-table :data="data" style="width: 100%" border size="mini">
                <el-table-column prop="project_name" label="名称">
                </el-table-column>
                <el-table-column prop="year_type" label="年度">
                </el-table-column>
                <el-table-column prop="plan_start_time" label="计划开始时间">
                </el-table-column>
                <el-table-column prop="plan_complete_time" label="计划结束时间">
                </el-table-column>
                <el-table-column prop="project_state" label="状态" :formatter="stateFormatter">
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
        yearType: "0",
        name: "",
        state: "0"
      },
      orgProps: {
        label: "org_name",
        value: "org_code",
        children: "children"
      },
      yearTypeList: [],
      data: [],
      projectStateList: []
    };
  },
  watch: {},
  methods: {
    stateFormatter(r, c, v, i) {
      for (var j = 0; j < this.projectStateList.length; j++) {
        if (this.projectStateList[j].dict_key == v) {
          return this.projectStateList[j].dict_desc;
        }
      }
    },
    createYearTypeList() {
      this.yearTypeList = [];
      for (var i = 2000; i < 2050; i++) {
        var temp = {
          label: i + "年",
          value: i.toString()
        };
        this.yearTypeList.push(temp);
      }
      this.yearTypeList.unshift({ label: "不限", value: "0" });
    },
    createProject() {
      this.$router.push({
        path: "/project/motivationalScholarship"
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
      getProjectStateList: store.namespace + "/getProjectStateList",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      queryPovertyProject: store.namespace + "/queryMotivationalScholarshipProject"
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
        dicts: ["project_state"]
      };
      this.createYearTypeList();
      this.getDictByDictNames(requestData).then(response => {
        this.projectStateList = response.resBody.project_state;
        this.projectStateList.unshift({ dict_desc: "全部", dict_key: "0" });
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