<template>
  <page>
    <div slot="title">项目配置计划</div>
    <div slot="panel">
      <ProjectAddSteps :active="1"></ProjectAddSteps>
      <br/>
      <ProjectConfig></ProjectConfig>
      <br/>
    </div>
  </page>
</template>
<script>
import ProjectConfig from './_components/ProjectConfigClass'
import ProjectAddSteps from './_components/ProjectAddSteps'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import commons from '~/utils/common.js'
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
    ...mapActions({
      queryScopeConfigInfo: store.namespace + '/queryScopeDataView'
    }),
    doExecute: function() {
      this.setConfig([7, 8, 9])
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(['config', to, from])
    next(vm => {
      var scopeId = commons.getRouterParam(to, 'scopeId')
      var itemId = commons.getRouterParam(to, 'itemId')
      if (scopeId == null || itemId == null) {
        console.log('没有传递scopeid and itemId,该页面不能访问')
      } else {
        vm.queryScopeConfigInfo({ 'scopeId': scopeId, 'itemId': itemId })
      }
    })
  }
}
</script>
<style >
</style>
