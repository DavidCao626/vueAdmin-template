<template>
  <page>
    <div slot="title">简历管理</div>
    <div slot="panel">
      <elx-table-layout>
        <template slot="headerRight">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="新增简历" placement="bottom">
              <el-button @click="insertResume" plain size="mini">
                新增简历
              </el-button>
            </el-tooltip>
          </el-button-group>
        </template>
        <el-table :data="data" style="width: 100%" border size="mini">
          <el-table-column prop="name" label="简历名称">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column prop="lastUpdateTime" label="最后修改时间">
          </el-table-column>
          <el-table-column label="操作" width="88" header-align="left" align="center">
            <template slot-scope="scope">
              <el-dropdown>
                <el-button size="mini" @click="">
                  <i class="el-icon-arrow-down"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="updateResume(scope.row)">更新</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteResumex(scope.row)">删除</el-dropdown-item>
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
  </page>
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
      orgProps: {
        label: "orgName",
        value: "orgCode",
        children: "children"
      },

      orgList: [],
      data: []
    };
  },
  watch: {},
  methods: {
    insertResume() {
      //新增简历
      this.$router.push({
        path: "/studyWork/resumeDetail"
      });
    },
    updateResume(row) {
      //更新简历
      this.$router.push({
        path: "/studyWork/resumeDetail",
        query: {
          id: row.id
        }
      });
    },
    deleteResumex(row) {
      //删除简历
      this.deleteResume({ id: row.id }).then(resposne => {
        this.getData();
        this.$message.success("删除成功");
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
      queryUserResume: store.namespace + "/queryUserResume",
      deleteResume: store.namespace + "/deleteResume"
    }),
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      //查询数据的方法
      this.queryUserResume(requestData).then(response => {
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