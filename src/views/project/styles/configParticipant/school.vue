<template>
  <page :Breadcrumb="false">
    <div slot="title">
      选择参与者
    </div>
    <div slot="header">
      <projectinfo :item-id="itemId"></projectinfo>
    </div>

    <div slot="panel">
     
      <transter :source="source" :service-name="serviceName"></transter>
    </div>
  </page>
</template>
<script>
import transter from "./_components/ParticipantTranster.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import projectinfo from "../../_components/itemProjectSimpleInfo";
import store from "../../_store/index.js";
import commons from "~/utils/common.js";
export default {
  components: {
    transter,
    projectinfo
  },
  data() {
    return {
      scopeId: 0,
      itemId: 0,
      source: [],
      serviceName: ""
    };
  },
  computed: {
    getSource: function() {
      return [{ key: "22", label: "张三", disabled: false }];
    }
  },
  methods: {
    ...mapActions({
      queryItemParticipant: store.namespace + "/queryItemParticipant",
      completeUserPendingByItemId:
        store.namespace + "/completeUserPendingByItemId"
    }),
    onSubmit() {
      console.log(this);
      this.completeUserPendingByItemId({ itemId: this.itemId }).then(
        response => {
          this.$router.push({
            path: "/project/control",
            query: {
              scopeId: this.scopeId
            }
          });
        }
      );
    },
    goBack() {
      this.$router.push({
        path: "/project/control",
        query: {
          scopeId: this.scopeId
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(["to", to]);
    next(vm => {
      var scopeId = commons.getRouterParam(to, "scopeId");
      vm.scopeId = scopeId;
      var itemId = commons.getRouterParam(to, "itemId");
      vm.itemId = itemId;
      if (scopeId == null) {
        console.log("没有传递scopeid,该页面不能访问");
      } else {
        vm.serviceName = "schoolGroupReview";
        vm.queryItemParticipant({
          scopeId: scopeId,
          itemId: itemId,
          serviceName: "schoolGroupReview"
        }).then(result => {
          vm.source = result.resBody;
        });
      }
    });
  }
};
</script>

<style >
.approval-panel {
  padding: 15px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  -webkit-box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
}
.input_label {
  padding-top: 3px;
  text-align: right;
}
.el-row {
  margin-bottom: 10px;
}
</style>
