<template>
  <page>
    <div slot="title">与我相关</div>
    <div slot="panel">
     
      <template>
        <el-table class="i-cursor" @row-click="showDetail" :data="tableData" style="width: 100%">
          <template>
            <el-table-column prop="project.project_name" label="项目名称" width="150">
            </el-table-column>
             <el-table-column prop="project.project_service_type_name" label="业务类别" width="150">
            </el-table-column>
             <el-table-column prop="scope.scopeName" label="环节名称" width="150">
            </el-table-column>
             <el-table-column prop="scope.orgName" label="相关组织" width="150">
            </el-table-column>
             <el-table-column prop="scope.realStartTime" label="开始时间" width="150">
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
      tableData: [
        {
         
        }
      ],
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
    ...mapActions({
     getUserScope:store.namespace + "/getUserScope"
    }),
    showDetail(row, event, column) {
     
    },
    projectStateFormatter(row, column, cellValue, index) {
      var list = this.projectStateList;
      for (var i = 0; i < list.length; i++) {
        if (cellValue == list[i].dict_key) {
          return list[i].dict_desc;
        }
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
        currentPage:this.currentPage,
        pageSize:this.pageSize
      }
      this.getUserScope(requestData).then(response=>{
        console.log(["response",response])
        this.tableData = response.resBody.baseData;
        this.dataTotal = response.resBody.pageInfo.totalRecord
      })
    }
  },beforeRouteEnter(to,from,next){
      next(vm=>{
          vm.queryData();
      })
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
