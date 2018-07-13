<template>

  <div class="container">
    <header class="header">
      <navbar></navbar>
    </header>
    <div class="content">
   <div style="position: absolute;top: 90px;left:-12px;opacity: 0.4;    z-index: 999;">
         <Sticky >  <el-button @click="sidebar=!sidebar" type="info" size="mini">
          <i class="el-icon-d-arrow-left" v-if="sidebar"></i>
          <i class="el-icon-d-arrow-right" v-else></i>
          <!-- <span style="font-size:12px;" v-if="sidebar">收起</span>
          <span style="font-size:12px;" v-else>展开</span> -->
        </el-button></Sticky>
      </div>
      <div class="sidebar-container" v-show="sidebar">
        <!--  style="height: 70vh;overflow:scroll;overflow-x: hidden;overflow-y: auto;" -->
       <sidebar></sidebar>
        
      </div>
      <main class="main-view ">
        <app-main class="app-container"></app-main>

        <div class="app-container app-footer">
          <div class="app-footer__info">
            <ul>
              <li>
                <a href="">常见问题</a>
              </li>
              <li>|</li>
              <li>关于我们</li>
              <li>|</li>
              <li>版权说明</li>
              <li>|</li>
              <li>意见反馈</li>
              <li>|</li>
              <li>123-{{sidebar}}</li>
            </ul>
          </div>

          <div class="app-footer__ext">
            Copyright &copy; 2017-2018 Tabler. All Rights Reserved.
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "~/views/layout/stu-components";
import Sticky from "~/components/Sticky";
export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Sticky
  },
  computed: {
  },
  data() {
    return {
      sidebar: true
    };
  }
};
</script>

<style  lang="scss" >
//@import "src/styles/main.scss"; // global css

.container {
  min-width: 1300;
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
.page-component .page-component__nav {
  width: 240px;
  position: fixed;
  top: 0;
  bottom: 0;
  margin-top: 80px;
  transition: padding-top 0.3s;
}
.el-scrollbar {
  overflow: hidden;
  position: relative;
}
.sidebar-container {
  min-width: 250px;
  margin-top: -10px;
}
.main-view {
  min-height: calc(100vh - 80px - 71px - 80px);
  // overflow:scroll;overflow-x: hidden;
  flex: 1;
}

.legal {
  text-align: center;
  padding: 2.5rem;
  color: var(--color-grey-light-2);
  font-size: 12px;
}
</style>