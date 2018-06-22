<template>
  <page>
    <div slot="title">我的项目</div>
    <div slot="panel">
      <div class="panel-control">
        <div class="panel-control__flex">
          <div class="panel-control__flex-left">
            <el-input placeholder="项目名称" v-model="filterText" style="width:300px;">
              <i slot="suffix" @click="searchData" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="panel-control__flex-right">
            <router-link to="/project/add">
              <el-button type="primary" icon="el-icon-plus">新建项目</el-button>
            </router-link>
          </div>
        </div>
      </div>
      <template>
        <el-table class="i-cursor" @row-click="showDetail" :data="tableData" style="width: 100%">
          <template>
            <el-table-column prop="projectUserCode" label="#编号" width="80">
            </el-table-column>
            <el-table-column prop="projectName" label="项目名称" width="150">
            </el-table-column>
            <!-- <el-table-column prop="projectServiceTypeName" label="项目类型" width="120" :filters="[{ text: '贫困建档', value: '贫困建档' }, { text: '奖学金', value: '奖学金' },{ text: '助学金', value: '助学金' },{ text: '资助', value: '资助' }]" :filter-method="filterType" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag type="info" disable-transitions>{{scope.row.type}}</el-tag>
            </template>
          </el-table-column> -->
            <el-table-column prop="projectServiceTypeName" label="项目类型" min-width="120">
              <template slot-scope="scope">
                <el-tag type="info" disable-transitions>{{scope.row.projectServiceTypeName}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="planStartTime" label="计划开始时间" min-width="120">
            </el-table-column>
            <el-table-column prop="planCompleteTime" label="计划完成时间" min-width="120">
            </el-table-column>
            <el-table-column prop="createdUserOrgName" label="组织" min-width="140">
            </el-table-column>
            <el-table-column prop="projectState" :formatter="projectStateFormatter" label="项目状态" min-width="100">
            </el-table-column>
            <el-table-column prop="createdTime" label="创建时间" min-width="100">
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
          date: "#1",
          name: "2018年贫困建档",
          type: "贫困建档",
          node: "学校汇总",
          days: 35,
          days2: 3
        }
      ],
      filterText: "",
      dataTotal: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  computed: {
    ...mapGetters({
      projectStateList: store.namespace + "/getProjectStateList"
    }),
    filteredFruits() {
      return this.tableData.filter(element => {
        return element.name.match(this.filterText);
      });
    }
  },
  methods: {
    ...mapActions({
      queryProjectList: store.namespace + "/queryUserProject"
    }),
    showDetail(row, event, column) {
      console.log(row);
      if (row.projectState == "S") {
        //已经开始跳控制台
        this.$router.push({
          name: "项目控制台",
          params: {}
        });
      } else if (row.projectState == "R") {
        //未开始跳更新页面
        this.$router.push({
          name: "新建项目",
          params: {
            projectId: row.id
          }
        });
      }
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
    filterType(value, row) {
      return row.type === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    queryData() {
      var projectNameOrDesc = this.filterText;
      this.queryProjectList({
        projectNameOrDesc: projectNameOrDesc,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(response => {
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
