<template>
    <page :Breadcrumb="true">
       <div slot="title">
            <router-link :to="{path:'/project/control'}" target="_blank">
            <i class="el-icon-back"></i>&nbsp;返回控制台
            </router-link>
            </div>
         <div class="approval-panel" >
            当前节点：内蒙古大学
        </div>
     
        <div class="approval-panel" v-for="i in 1" :key="i.key">
                 <div>子节点列表：</div><br/>
             <el-table
    :data="tableData"
    stripe
    @row-click="onRowClick"
   >
    <el-table-column
      prop="name"
      label="节点名称"
     >
    </el-table-column>
    <el-table-column
      prop="huajie"
      label="当前环节"
       width="300"
      >
    </el-table-column>
    <el-table-column
      prop="state"
      width="200"
      label="状态">
    </el-table-column>
  </el-table>
     <br/>
        </div>
    </page>

</template>

<script>
import ContrlTimeLine from './_components/ContrlTimeLine'
import ProjectType from './_components/ProjectType'
import ProjectScoped from './_components/ProjectScoped'
import commons from '~/utils/common.js'
import store from '../_store/index.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    ContrlTimeLine,
    ProjectType,
    ProjectScoped
  },
  data() {
    return { tableData: [{
          name: '内蒙古大学数学学院',
          huajie: '学院初审',
          state: '正常'
        }, {
          name: '内蒙古大学留学生学院',
          huajie: '学院初审',
          state: '正常'
        }, {
          name: '内蒙古大学法学学院',
          huajie: '学院公示',
          state: '正常'
        }, {
          name: '内蒙古大学艺术学院',
          huajie: '班级汇总',
          state: '正常'
        }]}
  },
  computed: {
    ...mapGetters({
      projectInfo: store.namespace + '/getInteratedProjectInfo'
    })
  },
  methods: {
    ...mapActions({
      queryScopeIntegeratedDateView: store.namespace + '/queryScopeIntegeratedDateView'
    }),
    onRowClick(){
        //某行被点击时会触发该事件,跳转到该节点项目控制台
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      var scopeId = commons.getRouterParam(to, 'scopeId')
      if (scopeId == null) {
        console.log('没有传递scopeid,该页面不能访问')
      } else {
        vm.queryScopeIntegeratedDateView({ 'scopeId': scopeId })
      }
    })
  }
}
</script>
<style>
.project-name{
  font-size: 24px;
  color: #444;
  font-weight: 400;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.project-desc{
  font-size: 14px;
  color: #666;
  font-weight: 500;
  margin: 30px;
  line-height: 30px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
