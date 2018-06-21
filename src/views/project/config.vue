<template>
  <page>
    <div slot="title">项目配置计划</div>
    <div slot="panel">
      {{getConfig}} 
      <el-button @click="doExecute">click</el-button>
      <ProjectAddSteps :active="1"></ProjectAddSteps>
      <br/>
      <ProjectConfig></ProjectConfig>
      <br/>
    </div>
  </page>
</template>
<script>
import ProjectConfig from './_components/ProjectConfig'
import ProjectAddSteps from './_components/ProjectAddSteps'
import { mapGetters, mapMutations } from 'vuex'
import store from './_store/index.js'
export default {
  components: {
    ProjectConfig,
    ProjectAddSteps
  },
  computed: {
    ...mapGetters({
      getConfig: store.namespace + '/getConfig'
    })
  },
  methods: {
    ...mapMutations({
      setConfig: store.namespace + '/setConfig'
    }),
    doExecute: function() {
      this.setConfig([7, 8, 9])
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 路由请求加载完成后执行函数体，参数vm就是当前组件的实例。
      if (to.query.projectId) {
        vm.projectId = to.query.projectId
        // ajax读取项目信息
      } else {
        console.log('没有传递项目id,该页面不能访问')
        vm.$router.push({
          name: '新建项目'
        }) // 跳转到新建项目页面
      }
    })
  }
}
</script>
<style >
</style>
