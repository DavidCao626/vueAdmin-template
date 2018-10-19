<template>
  <div>
    <proInfo :itemId="itemId"></proInfo>
    <huping title="学校评议" :dataHeader="hupingHeadSytle">
      <div slot="footer">
        <div class="approval-panel" style="text-align: center;">
          <el-button type="primary" size="mini" @click="subForm">提交</el-button>
        </div>
      </div>

    </huping>
  </div>
</template>
<script>
import huping from "./huping/index";
import commons from "~/utils/common.js";
import proInfo from "../_components/projectSimpleInfo";
import { mapGetters, mapMutations, mapActions } from "vuex";
import store from "../_store/index.js";
export default {
  components: {
    huping,
    proInfo
  },
  data() {
    return {
      hupingHeadSytle: [
        {
          label: "申请人情况",
          key: "",
          width: "",
          children: [
            {
              label: "姓名",
              key: "name",
              width: ""
            },
            {
              label: "机构",
              key: "orgName",
              width: ""
            },
            {
              label: "学号",
              key: "stuNo",
              width: ""
            },
            {
              label: "申请等级",
              key: "childServiceTypeName",
              width: ""
            }
          ]
        },
        {
          label: "申请原因",
          key: "mainReasonStr",
          width: ""
        },
        {
          label: "学院推荐",
          key: "xytj",
          width: ""
        }
      ],
      scopeId: null,
      itemId: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const scopeId = commons.getRouterParam(to, "scopeId");
      const itemId = commons.getRouterParam(to, "itemId");
      if (scopeId == null || itemId == null) {
        console.log("参数错误，请重新输入");
      } else {
        vm.scopeId = scopeId;
        vm.itemId = itemId;
        vm
          .getItemRelaseQuestionCode({ scopeId: scopeId, itemId: itemId })
          .then(result => {
            console.log(result);
            vm.$store.dispatch("initQuuestion", result.resBody);
          })
          .catch(ex => {});
      }
    });
  },
  methods: {
    ...mapActions({
      getItemRelaseQuestionCode: store.namespace + "/getItemRelaseQuestionCode"
    }),
    subForm() {
      this.$store.dispatch("subTaskItemQuestionTable", {
        scopeId: this.scopeId,
        itemId: this.itemId
      });
      this.$router.go(-1)
    }
  }
};
</script>

<style>
</style>
