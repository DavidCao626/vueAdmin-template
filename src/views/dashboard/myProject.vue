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

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    ...mapActions({
      getUserScope: "getUserScope"
    }),
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
    showDetail(row, event, column) {
      this.$router.push({
        path: "/project/control",
        query: {
          scopeId: row.scope.id
        }
      });
    },
    queryData() {
      console.log(["queryData", this]);
      this.getUserScope().then(response => {
        console.log(["response", response]);
        this.tableData = response.resBody.baseData;
        this.dataTotal = response.resBody.pageInfo.totalRecord;
      });
    }
  },
  mounted() {
    this.queryData();
  }
};
</script>

<style>
.i-cursor:hover {
  cursor: pointer;
}
</style>
