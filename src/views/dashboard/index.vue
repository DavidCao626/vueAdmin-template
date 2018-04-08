<template>
  <div class="dashboard" >
    <div class="weui-desktop-panel">
      <div class="weui-desktop-home-notice">
        <div class="weui-desktop-home-notice__info">
          <a href="/cgi-bin/announce?action=getannouncement&amp;announce_id=11518228081c7A0o&amp;version=&amp;lang=zh_CN" target="_blank" class="weui-desktop-home-notice__title">
            学工系统文档手册发布
          </a>
        </div>
        <div class="weui-desktop-home-notice__extra">
          <em class="weui-desktop-home-notice__date">2018-02-10</em>
          <a href="/cgi-bin/announcement?t=home/notice&amp;token=2058891718&amp;lang=zh_CN" target="_blank" class="weui-desktop-home-notice__readmore">更多</a>
        </div>
      </div>
    </div>


     <div class="weui-desktop-panel"> 
       <h3>学生表</h3>
       <br/>
           <el-table
    :data="tableData3"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column label="配送信息">
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column label="地址">
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
      </el-table-column>
    </el-table-column>
  </el-table>  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  & {
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
