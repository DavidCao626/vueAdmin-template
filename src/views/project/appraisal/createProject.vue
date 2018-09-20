<template>
  <page class="page" :breadcrumb="false">
    <div slot="title">新建项目</div>
    <div slot="panel" >
      <ProjectAddSteps :active="0"></ProjectAddSteps>

    </div>
      <ProjectInfoForm></ProjectInfoForm>
  </page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProjectInfoForm from "./_components/ProjectInfoForm";
import ProjectAddSteps from "./_components/ProjectAddSteps";
import store from "../_store/index.js";
import commons from "~/utils/common.js";
export default {
  name: "projectBase",
  components: {
    ProjectInfoForm,
    ProjectAddSteps
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      getProjectInfo: store.namespace + "/getProjectById",
      setProjectServiceType: store.namespace + "/setProjectServiceType"
    })
  },
  computed: {},
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(["to", to]);
      console.log(["from", from]);
      console.log(["next", next]);

      if (to.query.projectId != undefined) {
        console.log(to.query.projectId);
        let projectId = to.query.projectId;
        if (projectId != "" && projectId != null) {
          vm.getProjectInfo(projectId, serType);
        }
      } else if (to.params.projectId != undefined) {
        console.log(to.params.projectId);
        let projectId = to.params.projectId;
        if (projectId != "" && projectId != null) {
          vm.getProjectInfo(projectId, serType);
        }
      } else {
        var serType = "201816"
        if (serType == null) {
          vm.$message.error("业务类别不能为空");
          vm.$router.go(-1);
        }
        vm.setProjectServiceType(serType);
      }
    });
  }
};
</script>