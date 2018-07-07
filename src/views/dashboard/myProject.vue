<template>
    <el-table class="i-cursor" :data="tableData" style="width: 100%">
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
                    <el-tag type="info" disable-transitions>{{scope.row.name}}</el-tag>
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
        }
      ]
    };
  }
};
</script>

<style>
</style>
