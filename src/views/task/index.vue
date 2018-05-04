<template>
  <page>
    <div slot="title">项目管理</div>

    <div slot="panel" class="panel">

      <div class="panel-control">
        <div class="panel-control__flex">
          <div class="panel-control__flex-left">
            <el-input placeholder="项目名称" style="width:300px;">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="saveBlock"></i>
            </el-input>
          </div>
          <div class="panel-control__flex-center">

            <!-- <router-link to="/task/addTaskProject"> </router-link> -->
            <el-tag>进行中</el-tag>
            <el-tag type="info">未开始</el-tag>
            <el-tag type="warning">暂停中</el-tag>
            <!-- <el-tag type="danger">未完成</el-tag> -->
            <el-tag type="success">已完成</el-tag>
          </div>
             <div class="panel-control__flex-left" v-if="0">

            <!-- <router-link to="/task/addTaskProject"> </router-link> -->
            <el-tag>进行中</el-tag>
            <el-tag type="info">未开始</el-tag>
            <el-tag type="warning">暂停中</el-tag>
            <!-- <el-tag type="danger">未完成</el-tag> -->
            <el-tag type="success">已完成</el-tag>
          </div>
          <div class="panel-control__flex-right">
            <router-link to="/task/addTaskProject">
              <el-button type="primary" icon="el-icon-plus">新建项目</el-button>
            </router-link>
          </div>

        </div>
      </div>
      <div class="panel-body">
        <customTreeTable ></customTreeTable>
      </div>
      <br/>
      <div class="panel-body" v-if="0">
        <transfer :data="data" v-model="value" :transferHeight="300" :titles="['数据列1', '数据列2']" filterable :valueItems="valueItem">

          <span slot="operation-slot">
            <el-button type="primary" size="small" @click="saveBlock">保存提交</el-button>
          </span>
        </transfer>
      </div>
    </div>

  </page>
</template>
<script>
import customTreeTable from './components/customTreeTable'
import transfer from './components/transfer'
const generateData = _ => {
  const data = []
  for (let i = 1; i <= 30; i++) {
    data.push({
      key: i,
      label: '备选项 ' + i
    })
  }
  return data
}
const generateData2 = function() {
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
      valueItem: [
        // 加载编辑时拉去服务器的加载项
        {
          key: 1,
          label: `备选项 1`
        }
      ],
      value: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        )
      }
    }
  },
  methods: {
    data2() {
      this.data = generateData2()
    },
    saveBlock: function() {
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
