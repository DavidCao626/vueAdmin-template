<template>
  <page class="page" :breadcrumb="false">
    <div slot="title">新建项目</div>
    <div slot="panel">
      <ProjectAddSteps :active="0"></ProjectAddSteps>
      <br/>
     
      <ProjectInfoForm ></ProjectInfoForm>
    </div>
  </page>
</template>

<script>
import { mapGetters } from 'vuex'
import ProjectInfoForm from './_components/ProjectInfoForm'
import ProjectAddSteps from './_components/ProjectAddSteps'
import store from './_store/index.js'
export default {
  name: 'projectBase',
  components: {
     ProjectInfoForm,
    ProjectAddSteps
  },
  data() {
    return {}
  },
  computed: {
    opt(){return store.getters.getServiceTypeList(1)},
    ...mapGetters({
       projectInfo: 'project/projectInfoData',
        getConfig: 'project/getConfig'
       // ioptions: 'project/getServiceTypeList'
    })
  },
  mounted() {

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      
      vm.$store.dispatch(
        'project/configGet',
        to.query.projectId
      ).then((result) => {
        console.log(result)
      })
    })
  }

}
</script>