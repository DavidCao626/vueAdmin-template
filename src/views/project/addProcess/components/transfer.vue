<template>
<div>
  <el-transfer
    filterable
    
    filter-placeholder="请输入搜索关键字"
    v-model="value1"
    :titles="['我当前的下级节点', '即将生效的节点']"
    :data="data">
  </el-transfer>
</div>
</template>

<script>
  export default {
    data() {
      const generateData = _ => {
        const data = []
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${i}`,
            disabled: i % 4 === 0
          })
        }
        return data
      }
      return {
        data: generateData(),
        value1: [1, 4]
      }
  }
  }
</script>