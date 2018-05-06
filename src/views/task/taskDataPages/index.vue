<template>
  <page :Breadcrumb="false">
    <div slot="title">节点信息</div>

    <div slot="panel">
      <ProjectProgress>
        <div>
          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="审批人">
              <label>章三</label>
            </el-form-item>
            <el-form-item label="活动区域">
             <label>区域一</label>
            </el-form-item>
            <el-form-item>
              <label>区域二</label>
            </el-form-item>
          </el-form>
        </div>
      </ProjectProgress>
    </div>
    <div>

      <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="top" type="border-card">
        <el-tab-pane label="待审核数据" name="second">

          <div class="filter-container">
            <el-checkbox-group v-model="checkboxVal">
              <el-checkbox label="date">date</el-checkbox>
              <el-checkbox label="name">name</el-checkbox>
              <el-checkbox label="address">address</el-checkbox>
            </el-checkbox-group>
          </div>

          <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" :key='key' border fit highlight-current-row @selection-change="handleSelectionChange">
            <el-table-column :key='fruit' v-for='fruit in formThead' :label="fruit">
              <template slot-scope="scope">
                {{scope.row[fruit]}}
              </template>
            </el-table-column>

          </el-table>
          <div style="margin-top: 20px">
            <el-pagination small layout="prev, pager, next" :total="50">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已审核数据" name="third">
          <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-pagination small layout="prev, pager, next" :total="50">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </page>
</template>
<script>
import { ProjectProgress } from '~/views/task/components/Progress'
const defaultFormThead = ['date', 'name']
export default {
  components: { ProjectProgress },
  data() {
    return {
      activeName: 'second',
      tableData3: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: [],
      key: 1, // table key
      formTheadOptions: ['date', 'name', 'address'],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead // 默认表头 Default header
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(
        i => valArr.indexOf(i) >= 0
      )
      this.key = this.key + 1 // 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
