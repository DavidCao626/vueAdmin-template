<template>
  <page class="page" :breadcrumb="false">
    <div slot="title">新建项目</div>
    <div slot="panel">
      <ProjectAddSteps :active="0"></ProjectAddSteps>
      <br/>
      {{options}}
      <ProjectInfoForm ></ProjectInfoForm>
    </div>
  </page>
</template>

<script>
import { mapGetters } from 'vuex'
import ProjectInfoForm from './_components/ProjectInfoForm'
import ProjectAddSteps from './_components/ProjectAddSteps'

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
    ...mapGetters({
      projectInfo: '$_project/projectInfoData',
       options: "$_project/getServiceTypeList"
    })
  },
  mounted() {

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      
      vm.$store.dispatch(
        '$_project/configGet',
        to.query.projectId
      ).then((result) => {
        console.log(result)
      })
    })
  }

}
</script>