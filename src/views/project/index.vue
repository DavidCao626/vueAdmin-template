<template>
  <page>
    <div slot="title">我发起的项目</div>
    <div slot="panel">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="createdUserSystemCode" label="#编号" width="180">
          </el-table-column>
          <el-table-column prop="projectName" label="项目名称" width="180">
          </el-table-column>
          <el-table-column prop="createdTime" label="创建时间" width="180">
          </el-table-column>
          <el-table-column prop="projectState" label="项目状态" width="120">
          </el-table-column>
          <el-table-column prop="projectServiceType" label="项目类别" width="180">
          </el-table-column>
          <el-table-column prop="isSendPublicNotice" label="是否发送公告" >
          </el-table-column>
        </el-table>
      </template>

    </div>
  </page>
</template>
<script>
import { queryUserProject } from "~/api/project";

export default {
  mounted() {
    this.loadProjectList();
  },
  methods: {
    loadProjectList() {
      new Promise((resolve, reject) => {
        var requestData = {
          currentPage: 1,
          pageSize: 9999
        };
        queryUserProject().then(response => {
          console.log(["queryUserPending", response]);
          this.tableData = response.resBody.baseData;
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
