<template>
    <page>
        <div slot="title">我发起的项目</div>
        <div slot="panel">
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="#编号" width="60">
                    </el-table-column>
                    <el-table-column prop="name" label="项目名称">
                    </el-table-column>
                    <el-table-column prop="type" label="项目类型" width="180">
                    </el-table-column>
                    <el-table-column prop="node" label="工作项" width="180">
                    </el-table-column>
                    <el-table-column prop="days" label="要求完成天数" width="180">
                    </el-table-column>
                    <el-table-column prop="days2" label="剩余天数" width="120">
                    </el-table-column>
                </el-table>
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
          date: '#1',
          name: '2018年贫困建档',
          type: '贫困建档',
          node: '学校汇总',
          days: 35,
          days2: 3
        },
        {
          date: '#2',
          name: '2018年贫困建档',
          type: '贫困建档',
          node: '学校汇总',
          days: 35,
          days2: 3
        },
        {
          date: '#3',
          name: '2018年贫困建档',
          type: '贫困建档',
          node: '学校汇总',
          days: 35,
          days2: 3
        },
        {
          date: '#4',
          name: '2018年贫困建档',
          type: '贫困建档',
          node: '学校汇总',
          days: 35,
          days2: 3
        },
        {
          date: '#5',
          name: '2018年贫困建档',
          type: '贫困建档',
          node: '学校汇总',
          days: 35,
          days2: 3
        }
      ]
    }
  }
}
</script>
<style scoped>
</style>
