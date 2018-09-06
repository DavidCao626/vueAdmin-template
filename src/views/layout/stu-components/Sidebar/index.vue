<template>
  <nav class="sidebar">

    <ul class="sidebar-nav" v-if="navMenu.length">
      <li class="sidebar-item">
        <router-link to="/dashboard" class="sidebar-item__link">
          <svg-icon class="sidebar-item__icon" icon-class="home" />
          <span>首页</span>
        </router-link>
      </li>
      <template v-for="item in navMenu">
        <li class="sidebar-item" :key="item.Key">
          <div @click="showMenus(item)">

            <i :class="item.isShow?'el-icon-arrow-up':'el-icon-arrow-down'" style="font-size: 16px;float: right;margin: 10px;margin-right: 15px;color: #cccccc;" />

            <span class="sidebar-item__title" @click="">
              <svg-icon class="sidebar-item__icon" icon-class="user" v-if="0" />
              <i :class="[item.icon,'sidebar-item__icon']"></i>

              <span>{{ item.title}}</span>

            </span>
          </div>
          <transition name="el-collapse-transition">
            <sidebar-children v-if="item.isShow" :childeren="item.children"></sidebar-children>
          </transition>
        </li>
      </template>

    </ul>
    <div class="legal">

    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarChildren from "./SidebarChildren";
export default {
  name: "Sidebar",
  components: { "sidebar-children": SidebarChildren },
  computed: {
    ...mapGetters(["navMenu"])
  },
  data() {
    return {
      showMenu: true
    };
  },
  methods: {
    showMenus(item) {
      if (item.isShow) {
        return (item.isShow = false);
      } else {
        let showNavMenus = this.navMenu.filter(i => {
          return i.isShow == true;
        });
        if (showNavMenus.length > 0) {
          showNavMenus.forEach(element => {
            element.isShow = false;
          });
        }
        item.isShow = true;
      }
    }
  }
};
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
    font-size: 16px;
    color: #222;
  }
  &-item::before {
    content: " ";
    position: absolute;
    bottom: 0;
    /* left: 60px; */
    width: 100%;
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
    margin-left: 26px;
    margin-right: 14px;
  }
}

.legal {
  text-align: right;
  padding: 2.5rem;
  color: var(--color-grey-light-2);
  font-size: 12px;
}
</style>
