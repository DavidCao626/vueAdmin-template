<template>
  <div>
    <page>
      <div slot="title">我的测评排名</div>
    </page>
    <elx-table-layout>
      <template slot="headerLeft">

        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="项目">
            <el-select v-model="formInline.projectId" placeholder="项目">
              <el-option v-for="item in projectList" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <el-table :data="data" style="width: 100%" border size="mini">
        <el-table-column prop="targetId" label="学号">
        </el-table-column>
        <el-table-column prop="targetName" label="学生名称">
        </el-table-column>
        <el-table-column prop="targetOrgName" label="学生机构">
        </el-table-column>
        <el-table-column prop="scoreValue" label="得分值">
        </el-table-column>
        <el-table-column prop="rank" label="排名">
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
        projectId: 0
      },
      orgProps: {
         label: "orgName",
        value: "orgCode",
        children: "children"
      },
      projectList: [],
      orgList: [],
      data: []
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
      queryAllAppraiseProject: store.namespace + "/queryAllAppraiseProject",
      queryStuRank: store.namespace + "/queryStuRank"
    }),
    getProjectList() {
      this.queryAllAppraiseProject({}).then(response => {
        this.projectList = response.resBody;
        this.projectList.unshift({ id: 0, name: "全部" });
      });
    },
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        projectId: this.formInline.projectId
      };
      //查询数据的方法
      this.queryStuRank(requestData).then(response => {
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
        this.getProjectList();
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