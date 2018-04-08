<template>

  <div class="container" :class="{hideSidebar:!sidebar.opened}">
    <header class="header">
      <navbar></navbar>
    </header>
     <div class="content">
        <nav class="sidebar">
            <ul class="side-nav">
              <li class="side-nav__item">
                <router-link to="/" class="side-nav__link">
                    <svg-icon class="side-nav__icon" icon-class="eye" />
                  
                  <span>首页</span>
                </router-link >
              </li>
              <li class="side-nav__item">
                <router-link to="/example" class="side-nav__link">
                  <svg-icon class="side-nav__icon" icon-class="user" />
                  <span>用户</span>
                  
                </router-link>
              </li>
              <li class="side-nav__item">
                <router-link to="/example/tree" class="side-nav__link">
                  <svg-icon class="side-nav__icon" icon-class="password" />
                  <span>组件</span>
                </router-link>
              </li>
            </ul>
            <div class="legal">
             
            </div>
        </nav>
        <main class="main-view ">
            <app-main class="app-container"></app-main>
        </main>
     </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from '@/views/layout/stu-components'

export default {
  name: 'layout',
  components: {
    Navbar,

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
.container{
  max-width: 137.14rem;
  min-width: 768px;
  margin: 0 auto;
}
.header{
  height: 80px;
  background-color: #fff;
  box-shadow: var(--shadow-dark);
}
.content{
  padding: 40px 0 80px;
  display: flex;
}
.sidebar{
  flex: 0 0  250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.main-view{
  min-height: calc(100vh - 80px - 71px - 80px);
  flex: 1;
  
}


.side-nav{
  list-style: none;
  &__item {
    padding: 8px 0;
    line-height: 1.6;
    position: relative;
    
  }
  &__item::before {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 98px;
    width: 43%;
    border-top: 1px solid #E4E8EB;
  }
  &__item:hover{
  }
  &__link:link,
  &__link:visited {
    font-size: 18px;
    color:var(--color-grey-dark-1);
    
    display: flex;
    align-items: center;
  }
  &__link:hover{
    color: var(--color-primary);
   
     background-color: #ebeef5;
  }
  &__link{
    line-height:50px;
  }

  &__icon {
    fill:var(--color-grey-light-2);
    width: 1.5rem;
    height: 1.5rem;
    margin: 0.8rem;
    margin-left: 64px;
  }


}
  .legal{
    text-align: center;
    padding: 2.5rem;
    color: var(--color-grey-light-2);
    font-size: 12px;
  }
</style>