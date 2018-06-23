<template>
  <page>
      <div slot=" title "  v-if="this.$route.name!='公告详情' || this.$route.name!='公示详情' ">消息管理</div>
      <div slot="tabs " v-if="this.$route.name!='公告详情' || this.$route.name!='公示详情' ">
        <el-tabs v-model="activeName " @tab-click="handleClick ">
          <el-tab-pane label="公告管理 " name="first ">
            我的公告
          </el-tab-pane>
          <el-tab-pane label="公示管理 " name="second "></el-tab-pane>
        </el-tabs>
      </div>

    <router-view ></router-view>
  </page>

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
    handleClick(tab, event) {
      console.log(tab.$options.propsData.label);
      if (tab.$options.propsData.label === "公告管理") {
        this.$router.push({ path: "/messages/announce/list" });
      } else {
        this.$router.push({ path: "/messages/notice/list" });
      }
    },
    ...mapActions({
    getDictByDictNames:store.namespace + "/getDictByDictNames"

    }),
    ...mapMutations({})
  },
  mounted() {
    var par = []
    par[0]="public_notice_state"
    this.getDictByDictNames({'dicts':par})
  },
  destroyed() {
    const STORE_KEY = store.namespace;
    if (STORE_KEY in this.$store._modules.root._children) {
      this.$store.unregisterModule(STORE_KEY);
    }
  }
};
</script>
