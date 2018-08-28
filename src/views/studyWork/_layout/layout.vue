<template>
  <router-view></router-view>
</template>
<script>
import store from '../_store/index.js'
import { mapActions, mapMutations } from 'vuex'
// import api from '../_api/base.js'
export default {
  created() {
    const STORE_KEY = store.namespace
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store)
    }
  },
  methods: {
    ...mapActions({
    }),
    ...mapMutations({
    })
  },
  mounted() {
  },
  destroyed() {
    const STORE_KEY = store.namespace
    if (STORE_KEY in this.$store._modules.root._children) {
      this.$store.unregisterModule(STORE_KEY)
    }
  }
}
</script>
