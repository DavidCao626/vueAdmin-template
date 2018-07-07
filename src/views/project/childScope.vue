<template>
  <page>
    <div slot="title">子环节</div>
    <div slot="panel">

      <template>
        <el-table class="i-cursor" @row-click="showDetail" :data="tableData" style="width: 100%">
          <template>
            <el-table-column prop="project.project_name" label="项目名称" min-width="150">
            </el-table-column>
            <el-table-column prop="project.project_service_type_name" label="业务类别" min-width="150">
            </el-table-column>
            <el-table-column prop="scope.scopeName" label="环节名称" min-width="150">
            </el-table-column>
            <el-table-column prop="scope.orgName" label="相关组织" min-width="150">
            </el-table-column>
            <el-table-column prop="scope.realStartTime" label="开始时间" min-width="150">
            </el-table-column>
            <el-table-column prop="scope.scopeState" :formatter="scopeStateFormatter" label="环节状态" min-width="150">
            </el-table-column>
          </template>
        </el-table>
      </template>

    </div>
  </page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import commons from "~/utils/common.js";
export default {
  data() {
    return {
      tableData: [],
      dataTotal: 0,
      pageSize: 10,
      scopeId: 0,
      currentPage: 1
    };
  },
  computed: {
    ...mapGetters({
      projectStateList: store.namespace + "/getProjectStateList"
    })
  },
  methods: {
    ...mapActions({
      getUserScope: store.namespace + "/getChildScope"
    }),
    showDetail(row, event, column) {
      this.$router.push({
        path: "/project/control",
        query: {
          scopeId: row.scope.id
        }
      });
    },
    scopeStateFormatter(row, column, cellValue, index) {
      if (cellValue == "S") {
        return "开始";
      }
      if (cellValue == "F") {
        return "完成";
      }
      if (cellValue == "C") {
        return "创建";
      }
    },
    searchData() {
      this.currentPage = 1;
      this.queryData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryData();
    },
    queryData() {
      if (
        this.scopeId == "" ||
        this.scopeId == undefined ||
        this.scopeId == null
      ) {
        this.$message.error("scopeId为空!");
        return;
      }

      var requestData = {
        scopeId: this.scopeId
      };
      this.getUserScope(requestData).then(response => {
        console.log(["response", response]);
        this.tableData = response.resBody.baseData;
        this.dataTotal = response.resBody.pageInfo.totalRecord;
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      var scopeId = commons.getRouterParam(to, "scopeId");
      vm.scopeId = scopeId;

      vm.queryData();
    });
  },
  mounted() {
    // this.queryData();
  }
};
</script>
<style scoped>
.i-cursor:hover {
  cursor: pointer;
}
</style>
