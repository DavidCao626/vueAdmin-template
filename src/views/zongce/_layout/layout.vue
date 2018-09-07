<template>
  <div>
    <template>
      <h2 v-if="currentNavMenus.length>0">{{ this.$route.meta.title }}模块功能导航：</h2>
      <el-row :gutter="10">
        <div v-for="i in currentNavMenus">

          <router-link :to="i.path_attr">
            <el-col :span="6" style="    margin-top: 10px;">
              <el-card shadow="hover">
                <div style="">
                  {{ i.title }}
                </div>

              </el-card>
            </el-col>
          </router-link>

        </div>
      </el-row>
    </template>
    <router-view></router-view>
  </div>
</template>
<script>
import store from "../_store/index.js";
import { mapActions, mapMutations, mapGetters } from "vuex";
// import api from '../_api/base.js'
export default {
  created() {
    const STORE_KEY = store.namespace;
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
  computed: {
    ...mapGetters(["navMenu"]),
    currentNavMenus() {
      let that = this;
      let navMenus = this.navMenu.filter(
        item => item["path_attr"] == that.$route.path
      );
      return navMenus.length > 0 ? navMenus[0].children : [];
    }
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({})
  },
  mounted() {},
  destroyed() {
    const STORE_KEY = store.namespace;
    if (STORE_KEY in this.$store._modules.root._children) {
      this.$store.unregisterModule(STORE_KEY);
    }
  }
};
</script>
