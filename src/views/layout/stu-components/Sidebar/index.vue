<template>
  <nav class="sidebar">
    <ul class="sidebar-nav">
      <li class="sidebar-item">
        <router-link to="/dashboard" class="sidebar-item__link">
          <svg-icon class="sidebar-item__icon" icon-class="eye" />
          <span>首页</span>
        </router-link>
      </li>
      <li class="sidebar-item">
        <span class="sidebar-item__title">
          <svg-icon class="sidebar-item__icon" icon-class="user" />
          <span>用户</span>
        </span>
        <sidebar-children></sidebar-children>
      </li>
      <li class="sidebar-item">
        <span class="sidebar-item__title">
          <svg-icon class="sidebar-item__icon" icon-class="password" />
          <span>组件</span>
        </span>
        <sidebar-children></sidebar-children>
      </li>
      
    </ul>
    <div class="legal">

    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarChildren from './SidebarChildren'
export default {
  name: 'Sidebar',
  data() {
    return {

    }
  },
  methods: {

  },
  components: {
    'sidebar-children': SidebarChildren
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.router-link-active{
  color: var(--color-primary);
  .sidebar-item__icon{
    fill:var(--color-primary);
  }
}


.sidebar{
    flex: 0 0  250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  &-nav{
    list-style: none;  
  }
  &-item {
    padding: 8px 0;
    line-height: 1.6;
    position: relative;
    font-size: 18px;
    color:var(--color-grey-dark-1);
  }
  &-item::before {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 98px;
    width: 43%;
    border-top: 1px solid #E4E8EB;
  }

  &-item__link{
    line-height:50px;
    //padding-left: 64px;
  }
  &-item__link:link,
  &-item__link:visited, &-item__title{
    display: flex;
    align-items: center;
  }
  &-item__link:hover{
   // color: var(--color-primary);
    background-color: #ebeef5;
  }

  &-item__icon {
    fill:var(--color-grey-light-2);
    width: 1.5rem;
    height: 1.5rem;
    margin: 0.8rem;
    margin-left: 64px;
  }
}

  .legal{
    text-align:right;
    padding: 2.5rem;
    color: var(--color-grey-light-2);
    font-size: 12px;
  }
</style>
