<template>
  <div>
    <!-- <template>
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
    </template> -->
    <router-view></router-view>
  </div>
</template>
<script>
import store from "../_store/index.js";
import { mapActions, mapMutations,mapGetters } from "vuex";
import api from "../_api/base.js";
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
    ...mapActions({
      initConfig: store.namespace + "/configInit",
      queryServiceTypeList: store.namespace + "/queryServiceTypeList",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      queryCategoryList: store.namespace + "/queryCategoryList"
    }),
    ...mapMutations({
      setUploadAttrUrl: store.namespace + "/setUploadAttrUrl"
    })
  },
  mounted() {
    //查询码表
    var getDictParams = {
      dicts: ["node_state", "pend_state"]
    };
    this.getDictByDictNames(getDictParams);
    this.queryCategoryList({ available: "Y" });
    //查询业务类别列表
    this.queryServiceTypeList();
    //设置上传地址
    this.setUploadAttrUrl(api.uploadAttrUrl);

    //this.initConfig();
  },
  destroyed() {
    const STORE_KEY = store.namespace;
    if (STORE_KEY in this.$store._modules.root._children) {
      this.$store.unregisterModule(STORE_KEY);
    }
  }
};
</script>
<style >
.weui-desktop-panel .el-steps{
  margin: -15px;
}
</style>
