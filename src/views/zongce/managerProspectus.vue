<template>
    <div>
        <page>
            <div slot="title">测评计划书管理</div>
        </page>
        <elx-table-layout>
            <!-- <template slot="headerRight">
        <el-button-group>
          <el-tooltip class="item" effect="dark" content="录入数据" placement="bottom">
            <el-button @click="dialogVisible = true" plain size="mini">
              导入
            </el-button>
          </el-tooltip>
        </el-button-group>
      </template> -->
            <template slot="headerLeft">

                <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
                    <el-form-item label="项目">
                        <el-select v-model="formInline.projectId" placeholder="请选择项目">
                            <el-option v-for="(item,index) in projectList" :key="index" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="组织">
                        <el-select v-model="formInline.orgCode" placeholder="请选择组织">
                            <el-option v-for="(item,index) in porgList" :key="index" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="方案名称">
                        <el-input v-model="formInline.name" placeholder="计划书使用的方案名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </template>

            <el-table :data="data" style="width: 100%" border size="mini">
                <el-table-column prop="schemeName" label="使用的方案">
                </el-table-column>
                <el-table-column prop="orgName" label="所属组织">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <!-- <el-table-column label="操作" width="88" header-align="left" align="center">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button size="mini" @click="">
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="getData(scope.row)">更新</el-dropdown-item>
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
        projectId: null,
        orgCode: "0",
        name: ""
      },
      orgProps: {
        label: "org_name",
        value: "org_code",
        children: "children"
      },

      orgList: [],
      data: [],
      porgList: [],
      projectList: []
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
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      getProsepectusOrgList: store.namespace + "/getProsepectusOrgList",
      queryProspectusStrict: store.namespace + "/queryProspectusStrict",
      getStudentApplyProject: store.namespace + "/getStudentApplyProject"
    }),
    getProjectList() {
      this.getStudentApplyProject({}).then(response => {
        this.projectList = response.resBody;
      });
    },
    getProsepectusOrg() {
      this.getProsepectusOrgList({}).then(response => {
        this.porgList = response.resBody;
        this.porgList.unshift({ label: "全部", value: "0" });
      });
    },
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        projectId: this.formInline.projectId,
        orgCode: this.formInline.orgCode,
        name: this.formInline.name
      };
      //查询数据的方法
      this.queryProspectusStrict(requestData).then(response => {
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
        //this.getData();
        this.getProsepectusOrg();
        this.getProjectList();
      });
    },

    onSubmit() {
      if (!this.formInline.projectId) {
        this.$message.error("请选择项目后查询");
        return;
      }
      this.pageInfo.currentPage = 1;
      this.getData();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.projectId) {
        vm.formInline.projectId = to.query.projectId;
        vm.getData();
      }
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