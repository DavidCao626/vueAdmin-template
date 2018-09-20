<template>
  <div>
    <el-button type="" @click="test">Go</el-button>
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
        schemeId: 37,
        expandEvalBean: {
          list: [
            {
              node: {
                nameSpace: null,
                code: "EM010101",
                name: "职业技能",
                ratio: 10.0
              },
              list: [
                {
                  name: "国家级",
                  list: [
                    { code: null, name: "一等奖", score: 99 },
                    { code: null, name: "二等奖", score: 80 }
                  ]
                },
                {
                  name: "自治区级",
                  list: [
                    { code: null, name: "一等奖", score: 99 },
                    { code: null, name: "二等奖", score: 80 }
                  ]
                }
              ]
            }
          ]
        }
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