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
        <div class="approval-panel" >
            <div>节点数据：</div><br/>
             <el-table :data="data" style="width: 100%;" size="mini">
        <el-table-column type="expand">
          <template slot-scope="props">

            <el-form label-position="" inline class="demo-table-expand" size="mini">

              <el-form-item label="姓名:">
                <span>{{ props.row.name }}</span>
              </el-form-item>

              <el-form-item label="学号:">
                <span>{{ props.row.cid }}</span>
              </el-form-item>
              <br/>
              <el-form-item label="家庭情况:">
                <span>{{ props.row.jtQk }}</span>
              </el-form-item>
              <el-form-item label="家庭人口">
                <span>{{ props.row.jtNumber }}</span>
              </el-form-item>

              <el-form-item label="是否低保户:">
                <span>{{ props.row.jtisDb }}</span>
              </el-form-item>
              <el-form-item label="是否建档立卡:">
                <span>{{ props.row.jtisjdlk }}</span>
              </el-form-item>

              <el-form-item label="家庭收入:">
                <span>{{ props.row.jtsr }}</span>
              </el-form-item>
              <el-form-item label="家庭支出:">
                <span>{{ props.row.jtzc }}</span>
              </el-form-item>
              <br/>

              <el-form-item label="学校评议:">
                <span>{{ props.row.xxpy }}</span>
              </el-form-item>

              <br/>


            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="申请人">
          <el-table-column label="姓名" width="100" prop="name">
          </el-table-column>
          <el-table-column label="学号" width="100" prop="cid">
          </el-table-column>

        </el-table-column>

        <el-table-column label="家庭情况" prop="jtdesc">
        </el-table-column>
        </el-table-column>
        <el-table-column label="申请等级" width="80" prop="shenqin">
        </el-table-column>
        <el-table-column label="学校评议" prop="xxpy">
        </el-table-column>
        <el-table-column label="学院推荐" prop="xytj" width="80">
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
    return {}
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
