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
import commons from '~/utils/common.js'
import store from './_store/index.js'
export default {
  data() {
    return {
      projectId: 0
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      var scopeId = commons.getRouterParam(to, 'scopeId')
      var itemId = commons.getRouterParam(to, 'itemId')
      if (scopeId == null || itemId == null) {
        console.log('没有传递scopeid and itemId,该页面不能访问')
      } else {
        console.log([scopeId, itemId])
      }
    })
  },

  components: {
    ProjectAddSteps,
    ProjectStart
  }
}
</script>