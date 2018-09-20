
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
      this.data.list.forEach(element => {
        delete element.isShow;
      });
      var requestData = {
        projectCode: this.projectCode,
        template: this.data
      };
      this.saveEvaluateTemplate(requestData).then(response => {
        this.$message.success("保存成功");
      });
    },
    getData() {
      this.getEvaluateTemplate({ projectCode: this.projectCode }).then(vm => {
        this.data = vm.resBody;
      });
    },
    complate() {
      var requestData = {
        projectCode: this.projectCode,
        template: {
          list: [
            {
              nameSpace: null,
              code: "ED0102",
              name: "创新评价",
              ratio: 10.22,
              orientation: "N",
              mutuals: [
                {
                  nameSpace: null,
                  code: "EM010201",
                  name: "学术科研",
                  ratio: 90
                },
                {
                  nameSpace: null,
                  code: "EM010202",
                  name: "课外学术论文",
                  ratio: 10
                }
              ],
              handler: ""
            },
            {
              nameSpace: null,
              code: "ED0101",
              name: "能力评价",
              ratio: 10.22,
              orientation: "N",
              mutuals: [
                {
                  nameSpace: null,
                  code: "EM010101",
                  name: "职业技能",
                  ratio: 100
                }
              ],
              handler: ""
            },
            {
              nameSpace: null,
              code: "ED0201",
              name: "学生考评",
              ratio: 10.22,
              orientation: "N",
              mutuals: [
                {
                  nameSpace: null,
                  code: "EM020101",
                  name: "学生自评",
                  ratio: 30
                },
                {
                  nameSpace: null,
                  code: "EM020102",
                  name: "班级互评",
                  ratio: 20
                },
                {
                  nameSpace: null,
                  code: "EM020103",
                  name: "民主互评",
                  ratio: 50
                }
              ],
              handler: ""
            },
            {
              nameSpace: null,
              code: "ED0001",
              name: "学业评价",
              ratio: 10.22,
              orientation: "N",
              mutuals: [],
              handler: ""
            },
            {
              nameSpace: null,
              code: "ED0202",
              name: "学生处分",
              ratio: 10.22,
              orientation: "N",
              mutuals: [],
              handler: ""
            }
          ]
        }
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
