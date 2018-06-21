<template>
  <router-view></router-view>
</template>
<script>
import store from '../_store/index.js'
import { mapActions, mapMutations } from 'vuex'
import api from '../_api/base.js'
export default {
  created() {
    const STORE_KEY = store.namespace
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store)
    }
  },
  methods: {
    ...mapActions({
      initConfig: store.namespace + '/configInit',
      queryServiceTypeList: store.namespace + '/queryServiceTypeList'
    }),
    ...mapMutations({
      setUploadAttrUrl:store.namespace+'/setUploadAttrUrl'
    })
  },
  mounted() {
    //查询业务类别列表
    this.queryServiceTypeList();
    //设置上传地址
    this.setUploadAttrUrl(api.uploadAttrUrl);
    
    this.initConfig();
  },
  destroyed() {
    const STORE_KEY = store.namespace
    if (STORE_KEY in this.$store._modules.root._children) {
      this.$store.unregisterModule(STORE_KEY)
    }
  }
}
</script>
