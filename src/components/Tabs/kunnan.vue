<template>
    <div style="">
        <template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="困难学生姓名" width="180">
                </el-table-column>
                <el-table-column prop="date" label="认定时间">
                </el-table-column>
                <el-table-column prop="address" label="认定困难级别名称">
                </el-table-column>
                <el-table-column prop="address" label="认定原因">
                </el-table-column>
                <el-table-column prop="address" label="班级意见">
                </el-table-column>
                <el-table-column prop="address" label="年级认定意见">
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
       
      ]
    };
  }
};
</script>

<style>
</style>
