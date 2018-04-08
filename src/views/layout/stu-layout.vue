<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout/stu-components'
export default {
  name: 'stulayout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style  lang="scss" >

@import "src/styles/core.scss"; // global css
@import "src/styles/abstracts/mixins.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
body {
  background-color: #f6f8f9;
  min-width: 768px;
}
</style>