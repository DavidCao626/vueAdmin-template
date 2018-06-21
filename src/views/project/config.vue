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
    console.log(["config",to,from])
    next(vm => {
     
    })
  }
}
</script>
<style >
</style>
