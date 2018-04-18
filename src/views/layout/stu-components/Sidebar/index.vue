<template>
  <nav class="sidebar">
    <ul class="sidebar-nav" v-if="navMenu.length">
      <li class="sidebar-item">
        <router-link to="/dashboard" class="sidebar-item__link">
          <svg-icon class="sidebar-item__icon" icon-class="home" />
          <span>首页</span>
        </router-link>
      </li>
      <template v-for="item in navMenu" >
        <li  class="sidebar-item"  :key="item.Key">

          <span class="sidebar-item__title">
            <svg-icon class="sidebar-item__icon" icon-class="user" v-if="0" />
            <i :class="[item.icon,'sidebar-item__icon']"></i>
            <span>{{item.title}}</span>
          </span>
          <sidebar-children v-if="item.children.length" :childeren="item.children"></sidebar-children>

        </li>
      </template>

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
  components: { 'sidebar-children': SidebarChildren },
  computed: {
    ...mapGetters(['navMenu'])
  },
  mounted: function() {
    this.$store.dispatch('GetNavMenu').then(() => {
      console.log(this.navMenu)
    })
  }
}
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.router-link-active {
  color: var(--color-primary);
  .sidebar-item__icon {
    fill: var(--color-primary);
  }
}

.sidebar {
  flex: 0 0 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &-nav {
    list-style: none;
  }
  &-item {
    padding: 8px 0;
    line-height: 1.6;
    position: relative;
    font-size: 18px;
    color: var(--color-grey-dark-1);
  }
  &-item::before {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 98px;
    width: 43%;
    border-top: 1px solid #e4e8eb;
  }

  &-item__link {
    line-height: 50px;
    //padding-left: 64px;
  }
  &-item__link:link,
  &-item__link:visited,
  &-item__title {
    display: flex;
    align-items: center;
  }
  &-item__link:hover {
    // color: var(--color-primary);
    background-color: #ebeef5;
  }

  &-item__icon {
    fill: var(--color-grey-light-2);
    color: var(--color-grey-light-2);
    max-width: 1.2em;
    max-height: 1.2em;
    margin: 0.8rem;
    margin-left: 64px;
  }
}

.legal {
  text-align: right;
  padding: 2.5rem;
  color: var(--color-grey-light-2);
  font-size: 12px;
}
</style>
