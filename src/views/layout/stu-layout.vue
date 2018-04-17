<template>

  <div class="container" :class="{hideSidebar:!sidebar.opened}">
    <header class="header">
      <navbar></navbar>
    </header>
    <div class="content">
      <div class="sidebar-container">
        <sidebar></sidebar>
      </div>
      <main class="main-view ">
        <app-main class="app-container"></app-main>
      </main>
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from '~/views/layout/stu-components'
import Sidebar from '~/components/Sidebar'
export default {
  name: 'layout',
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
.container {
  max-width: 137.14rem;
  min-width: 768px;
  margin: 0 auto;
}
.header {
  height: 80px;
  background-color: #fff;
  box-shadow: var(--shadow-dark);
}
.content {
  padding: 40px 0 80px;
  display: flex;
}
.sidebar-container {
  width: 250px;
  margin-top: -10px;
}
.main-view {
  min-height: calc(100vh - 80px - 71px - 80px);
  flex: 1;
}

.legal {
  text-align: center;
  padding: 2.5rem;
  color: var(--color-grey-light-2);
  font-size: 12px;
}
</style>