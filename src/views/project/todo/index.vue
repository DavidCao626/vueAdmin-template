<template>
  <page>
    <div slot="title">我的待办</div>
    <div slot="panel">
      <template>
        <el-table :data="tableData" style="width: 100%" @row-click="clickRow">
          <el-table-column prop="pendingNo" label="#编号">
          </el-table-column>
          <el-table-column prop="scopeName" label="域名称" width="120">
          </el-table-column>
          <el-table-column prop="orgName" label="组织名称" width="180">
          </el-table-column>
          <el-table-column prop="itemName" label="工作项" width="180">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="180">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="120">
          </el-table-column>
        </el-table>
      </template>

    </div>
  </page>
</template>
<script>
import { queryUserPending, getProjectByCode } from "~/api/project";

export default {
  mounted() {
    this.queryUserPending();
  },
  methods: {
    clickRow(row, event) {
      console.log(["row", row]);
      console.log(["event", event]);
      var scopeId = row.scopeId;
      var requestData = {
        code: row.serviceOrderNo
      };
      new Promise((resolve, reject) => {
        getProjectByCode(requestData).then(response => {
          console.log(["queryUserPending", response]);
          this.tableData = response.resBody;
          var projectId = response.resBody.id;
          this.$router.push({
            path: row.action,
            query: {
              scopeId: scopeId,
              projectId: projectId,
              pendId:row.id
            }
          });
        });
      });
    },
    queryUserPending() {
      new Promise((resolve, reject) => {
        queryUserPending().then(response => {
          console.log(["queryUserPending", response]);
          this.tableData = response.resBody;
        });
      });
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "#1",
          name: "2018年贫困建档",
          type: "贫困建档",
          node: "学校汇总",
          days: 35,
          days2: 3
        },
        {
          date: "#2",
          name: "2018年贫困建档",
          type: "贫困建档",
          node: "学校汇总",
          days: 35,
          days2: 3
        },
        {
          date: "#3",
          name: "2018年贫困建档",
          type: "贫困建档",
          node: "学校汇总",
          days: 35,
          days2: 3
        },
        {
          date: "#4",
          name: "2018年贫困建档",
          type: "贫困建档",
          node: "学校汇总",
          days: 35,
          days2: 3
        },
        {
          date: "#5",
          name: "2018年贫困建档",
          type: "贫困建档",
          node: "学校汇总",
          days: 35,
          days2: 3
        }
      ]
    };
  }
};
</script>
<style scoped>
</style>
