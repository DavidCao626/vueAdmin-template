<template>
  <router-view></router-view>
</template>
<script>
import store from "../_store/index.js";
import api from "../_api/base.js";
import { mapActions, mapMutations } from "vuex";
export default {
  created() {
    const STORE_KEY = "$_project";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
  methods: {
    ...mapMutations({
      setUploadAttrUrl: store.namespace + "/setUploadAttrUrl"
    }),
    ...mapActions({
      queryServiceTypeList: store.namespace + "/queryServiceTypeList"
    })
  },
  mounted() {
    //附件上传地址
    this.setUploadAttrUrl(api.uploadAttrUrl);
    this.queryServiceTypeList();
  },
  destroyed() {
    const STORE_KEY = "$_project";
    if (STORE_KEY in this.$store._modules.root._children) {
      this.$store.unregisterModule(STORE_KEY);
    }
  }
};
</script>
