<template>
  <page class="page" :breadcrumb="false">
    <div slot="title">新建项目</div>
    <div slot="panel">
      <ProjectAddSteps active="2"></ProjectAddSteps>
      <br/>
      <ProjectStart></ProjectStart>
    </div>
  </page>
</template>


<script>
import ProjectAddSteps from './_components/ProjectAddSteps.vue'
import ProjectStart from './_components/ProjectStart.vue'
export default {
  data() {
    return {
      projectId: 0
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 路由请求加载完成后执行函数体，参数vm就是当前组件的实例。
      if (to.query.projectId) {
        vm.projectId = to.query.projectId
        // todo 如果路由参数projectId 有值，则是修改项目下发任务页面
        // ajax 根据projectId读取下发任务信息
        console.log('ajax 根据projectId读取下发任务信息')
      } else {
        console.log('没有传递项目id,该页面不能访问')
        vm.$router.push({
          name: '新建项目'
        }) // 跳转到新建项目页面
      }
    })
  },

  components: {
    ProjectAddSteps,
    ProjectStart
  }
}
</script>