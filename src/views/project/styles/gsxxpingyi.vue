<template>
  <div>
    <huping title="学校评议" :dataHeader="hupingHeadSytle">
     <div slot="header">
        <proInfo :itemId="itemId"></proInfo>
      </div>
      <div slot="headerRight">

        <el-form :inline="true" size="mini">
          <el-form-item label="姓名:">
            <el-input v-model="searchData" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="pageList">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
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
      searchData: "",
      currentPage: 4,
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
          label: "在校情况",
          key: "",
          width: "",
          children: [
            {
              label: "成绩排名",
              key: "scoreRank",
              width: ""
            },
            {
              label: "成绩排名人数",
              key: "rankNum",
              width: ""
            },
             {
              label: "必修课及格门数",
              key: "requiredCoursePass",
              width: ""
            },
             {
              label: "必修课数量",
              key: "requiredCourseNum",
              width: ""
            },
             {
              label: "综合考评排名",
              key: "appraisalRank",
              width: ""
            },
             {
              label: "综合考评人数",
              key: "appraisalNum",
              width: ""
            }
          ]
        }, {
              label: "学院推荐",
              key: "xytj",
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
       this.$router.go(-1)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    onSearch() {
      // 搜索事件
    }
  }
};
</script>

<style>
</style>
