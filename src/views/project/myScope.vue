<template>
  <page>
    <div slot="title">与我相关</div>
    <div slot="panel">

      <template>
        <el-form :inline="true" :model="searchDataF" class="demo-form-inline" size="mini">
          <el-form-item label="状态">
            <el-select v-model="searchDataF.state" placeholder="请选择状态">
              <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="searchDataF.type" placeholder="请选择类型">
              <el-option v-for="item in serviceTypeList" :key="item.classifyCode" :label="item.classifyName" :value="item.classifyCode">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSearch">查 询</el-button>
          </el-form-item>
        </el-form>

        <el-table class="i-cursor" @row-click="showDetail" :data="tableData" style="width: 100%">
          <template>
            <el-table-column prop="project.project_name" label="项目名称" min-width="150">
            </el-table-column>
            <el-table-column prop="project.project_service_type_name" label="业务类别" min-width="130">
            </el-table-column>
            <el-table-column prop="scope.scopeName" label="环节名称" min-width="100">
            </el-table-column>
            <el-table-column prop="scope.orgName" label="相关组织" min-width="150">
            </el-table-column>
            <el-table-column prop="scope.realStartTime" label="开始时间" min-width="150">
            </el-table-column>
             <el-table-column prop="isMine" :formatter="isMineFormatter" label="来源" min-width="80">
      </el-table-column>
            <el-table-column prop="scope.scopeState" :formatter="scopeStateFormatter" label="环节状态" min-width="80">
            </el-table-column>
          </template>
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
      searchDataF: {
        state: "A",
        type: "A"
      },
      stateList: [
        { label: "全部", value: "A" },
        { label: "已开始", value: "S" },
        { label: "已结束", value: "F" }
      ],
      serviceTypeList: [],
      tableData: [{}],
      dataTotal: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  computed: {
    ...mapGetters({
      projectStateList: store.namespace + "/getProjectStateList"
    })
  },
  methods: {
     isMineFormatter(row, column, cellValue, index){
      if(cellValue=="Y"){
        return "我发起的"
      }else{
        return "发给我的"
      }
    },
    ...mapActions({
      getUserScope: store.namespace + "/getUserScope",
      queryServiceTypeList: store.namespace + "/queryServiceTypeList"
    }),
    onSearch() {
      this.searchData();
    },
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
      var requestData = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        state: this.searchDataF.state,
        type: this.searchDataF.type
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
      vm.queryData();
      vm.queryServiceTypeList().then(response => {
        vm.serviceTypeList = [];

        vm.serviceTypeList = response.resBody;
        vm.serviceTypeList.unshift({ classifyName: "全部", classifyCode: "A" });
      });
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
