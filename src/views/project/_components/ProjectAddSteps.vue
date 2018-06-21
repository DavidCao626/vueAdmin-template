<template>
    <el-steps :active="active" simple finish-status="success">
        <el-step v-for="(i,index) in steps" :key="index" :title="i.title" :icon="i.icon"> </el-step>

    </el-steps>
</template>
<script>
export default {
  props: {
    active: 0,
    steps: {
      type: Array,
      default: function() {
        return [
          {
            title: "填写项目信息",
            icon: "el-icon-edit"
          },
          {
            title: "配置计划",
            icon: "el-icon-picture"
          },
          {
            title: "任务下发",
            icon: "el-icon-upload"
          }
        ]
      }
    }
  }
};
</script>
