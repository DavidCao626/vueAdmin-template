<template>
  <div>
    <page>
      <div slot="title">
        {{getQuestion.questionBean.question.title}}
      </div>
      <div slot="header">
        <p>{{ getQuestion.questionBean.question.desc }}</p>

      </div>

      <div slot="panel">
        <elx-table-layout>
          <template slot="headerRight">
            <el-input placeholder="按姓名筛选" size="mini" style="width:300px" v-model="entryName"></el-input>
            <el-button type="primary" size="mini" @click="searchEntry" icon="el-icon-search">查询</el-button>
            <el-button type="primary" size="mini" icon="el-icon-search" @click="saveEntitys">保存当前结果</el-button>
          </template>
          <div class="approval-panel" style="padding:5px 0px">
            <table style="" v-if="questions[0]">
              <tr>
                <th>学生姓名</th>
                <th>学号</th>
                <th v-for="(item,index) in questions[0].options">{{ item.option.title }}
                  <small style="color:#333;font-weight:400;font-size:10px">(最高{{item.expand.maxScore}}分)</small>
                </th>
              </tr>
              <tr v-for="(i,index) in questions" :key="index">
                <td style="text-align: left;">{{ index+=1 }}、{{ i.entry.title }}</td>
                <td v-for="(item,ii) in i.expand">{{ item.value }}</td>
                <td v-for="(items,n) in i.options">
                  <el-input size="mini" v-model="items.option.score" :min="0" :max="items.expand.maxScore"></el-input>
                </td>
              </tr>
            </table>
          </div>
          <div slot="footer">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="getQuestion.pageBean.currentPage" :page-sizes="[50]" :page-size="getQuestion.pageBean.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="getQuestion.pageBean.totalRecord">
            </el-pagination>
          </div>
        </elx-table-layout>
      </div>

      <div class="approval-panel  footer-toolbar clearfix">
        <div class="footer-toolbar__pagination">
          <el-button type="primary" @click="saveEntitys">保存当前结果</el-button> <el-button type="primary" @click="submit">提交全部结果</el-button>
        </div>
      </div>
    </page>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import commons from "~/utils/common.js";
import _ from "lodash";
export default {
  data() {
    return {
      currentPage: 1,
      entryName:"",
      oldchildren: [],
      value1: 30,
      scopeId: null,
      itemId: null
    };
  },
  computed: {
    ...mapGetters({
       getQuestion: store.namespace + "/getQuestionInfo"
    }),
    questions: function() {
      var entries = this.getQuestion.questionBean.entries;
      return entries;
    }
  },
  methods: {
    handleSizeChange(val) {
      this.changePage({"pageSize":val}).then(()=>{
        this.loadQuestion({ scopeId: this.scopeId, itemId: this.itemId,"entryName":this.entryName});
      });
    },
    handleCurrentChange(val) {
      this.changePage({"currentPage":val}).then(()=>{
        this.loadQuestion({ scopeId: this.scopeId, itemId: this.itemId,"entryName":this.entryName});
      });
    },
    searchEntry:function(){
      this.loadQuestion({ scopeId: this.scopeId, itemId: this.itemId,"entryName":this.entryName});
    },
    submit() {
      this.submitQuestionBean({ scopeId: this.scopeId, itemId: this.itemId }).then(()=>{
        this.loadQuestion({ scopeId: this.scopeId, itemId: this.itemId,"entryName":this.entryName});
      })
      this.$message({
        message: "提交成功",
        type: "success"
      });
      this.$router.go(-1);
    },
    saveEntitys:function(){
      this.saveQuestionBean({ scopeId: this.scopeId, itemId: this.itemId }).then(()=>{
         this.loadQuestion({ scopeId: this.scopeId, itemId: this.itemId,"entryName":this.entryName});
      })
      this.$message({
        message: "当前数据已暂存",
        type: "success"
      });
    },
    ...mapActions({
      loadQuestion: store.namespace + "/getQuestionBean",
      submitQuestionBean: store.namespace + "/submitQuestionBean",
      changePage:store.namespace+"/changePage",
      saveQuestionBean:store.namespace+"/saveQuestionBean"
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      var scopeId = commons.getRouterParam(to, "scopeId");
      var itemId = commons.getRouterParam(to, "itemId");
      vm.scopeId = scopeId;
      vm.itemId = itemId;
      if (scopeId == null || itemId == null) {
        console.log("参数错误,该页面不能访问");
      } else {
        vm.loadQuestion({ scopeId: scopeId, itemId: itemId});
      }
    });
  },
  watch: {
    selectInput() {
      return;
    }
  }
};
</script>

<style scoped>
.approval-panel table {
  font-size: 12px;
  color: #333333;
  border-width: 1px;
  border-color: #ccc;
  border-collapse: collapse;
  width: 100%;
}
.approval-panel table th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #ccc;
  background-color: #dedede;
}
.approval-panel table td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #ccc;
  background-color: #ffffff;
  text-align: center;
}
.item-head {
}
.item-head-title {
  float: left;
  font-weight: 500;
  font-size: 16px;
}
.item-head-des {
  float: left;
  color: var(--color-grey-light-2);
  height: 16px;
  line-height: 16px;
  margin-top: 5px;
  margin-left: 15px;
}
.item-body {
  clear: both;
  margin-left: 15px;
  padding: 10px;
}
.item-body li {
  list-style: none;
  line-height: 36px;
}
.footer-toolbar__pagination {
  float: left;
}
</style>
