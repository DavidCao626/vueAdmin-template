<template>
  <div>
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
import commons from '~/utils/common.js'
import { mapGetters, mapMutations, mapActions } from "vuex";
import store from "../_store/index.js";
export default {
  components: {
    huping
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
            }
          ]
        },
        {
          label: "家庭情况",
          key: "serviceTypeName",
          width: ""
        }
      ],
      scopeId:null,
      itemId:null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const scopeId=commons.getRouterParam(to, 'scopeId');
      const itemId=commons.getRouterParam(to, 'itemId');
      if(scopeId==null || itemId==null){
        console.log("参数错误，请重新输入");
      }else{
        vm.scopeId=scopeId;
        vm.itemId=itemId;
        vm.getItemRelaseQuestionCode({"scopeId":scopeId,"itemId":itemId}).then(result=>{
            console.log(result);
            vm.$store.dispatch("initQuuestion", result.resBody);
        }).catch(ex=>{

        });
      }
    });
  },
  methods: {
     ...mapActions({
      getItemRelaseQuestionCode: store.namespace + "/getItemRelaseQuestionCode"
    }),
    subForm() {
      this.$store.dispatch("subTaskItemQuestionTable",{"scopeId":this.scopeId,"itemId":this.itemId});
    }
  }
};
</script>

<style>
</style>
