<template>
  <ul class="sidebar-children">
    <li class="sidebar-child" v-for="item in childeren" :key="item.key">
      <template v-if="item">

        <router-link v-if="item.path_attr!=null" v-bind:to="item.path_attr" class="sidebar-child__link">
          <span>{{item.title}}</span>
        </router-link>

      </template>
    </li>
  </ul>
</template>
<script>
export default {
  name: "SidebarChildren",
  props: ["childeren"]
};
</script>
<style lang="scss" scoped>
.sidebar-children {
  list-style: none;
}
.sidebar-child {
  padding: 8px 0;
  line-height: 1.6;
  font-size: 15px;
}
.sidebar-child:hover {
  background-color: #ebeef5;
}
.sidebar-child__link {
  padding-left: 60px;
  color: #444;
}

.router-link-active {
  color: var(--color-primary);
}
</style>
