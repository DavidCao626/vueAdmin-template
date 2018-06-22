<template>
  <page>
    <div slot="title">我的待办</div>
    <div slot="panel">
      <template>
        <el-table class="i-cursor" @row-click="showDetail" :data="tableData" style="width: 100%">
          <el-table-column prop="projectInfo.project_name" label="项目名称" min-width="120">
          </el-table-column>
          <el-table-column prop="projectInfo.project_service_type_name" label="业务类别" min-width="100">
          </el-table-column>
          <el-table-column prop="scope_name" label="代办来源" min-width="80">
          </el-table-column>
          <el-table-column prop="item_name" label="代办名称" min-width="80">
          </el-table-column>
          <el-table-column prop="real_start_time" label="开始时间" min-width="120">
          </el-table-column>
          <el-table-column prop="over_time" label="结束时间" min-width="120">
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="120">
          </el-table-column>
          <el-table-column prop="state" :formatter="stateFormatter" label="状态" min-width="80">
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
          </el-pagination>
          <div class="clearfix"></div>
        </div>
      </template>
    </div>
  </page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
export default {
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
        }
      ],
      dataTotal: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  computed: {
    ...mapGetters({
      stateList: store.namespace + "/getTodoState"
    })
  },
  methods: {
    ...mapActions({
      queryPend: store.namespace + "/queryUserPending"
    }),
    showDetail(row, event, column) {
      console.log(row);
      this.$router.push({
        name: "项目控制台",
        params: {}
      });
    },
    stateFormatter(row, column, cellValue, index) {
      var list = this.stateList;
      for (var i = 0; i < list.length; i++) {
        if (cellValue == list[i].dict_key) {
          return list[i].dict_desc;
        }
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      //执行查询
      this.queryData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //执行查询
      this.queryData();
    },
    queryData() {
      var requestData = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      this.queryPend(requestData).then(response => {
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
<style scoped>
.i-cursor:hover {
  cursor: pointer;
}
</style>
