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
      <div class="approval-panel">
        <table style="">
          <tr>
            <th>学生姓名</th>
            <th>学号</th>

            <th v-for="(item,index) in questions[0].options">{{ item.option.title }}
              <small style="color:#777">(最高{{item.expand.maxScore}}分)</small>
            </th>
          </tr>
          <tr v-for="(i,index) in questions" :key="index">
            <td style="text-align: left;">{{ index+=1 }}、{{ i.entry.title }}</td>

            <td v-for="(item,ii) in i.expand">{{ item.value }}</td>
            <td v-for="(items,n) in i.options">
              <el-input-number size="mini" v-model="items.option.score" :min="0" :max="items.expand.maxScore"></el-input-number>
            </td>
          </tr>
        </table>
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
import commons from "~/utils/common.js";
import _ from "lodash";
export default {
  data() {
    return {
      select: "1",
      selectInput: "",
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
      var entries = this.getQuestion.entries;
      var temValues = [];
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
      this.submitQuestionBean({ scopeId: this.scopeId, itemId: this.itemId });
      this.$router.go(-1);
    },
    ...mapActions({
      loadQuestion: store.namespace + "/getQuestionBean",
      submitQuestionBean: store.namespace + "/submitQuestionBean"
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
        vm.loadQuestion({ scopeId: scopeId, itemId: itemId });
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
