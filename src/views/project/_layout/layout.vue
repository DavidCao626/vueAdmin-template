<template>
  <router-view></router-view>
</template>
<script>
import store from '../_store/index.js'
import { mapActions } from 'vuex'

export default {
  created() {
    const STORE_KEY = store.namespace
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store)
    }
  },
  methods: {
    ...mapActions({
      initConfig: store.namespace + '/configInit'
    })
  },
  mounted() {
    this.initConfig()
  },
  destroyed() {
    const STORE_KEY = store.namespace
    if (STORE_KEY in this.$store._modules.root._children) {
      this.$store.unregisterModule(STORE_KEY)
    }
  }
}
</script>
