<template>
  <page>
    <div slot="title">项目控制台</div>
    <div slot="panel">
      <ProjectInfo></ProjectInfo>
      <br/>
      <hr color="#F6F8F9"/>
      <br/>
      <ProjectContrlForm></ProjectContrlForm>
    </div>
  </page>
</template>

<script>
import ProjectInfo from './_components/ProjectInfo'
import ProjectContrlForm from './_components/ProjectContrlForm'
import commons from '~/utils/common.js'
import store from './_store/index.js'
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      queryScopeIntegeratedDateView: store.namespace + '/queryScopeIntegeratedDateView'
    })
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
  },
  components: {
    ProjectInfo,
    ProjectContrlForm
  }
}
</script>