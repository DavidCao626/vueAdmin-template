<template>
    <div>
        <page>
            <div slot="title">学院完成情况</div>
        </page>
        <elx-table-layout>
            <el-table :data="data" style="width: 100%" border size="mini">
                <el-table-column prop="scope.orgName" label="学院名称">
                </el-table-column>
                <el-table-column prop="config" :formatter="configFormatter" label="完成情况">
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
        <page>
            <div slot="panel" style="text-align: right">
                <el-button size="mini" type="primary" @click="complate">完成</el-button>
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
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      data: [],
      scopeId: 0,
      itemId: 0,
      projectCode: ""
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
    configFormatter(r, c, v, i) {
      if (v == null) {
        return "未完成";
      } else {
        return "已完成";
      }
    },
    ...mapActions({
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      queryConfigList: store.namespace + "/queryConfigList",
      completeUserPendingByItemId:
        store.namespace + "/completeUserPendingByItemId"
    }),
    complate() {
      this.completeUserPendingByItemId({ itemId: this.itemId }).then(
        response => {
          this.$message.success("操作成功");
          this.$router.go(-1);
        }
      );
    },
    getData() {
      var requestData = {
        scopeId: this.scopeId,
        projectCode: this.projectCode,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      //查询数据的方法
      this.queryConfigList(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    getDict() {
      var requestData = {
        dicts: ["nation"]
      };
      this.getDictByDictNames(requestData).then(response => {
        this.getData();
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!to.query.scopeId || !to.query.itemId || !to.query.projectCode) {
        vm.$message.error("参数不正确");
      }
      vm.scopeId = to.query.scopeId;
      vm.itemId = to.query.itemId;
      vm.projectCode = to.query.projectCode;
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