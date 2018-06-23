<template>
  <page>
    <div slot="title" >消息管理</div>
    <div slot="tabs">
      <el-tabs value="first" @tab-click="handleClick ">
        <el-tab-pane label="公告管理 " name="first">
          我的公告
        </el-tab-pane>
        <el-tab-pane label="公示管理 " name="second"></el-tab-pane>
      </el-tabs>
    </div>
    <div slot="panel">
      <div class="panel-control">
        <div class="panel-control__flex">
          <div class="panel-control__flex-left">
            <el-input placeholder="公告名称" v-model="filterText" style="width:300px;">
              <i slot="suffix" @click="searchData" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="panel-control__flex-right">
            <router-link to="/project/add">
              <el-button type="primary" icon="el-icon-plus">新建公告</el-button>
            </router-link>
          </div>
        </div>
      </div>
      <template>
        <el-table @row-click="showDetail" class="i-cursor" :data="tableData" style="width: 100%">
          <!-- <el-table-column prop="id" label="#编号" width="60">
        </el-table-column> -->
          <el-table-column prop="title" label="公告名称">
          </el-table-column>
          <el-table-column prop="state" :formatter="stateFormatter" label="公告状态" width="120">
            <!-- <template slot-scope="scope">
            <el-tag type="info" disable-transitions>{{scope.row.state}}</el-tag>
          </template> -->
          </el-table-column>
          <el-table-column prop="attachment" align="center" :formatter="filesFormatter" label="是否存在附件">
          </el-table-column>
          <el-table-column prop="createdTime" label="创建时间">
          </el-table-column>
          <!-- <el-table-column prop="type" label="公告类型" width="180" :filters="[{ text: '贫困建档', value: '贫困建档' }, { text: '奖学金', value: '奖学金' },{ text: '助学金', value: '助学金' },{ text: '资助', value: '资助' }]" :filter-method="filterType" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag type="info" disable-transitions>{{scope.row.type}}</el-tag>
            </template>
          </el-table-column> -->
          <!-- <el-table-column prop="node" label="工作项" width="180">
        </el-table-column>
        <el-table-column prop="days" label="要求完成天数" width="180">
        </el-table-column>
        <el-table-column prop="days2" label="剩余天数" width="120">
        </el-table-column> -->
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
//公告
import { mapGetters, mapMutations, mapActions } from "vuex";
import store from "../_store/index.js";

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
    filteredFruits() {
      return this.tableData.filter(element => {
        return element.name.match(this.filterText);
      });
    },
    ...mapGetters({
      publicNoticeState: store.namespace + "/getPublicNoticeState"
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.$options.propsData.label);
      if (tab.$options.propsData.label === "公告管理") {
        this.$router.push({ path: "/messages/announce/list" });
      } else {
        this.$router.push({ path: "/messages/notice/list" });
      }
    },
    showDetail(row, event, column) {
      //alert("我要跳转到详情,这是我的Id : " + row.id)
      this.$router.push({
        name: "公告详情",
        params: {
          publicNoticeId: row.id
        }
      });
    },
    filesFormatter(row, column, cellValue, index) {
      if (cellValue == null) {
        return "否";
      } else {
        return "是";
      }
    },
    stateFormatter(row, column, cellValue, index) {
      var list = this.publicNoticeState;
      for (var i = 0; i < list.length; i++) {
        if (cellValue == list[i].dict_key) {
          return list[i].dict_desc;
        }
      }
    },
    queryData() {
      var requestData = {
        searchParam: this.filterText,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      this.queryPublicNoticeA(requestData).then(response => {
        this.tableData = response.resBody.baseData;
        this.dataTotal = response.resBody.pageInfo.totalRecord;
      });
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
    ...mapActions({
      queryPublicNoticeA: store.namespace + "/queryPublicNoticeA"
    }),
    filterType(value, row) {
      return row.type === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
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
