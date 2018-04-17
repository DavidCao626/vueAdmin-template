<template>
    <ul class="sidebar-children">
        <li class="sidebar-child">
            <router-link to="/example/table" class="sidebar-child__link">
                <span>添加用户</span>
            </router-link>
        </li>
        <li class="sidebar-child">
            <router-link to="/404" class="sidebar-child__link">
                <span>修改用户</span>
            </router-link>
        </li>
    </ul>
</template>
<script>
export default {
  name: 'SidebarChildren'
}
</script>
<style lang="scss" scoped>
.sidebar-children {
  list-style: none;
  width: 250pxs;
}
.sidebar-child {
  padding: 8px 0;
  line-height: 1.6;
  font-size: 1rem;
  font-weight: 400;
}
.sidebar-child:hover {
  background-color: #ebeef5;
}
.sidebar-child__link {
  padding-left: 92px;
  color:var(--color-grey-dark-1);
}

.router-link-active {
  color: var(--color-primary);
}
</style>
