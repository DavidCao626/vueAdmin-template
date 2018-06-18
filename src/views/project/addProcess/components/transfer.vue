<template>
  <div>
    <el-transfer filterable filter-placeholder="请输入搜索关键字" v-model="value1" :titles="['我当前的下级节点', '即将生效的节点']" :data="data">
    </el-transfer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      value1: []
    }
  },
  methods: {
    generateData() {
      // Todo ajax查询我的下级可用节点

      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        })
      }
      this.data = data
    }
  },
  mounted() {
    this.generateData()
  }
}
</script>