<template>
<div>
  
    <div class="weui-desktop-page__title ">用户注册表</div>
  <el-tabs >
    <el-tab-pane label="用户管理" name="first">
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
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">
       <div class="weui-desktop-panel">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
 <br/>
 
  </div>
</template>

<script>
import { getList } from '~/api/table'
import Breadcrumb from '~/components/Breadcrumb'
export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  components: {
    Breadcrumb
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log(this.$route.matched)
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
