<template>
  <page class="page" :breadcrumb="false">
    <div slot="title">项目控制台</div>
    <div class="page-box">

      <div class="page-box__1">
        <div class="page-box__block">
          <project-info></project-info>
        </div>
      </div>
    </div>
    <div class="page-box">

      <div class="page-box__1">
        <div class="page-box__block">

          <div class="weui-desktop-page__title" style="font-size:18px">项目状态</div>
          <project-state></project-state>
        </div>
      </div>
    </div>

  </page>
</template>
<script>
import projectInfo from './info';
import projectState from './state';
export default {
  components: {
    projectInfo,
    projectState
  }
}
</script>
<style lang="scss">
.page {
  &-box {
    display: flex;
    &__0 {
      flex: 0;
    }
    &__1 {
      flex: 1;
    }
    &__2 {
      flex: 2;
    }
    &__block {
      margin: 0px 20px 20px auto;
      padding: 25px;
      background-color: #ffffff;
      border-radius: 3px;
      -moz-border-radius: 3px;
      -webkit-border-radius: 3px;

      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
    }
    &__block:hover {
      box-shadow: 0 2px 7px 3px rgba(0, 0, 0, 0.05);
      transition: all 0.1s ease-in-out;
    }
  }
}
</style>
