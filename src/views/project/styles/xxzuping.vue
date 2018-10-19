<template>
  <div>
    <proInfo :itemId="itemId"></proInfo>
    <huping title="学校评议" :dataHeader="hupingHeadSytle" :dataExpand="expand">
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
import proInfo from "../_components/projectSimpleInfo"
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
          key: "qk",
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
              label: "学院推荐",
              key: "collegeR",
              width: ""
            }
          ]
        },
        {
          label: "家庭情况",
          key: "homeDesc",
          width: ""
        }
      ],
      scopeId: null,
      itemId: null,
      expand: [
        {
          label: "申请人情况",
          key: "qk",
          width: "",
          children: [
            {
              label: "姓名",
              key: "name",
              width: ""
            },
            {
              label: "学号",
              key: "stuNo",
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
          key: "jtqk",
          width: "",
          children: [
            {
              label: "单亲",
              key: "isSingleParent",
              width: ""
            },
            {
              label: "孤儿",
              key: "isOrphan",
              width: ""
            },
            {
              label: "低保",
              key: "isBasicAllowance",
              width: ""
            },
            {
              label: "建立档案",
              key: "isCreateFile",
              width: ""
            },
            {
              label: "人均收入",
              key: "perCapitaIncome",
              width: ""
            }
          ]
        }
      ]
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
       this.$router.go(-1)
    }
  }
};
</script>

<style>
</style>
