
<template>
  <div>

    <page>
      <div slot="title">配置测评方案</div>
      <div slot="panel">
        <tree :data="data.list"></tree>
      </div>
    </page>
    <page>
      <div slot="panel" style="text-align: right">
        <el-button @click="save">保存</el-button>
        <el-button size="mini" type="primary" @click="complate">完成</el-button>
      </div>
    </page>
  </div>
</template>

<script>
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";
import tree from "./_components/tree";
export default {
  data() {
    return {
      show: true,
      itemId: 0,
      scopeId: 0,
      projectCode: "",
      data: {
        list: []
      },
      responseData: null
    };
  },
  components: {
    tree
  },

  methods: {
    ...mapActions({
      getEvaluateTemplate: store.namespace + "/getEvaluateTemplate",
      saveEvaluateTemplate: store.namespace + "/saveEvaluateTemplate",
      completeUserPendingByItemId:
        store.namespace + "/completeUserPendingByItemId"
    }),

    save() {
      var temp = JSON.parse(JSON.stringify(this.data.list)) ;
      temp.forEach(element => {
        delete element.isShow;
      });
      var requestData = {
        projectCode: this.projectCode,
        template: {list:temp}
      };
      this.saveEvaluateTemplate(requestData).then(response => {
        this.$message.success("保存成功");
        this.getData()
      });
    },
    getData() {
      this.getEvaluateTemplate({ projectCode: this.projectCode }).then(vm => {
        this.data = vm.resBody;
      });
    },
    complate() {
      var temp = JSON.parse(JSON.stringify(this.data.list)) ;
      temp.forEach(element => {
        delete element.isShow;
      });
      var requestData = {
        projectCode: this.projectCode,
        template: {list:temp}
      };
      this.saveEvaluateTemplate(requestData).then(response => {
        this.completeUserPendingByItemId({ itemId: this.itemId }).then(
          response => {
            this.$message.success("操作成功");
            this.$router.go(-1);
          }
        );
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!to.query.scopeId || !to.query.itemId || !to.query.projectCode) {
        vm.$message.error("参数不正确");
      }
      vm.scopeId = to.query.scopeId;
      vm.itemId = to.query.itemId;
      vm.projectCode = to.query.projectCode;
      vm.getData();
    });
  }
};
</script>
