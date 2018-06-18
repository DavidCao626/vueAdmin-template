<template>
  <page class="page" :breadcrumb="false">
    <div slot="title">项目控制台</div>
    <div class="page-box">

      <div class="page-box__1">
        <div class="page-box__block">
          <project-info :projectId="projectId"></project-info>
        </div>
      </div>
    </div>
    <div class="page-box">

      <div class="page-box__1">
        <div class="page-box__block">
          <div class="weui-desktop-page__title" style="font-size:18px">项目状态</div>
          <project-state :projectId="projectId"></project-state>
        </div>
      </div>
    </div>

  </page>
</template>
<script>
import projectInfo from './info'
import projectState from './state'
export default {
  components: {
    projectInfo,
    projectState
  },
  data() {
    return {
      projectId: 0
    }
  },
  beforeRouteEnter(to, from, next) {
    // 不在next函数内的代码是路由请求阶段，此处代码获取不了页面vue示例和dom树
    next(vm => {
      // 路由请求加载完成后执行函数体，参数vm就是当前组件的实例。
      if (to.query.projectId) {
        // todo 如果路由参数projectId 有值，则是修改项目页面
        // ajax 根据projectId读取项目信息
        console.log('ajax 根据projectId读取项目信息')
        vm.projectId = to.query.projectId
      } else {
        console.log('没有传递项目id,该页面不能访问')
        vm.$router.push({
          name: '新建项目'
        }) // 跳转到新建项目页面
      }
    })
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
