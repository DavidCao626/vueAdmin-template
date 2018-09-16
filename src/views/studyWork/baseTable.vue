<template>
  <div>
    <el-button type="" @click="test"></el-button>
    <hr/> {{data}}
  </div>
</template>

  <script>
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";
Vue.use(Element);
export default {
  data() {
    return {
      data: null
    };
  },
  watch: {},
  methods: {
    ...mapActions({
      mytest: store.namespace + "/mytest"
    }),
    test() {
      var requestData = {
        id: 26,
      };
      this.mytest(requestData).then(response => {
        this.data = response;
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
.demo-form-inline {
  display: inline !important;
}
</style>