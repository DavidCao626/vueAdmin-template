<template>
  <div >
      <div class="panel-control">
        <div class="panel-control__flex">
          <div class="panel-control__flex-left">
            <el-input placeholder="公示名称" v-model="filterText" style="width:300px;">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="panel-control__flex-right">
            <router-link to="/project/add">
              <el-button type="primary" icon="el-icon-plus">新建公示</el-button>
            </router-link>
          </div>
        </div>
      </div>
      <template>
        <el-table :data="filteredFruits" style="width: 100%">
          <el-table-column prop="date" label="#编号" width="60">
          </el-table-column>
          <el-table-column prop="name" label="公示名称">
          </el-table-column>
          <el-table-column prop="type" label="公示类型" width="180" :filters="[{ text: '贫困建档', value: '贫困建档' }, { text: '奖学金', value: '奖学金' },{ text: '助学金', value: '助学金' },{ text: '资助', value: '资助' }]" :filter-method="filterType" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag type="info" disable-transitions>{{scope.row.type}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="node" label="工作项" width="180">
          </el-table-column>
          <el-table-column prop="days" label="要求完成天数" width="180">
          </el-table-column>
          <el-table-column prop="days2" label="剩余天数" width="120">
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-pagination style="float: right" background layout="prev, pager, next" :total="1000">
          </el-pagination>
          <div class="clearfix"></div>
        </div>
      </template>

    </div>
  </page>
</template>
<script>
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
        },
        {
          date: "#2",
          name: "2017年贫困建档",
          type: "贫困建档",
          node: "学校汇总",
          days: 35,
          days2: 3
        },
        {
          date: "#3",
          name: "2016年贫困建档",
          type: "贫困建档",
          node: "学校汇总",
          days: 35,
          days2: 3
        },
        {
          date: "#4",
          name: "2015年贫困建档",
          type: "贫困建档",
          node: "学校汇总",
          days: 35,
          days2: 3
        },
        {
          date: "#5",
          name: "2014年贫困建档",
          type: "贫困建档",
          node: "学校汇总",
          days: 35,
          days2: 3
        }
      ],
      filterText: ""
    };
  },
  computed: {
    filteredFruits() {
      return this.tableData.filter(element => {
        return element.name.match(this.filterText);
      });
    }
  },
  methods: {
    filterType(value, row) {
      return row.type === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  }
};
</script>
<style scoped>
</style>
