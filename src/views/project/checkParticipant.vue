<template>
  <div>
    <page>
      <div slot="title">参与者情况检查</div>
    </page>
    <elx-table-layout>
      <template slot="headerLeft">

        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" @click="reCheck">重新检查</el-button>
          </el-form-item>
        </el-form>
      </template>

      <el-table :data="data" style="width: 100%" border size="mini">
        <el-table-column prop="name" label="名称" width="100">
        </el-table-column>
        <el-table-column prop="type" label="类别" width="100">
        </el-table-column>
        <el-table-column prop="body" label="内容">
        </el-table-column>
      </el-table>

      <template slot="footer">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalRecord">
        </el-pagination>
      </template>
    </elx-table-layout>
    <page>
      <div slot="panel" style="text-align: right">
        <el-button size="mini" type="primary" @click="complate">继续任务</el-button>
        <el-button size="mini" type="primary" @click="stopScope">终止任务</el-button>
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
      scopeId: null,
      itemId: null,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      data: []
    };
  },
  watch: {},
  methods: {
    complate() {
      var requestData = {
        currentPage: 1,
        pageSize: 99999,
        scopeId: this.scopeId
      };
      //查询数据的方法
      this.queryParticipantRules(requestData).then(response => {
        var n = response.resBody.baseData;
        for (var i = 0; i < n.length; i++) {
          if (n.type == "提示") {
            this.$message.error(
              "存在提示信息，无法继续任务,请处理后再继续任务"
            );
            return;
          }
        }
        this.completeUserPendingByItemId({ itemId: this.itemId }).then(
          response => {
            this.$router.push({
              path: "/project/control",
              query: { scopeId: this.scopeId }
            });
          }
        );
      });
    },
    stopScope() {
      this.toStopScope({ scopeId: this.scopeId, itemId: this.itemId }).then(
        response => {
          this.$router.push({
            path: "/project/control",
            query: { scopeId: this.scopeId }
          });
        }
      );
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
      toStopScope: store.namespace + "/stopScope",
      queryParticipantRules: store.namespace + "/queryParticipantRules",
      checkParticipantRules: store.namespace + "/checkParticipantRules",
      completeUserPendingByItemId:
        store.namespace + "/completeUserPendingByItemId"
    }),
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        scopeId: this.scopeId
      };
      //查询数据的方法
      this.queryParticipantRules(requestData).then(response => {
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    reCheck() {
      this.checkParticipantRules({ scopeId: this.scopeId }).then(response => {
        this.getData();
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!to.query.scopeId || !to.query.itemId) {
        vm.$message.error("参数不正确");
        return;
      }
      vm.scopeId = to.query.scopeId;
      vm.itemId = to.query.itemId;
      vm.getData();
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