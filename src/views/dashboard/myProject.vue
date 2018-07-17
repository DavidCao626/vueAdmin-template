<template>
  <el-table class="i-cursor" @row-click="showDetail" :data="tableData" style="width: 100%">
    <template>
      <el-table-column prop="project.project_name" label="项目名称" min-width="180">
      </el-table-column>
      <el-table-column prop="isMine" :formatter="isMineFormatter" label="来源" min-width="180">
      </el-table-column>
      <el-table-column prop="project.project_service_type_name" label="业务类别" min-width="150">
      </el-table-column>
      <!-- <el-table-column prop="scope.scopeName" label="环节名称" min-width="150">
      </el-table-column>
      <el-table-column prop="scope.orgName" label="相关组织" min-width="150">
      </el-table-column> -->
      <el-table-column prop="scope.realStartTime" :formatter="startFormatter" label="开始时间" min-width="150">
      </el-table-column>
      <el-table-column prop="scope.scopeState" :formatter="scopeStateFormatter" label="环节状态" min-width="150">
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    startFormatter(row, column, cellValue, index) {
      return moment(cellValue, "yyyy-MM-DD HH:mm:ss").format("MM-DD HH:mm");
    },
    ...mapActions({
      getUserScope: "getUserScope"
    }),
    scopeStateFormatter(row, column, cellValue, index) {
      if (cellValue == "S") {
        return "已开始";
      }
      if (cellValue == "F") {
        return "已完成";
      }
      if (cellValue == "C") {
        return "已创建";
      }
    },
    isMineFormatter(row, column, cellValue, index){
      if(cellValue=="Y"){
        return "我发起的"
      }else{
        return "发给我的"
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
