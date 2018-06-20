<template>
  <router-view></router-view>
</template>
<script>
import store from "../_store/index.js";

export default {
  created() {
    const STORE_KEY = "$_project";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
  mounted(){

  },
  destroyed() {
    const STORE_KEY = "$_project";
    if (STORE_KEY in this.$store._modules.root._children) {
      this.$store.unregisterModule(STORE_KEY);
    }
  }
};
</script>
