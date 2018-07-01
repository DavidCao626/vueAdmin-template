<template>
  <page>
    <div slot="title">我的已完成待办</div>
    <div slot="panel">
      <template>
        <el-table class="i-cursor" :data="tableData" style="width: 100%">
          <el-table-column prop="projectData.project_name" label="项目名称" min-width="120">
          </el-table-column>
          <el-table-column prop="projectData.project_service_type_name" label="业务类别" min-width="100">
          </el-table-column>
          <!-- <el-table-column prop="scope_name" label="待办来源" min-width="80">
          </el-table-column> -->
          <el-table-column prop="pendingData.orgName" label="组织" min-width="80">
          </el-table-column>
          <el-table-column prop="pendingData.itemName" label="待办名称" min-width="80">
          </el-table-column>
          <!-- <el-table-column prop="real_start_time" label="开始时间" min-width="120">
          </el-table-column> -->
          <el-table-column prop="pendingData.completeTime" label="完成时间" :formatter="overTimeFormatter" min-width="120">
          </el-table-column>
          <!-- <el-table-column prop="create_time" label="创建时间" width="120">
          </el-table-column> -->
          <!-- <el-table-column prop="state" :formatter="stateFormatter" label="状态" min-width="80">
          </el-table-column> -->
          <el-table-column prop="completeTime.pendingType" :formatter="typeFormatter" label="类型" min-width="80">
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
import moment from "moment"
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
      queryPend: store.namespace + "/queryUserDonePending"
    }),
    showDetail(row, event, column) {
      console.log(row);
      if(row.pending_type == "Item"){
      this.$router.push({
        name: "项目控制台",
        params: {
          scopeId: row.scope_id
        }
      });
      }else{
        this.$router.push({
          path:row.action,
          quert:{
            'itemId':row.item_id
          }
        })
      }
    },
    typeFormatter(row, column, cellValue, index) {
      if(row.pending_type == "Item"){
        return "任务"
      }else{
        return "工序"
      }
    },
    stateFormatter(row, column, cellValue, index) {
      var list = this.stateList;
      for (var i = 0; i < list.length; i++) {
        if (cellValue == list[i].dict_key) {
          return list[i].dict_desc;
        }
      }
    },
    // overTimeFormatter(row, column, cellValue, index) {
    //   var date = cellValue;
    //   if (date == undefined) {
    //     return "";
    //   }
    //   return moment(date).format("YYYY-MM-DD HH:mm:ss");
    // },
     overTimeFormatter(row) {
      var date = row.pendingData.completeTime;
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
       //return date;
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
        console.log(["tableData", moment(this.tableData[0].over_time).format("YYYY-MM-DD HH:mm:ss")])
        this.dataTotal = response.resBody.pageInfo.totalRecord;
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.queryData();
    });
  },
  mounted() {
    //this.queryData();
  }
};
</script>
<style scoped>
/* .i-cursor:hover {
  cursor: pointer;
} */
</style>
