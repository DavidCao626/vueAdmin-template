<template>
    <router-view ></router-view>
</template>
<script>
import store from "../_store/index.js";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  created() {
    const STORE_KEY = store.namespace;
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
  methods: {
    getRouteName(){
     if(this.$route.name!='公告详情' || this.$route.name!='公示详情'){
       return true
     }
     else{
       return false
     }
    },
    
    ...mapActions({
      getDictByDictNames: store.namespace + "/getDictByDictNames"
    }),
  },
  mounted() {
    var par = [];
    par[0] = "public_notice_state";
    this.getDictByDictNames({ dicts: par });
  },
  destroyed() {
    const STORE_KEY = store.namespace;
    if (STORE_KEY in this.$store._modules.root._children) {
      this.$store.unregisterModule(STORE_KEY);
    }
  }
};
</script>
