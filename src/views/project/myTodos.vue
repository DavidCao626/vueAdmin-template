<template>
  <page>
    <div slot="title">我的待办</div>
    <div slot="panel">
      <template>

        <el-form :inline="true" :model="searchData" class="demo-form-inline" size="mini">
          <el-form-item label="状态">
            <el-select v-model="searchData.state" placeholder="请选择状态">
              <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="searchData.type" placeholder="请选择类型">
              <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查 询</el-button>
          </el-form-item>
        </el-form>

        <el-table class="i-cursor" @row-click="showDetail" :data="tableData" style="width: 100%">
          <el-table-column prop="projectInfo.project_name" label="项目名称" min-width="120">
          </el-table-column>
          <el-table-column prop="projectInfo.project_service_type_name" label="业务类别" min-width="100">
          </el-table-column>
          <!-- <el-table-column prop="scope_name" label="待办来源" min-width="80">
          </el-table-column> -->
          <el-table-column prop="org_name" label="组织" min-width="80">
          </el-table-column>
          <el-table-column prop="item_name" label="待办名称" min-width="80">
          </el-table-column>
          <!-- <el-table-column prop="real_start_time" label="开始时间" min-width="120">
          </el-table-column> -->
          <el-table-column prop="over_time" label="结束时间" :formatter="overTimeFormatter" min-width="120">
            <template slot-scope="scope">
              <span v-html="overTimeFormatter(scope.row)"></span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="create_time" label="创建时间" width="120">
          </el-table-column> -->
          <el-table-column prop="state" :formatter="stateFormatter" label="状态" min-width="80">
          </el-table-column>
          <el-table-column prop="pending_type" :formatter="typeFormatter" label="类型" min-width="80">
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
import moment from "moment";
export default {
  data() {
    return {
      searchData: {
        state: "A",
        type: "A"
      },
      stateList: [
        { label: "全部", value: "A" },
        { label: "已处理", value: "F" },
        { label: "未处理", value: "N" }
      ],
      typeList  : [
        { label: "全部", value: "A" },
        { label: "工序", value: "Popular" },
        { label: "任务", value: "Item" }
      ],
      tableData: [
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
    onSearch() {
      this.currentPage = 1;
      this.queryData();
    },
    showDetail(row, event, column) {
      console.log(row);
      if (row.pending_type == "Item") {
        this.$router.push({
          name: "项目控制台",
          params: {
            scopeId: row.scope_id
          }
        });
      } else {
        this.$router.push({
          path: row.action,
          quert: {
            itemId: row.item_id,
            scopeId: row.scope_id
          }
        });
      }
    },
    typeFormatter(row, column, cellValue, index) {
      if (row.pending_type == "Item") {
        return "任务";
      } else {
        return "工序";
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
      var date = row.over_time;
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
        pageSize: this.pageSize,
        type: this.searchData.type,
        state: this.searchData.state
      };
      this.queryPend(requestData).then(response => {
        this.tableData = response.resBody.baseData;
        console.log([
          "tableData",
          moment(this.tableData[0].over_time).format("YYYY-MM-DD HH:mm:ss")
        ]);
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
.i-cursor:hover {
  cursor: pointer;
}
</style>
