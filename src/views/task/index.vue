<template>
  <page>
    <div slot="title">自定义项目管理</div>

    <div slot="panel" class="panel">

      <div class="panel-control">
        <div class="panel-control__flex">
          <div class="panel-control__flex-left">
            <el-input  v-model="searchContent" placeholder="项目名称" style="width:300px;">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="saveBlock"></i>
            </el-input>
          </div>
          <div class="panel-control__flex-center">

            <!-- <router-link to="/task/addTaskProject"> </router-link> -->
            <span @click="changeSearchState('S')">
              <el-tag>进行中</el-tag>
            </span>
            <span @click="changeSearchState('R')">
              <el-tag type="info">未开始</el-tag>
            </span>
            <!-- <el-tag @click="changeSearchState" type="warning">暂停中</el-tag>-->
            <!-- <el-tag type="danger">未完成</el-tag> -->
            <span @click="changeSearchState('C')">
              <el-tag type="success">已完成</el-tag>
            </span>

          </div>
          <div class="panel-control__flex-right">
            <router-link to="/task/addTaskProject">
              <el-button type="primary" icon="el-icon-plus">新建项目</el-button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="panel-body" style="    border: 1px #e8e8e8 solid;">
        <component :is="dynamicView" :propsData="filterData" @dataCount="getDataCount"></component>
      </div>
      <br/>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dataCount">
    </el-pagination>
    </div>


  </page>
</template>
<script>
import customTreeTable from './components/customTreeTable'
import transfer from './components/transfer'
import { queryNodeByLiblerldByParam } from '~/api/task'
import { completed, noStart, search, starting } from './taskfilter'

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
    transfer,
    completed,
    noStart,
    search,
    starting
  },
  data() {
    return {
      dynamicView: customTreeTable,
      filterData: [],
      searchState: '', // 搜索的内容状态//进行中、未开始、暂停中、已完成
      searchContent: '',
      pageSize: 10, // 一页几条
      dataCount: 0, // 一共多少页
      currentPage: 1, // 当前页
      searchData: {}, // 查询参数
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
    handleSizeChange(val) {
      this.pageSize = val
      this.queryData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryData()
    },
    data2() {
      this.data = generateData2()
    },
    changeSearchState: function(state) {
      if (this.searchState == state) {
        this.searchState = ''
      } else {
        this.searchState = state
      }
      // 执行一次查询
      this.saveBlock()
    },
    saveBlock: function() {
      // 查询
        this.searchData.state = this.searchState
        this.searchData.content = this.searchContent
      this.searchData.currentPage = this.currentPage
      this.searchData.pageSize = this.pageSize
      this.queryData()
    },
    queryData: function() {
      var requestData = this.searchData
      var t = this
      // this.dynamicView = noStart// 切换搜索组件
      queryNodeByLiblerldByParam(requestData).then(data => {
        t.filterData = data.resBody.data
        t.dataCount = data.resBody.dataCount
        console.log(['请求到的节点列表数据', data])
      })
    }
    ,getDataCount(count){

      this.dataCount=count
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
