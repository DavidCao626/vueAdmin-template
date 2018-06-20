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
import ProjectInfo from "./_components/ProjectInfo";
import ProjectContrlForm from "./_components/ProjectContrlForm";
export default {
  components: {
    ProjectInfo,
    ProjectContrlForm
  }
};
</script>