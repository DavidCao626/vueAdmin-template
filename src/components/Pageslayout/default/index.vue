<template>
    <div class="Page-dafault">
        <div class="weui-desktop-layout__main__hd">

            <div class="weui-desktop-page__title ">
                <slot name="title">
                    页面标题
                </slot>
            </div>
            <div v-if="this.$root.$route['meta'].hidden || this.Breadcrumb">
                <Breadcrumb></Breadcrumb>
            </div>
        </div>

        <!-- <el-tabs>
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs> -->
        <template v-if="$slots.panel">
            <div class=" weui-desktop-panel">
                <slot name="panel">
                </slot>
            </div>
        </template>

        <slot></slot>

    </div>
</template>
<script>
import Breadcrumb from '~/components/Breadcrumb'
export default {
  name: 'Page-dafault',
  props: {
    'Breadcrumb': {
      default: false,
      type: Boolean
    }
  },
  components: {
    Breadcrumb
  }
}
</script>
<style lang="scss" scoped>

</style>
