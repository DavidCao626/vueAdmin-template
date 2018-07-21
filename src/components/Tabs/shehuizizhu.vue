<template>
    <div style="margin: 10px;">
        <template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="社会资助学生姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="资助名称" >
                </el-table-column>
                <el-table-column prop="date" label="资助金额">
                </el-table-column>
                 <el-table-column prop="date" label="发放日期">
                </el-table-column>
                 <el-table-column prop="name" label="发放人">
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

<style>
</style>
