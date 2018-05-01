<template>
  <page>
    <div slot="title">项目管理</div>
    <div slot="panel" class="panel">
      <div class="panel-control">
        <div class="panel-control__float-right">
          <router-link to="/task/addTaskProject"><el-button type="primary" icon="el-icon-plus">新建项目</el-button></router-link>
        </div>
        <div class=""></div>
      </div>

      <div class="panel-body">
        <customTreeTable></customTreeTable>
      </div>
      <br/>
       <div class="panel-body">
        <transfer :data="data" v-model="value4" :valueItems="value3"  targetOrder="unshift"></transfer>
       <el-button type="text" @click="data2">2333</el-button>
      </div>
    </div>
     
  </page>
</template>
<script>
import customTreeTable from './components/customTreeTable'
import transfer from './components/transfer'
const generateData = _ => {
  const data = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `备选项 ${i}`
    })
  }
  return data
}
const generateData2 = _ => {
  const data = []
  for (let i = 16; i <= 25; i++) {
    data.push({
      key: i,
      label: `用户 ${i}`
    })
  }
  return data
}
export default {

  components: {
    customTreeTable,
    transfer
  },
  data() {
    return {
      data: generateData(),
      value3: [
        { key: 1,
          label: `用户 1` }
      ],
      value4: [1],
      renderFunc(h, option) {
        return <span>{ option.key } - { option.label }</span>
      }
    }
  },
  methods: {
    data2() {
      this.data = generateData2()
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
