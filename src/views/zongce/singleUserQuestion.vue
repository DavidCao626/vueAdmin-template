<template>
  <div>
    <page>
      <div slot="title">
        {{getQuestion.question.title}}
      </div>
      <div slot="extra">
        <el-input placeholder="请输入搜索内容" style="width:280px" v-model="selectInput" class="input-with-select">
          <elx-select v-model="select" style="width:80px" slot="prepend" placeholder="请选择">
            <el-option label="姓名" value="1"></el-option>
            <el-option label="学号" value="2"></el-option>
          </elx-select>
        </el-input>
      </div>
      <div class="approval-panel">
        <p>{{ getQuestion.question.desc }}</p>
      </div>
      <div class="approval-panel" style="margin-top:20px;margin-bottom:20PX;" v-for="(i,index) in questions" :key="index">
        <div class="item-head">
          <div class="item-head-title">{{ index+=1 }}、{{ i.entry.title }}</div>
          <div class="item-head-des">
            <template v-for="(item) in i.expand">
              {{item.key}}:{{ item.value }} &nbsp;
            </template>
          </div>
        </div>
        <div class="item-body">
          <ul>
            <li v-for="(item,index) in i.options" :key="index">
              {{ item.option.title }}：
              <el-input-number size="mini" v-model="item.option.score" :min="0" :max="item.expand.maxScore"></el-input-number>&nbsp;分
              <small>最高{{item.expand.maxScore}}分</small>
            </li>
          </ul>
        </div>
      </div>

      <div class="approval-panel  footer-toolbar clearfix">
        <div class="footer-toolbar__pagination">
          <el-button type="primary" @click="submit">提交</el-button>
        </div>
      </div>
    </page>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import commons from '~/utils/common.js'
import _ from "lodash";
export default {
  data() {
    return {
      select: "1",
      selectInput: "",
      oldchildren: [],
      value1: 30,
      scopeId:null,
      itemId:null
    }
  },
  computed:{
    ...mapGetters({
      getQuestion: store.namespace + '/getQuestionInfo'
    }),
    questions:function(){
       var entries=this.getQuestion.entries;
       var temValues=[];
       if (this.select == "1") {
        temValues = entries.filter(item => {
          return item.entry.title.indexOf(this.selectInput) != -1;
        });
      } else {
        temValues = entries.filter(item => {
          let keyitme = item.expand.filter(i => i.key == "学号");
             return keyitme[0].value.indexOf(this.selectInput) != -1;
        });
      }
      return temValues;
    }
  },
  methods: {
    submit() {
      this.submitQuestionBean({scopeId:this.scopeId,"itemId":this.itemId});
    },
    ...mapActions({
         loadQuestion: store.namespace + '/getQuestionBean',
         submitQuestionBean:store.namespace +"/submitSingleQuestionBean"
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
       var scopeId = commons.getRouterParam(to, 'scopeId');
       var itemId=commons.getRouterParam(to,'itemId');
       vm.scopeId=scopeId;
       vm.itemId=itemId;
      if (scopeId == null || itemId==null) {
        console.log('参数错误,该页面不能访问')
      } else {
        vm.loadQuestion({ 'scopeId': scopeId,'itemId':itemId })
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
