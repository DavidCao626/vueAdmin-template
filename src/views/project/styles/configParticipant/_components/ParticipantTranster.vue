<template>
  <div>
    <el-transfer filterable filter-placeholder="请输入搜索关键字" v-model="target" :titles="['待选', '已选']" :data="source">

      <el-button class="transfer-footer" type="primary" slot="right-footer" @click="saveReadyParticipants" size="mini" icon="el-icon-circle-check">提交配置</el-button>
      <el-button class="transfer-footer" plain slot="right-footer" size="mini" icon="el-icon-refresh">重置</el-button>
      <!-- <el-button class="transfer-footer" type="primary" slot="right-footer" @click="returnControlRoot" size="mini">返回控制台</el-button> -->
    </el-transfer>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import store from "../../../_store/index.js";
import commons from "~/utils/common.js";
import _lodash from "lodash";
export default {
  data() {
    return {
      target: [],
      sourceMap: null
    };
  },
  props: ["source", "serviceName", "handler"],
  computed: {
    buildSourceMap: function() {
      var that = this;
      if (this.sourceMap == null) {
        this.sourceMap = {};
        _lodash.forEach(this.source, function(value, index, collection) {
          that.sourceMap[value.key] = value.label;
        });
      }
      return this.sourceMap;
    }
  },
  methods: {
    ...mapActions({
      saveParticipants: store.namespace + "/saveParticipants"
    }),
    saveReadyParticipants: function() {
      var itemId = commons.getRouterParam(this.$route, "itemId");
      var scopeId = commons.getRouterParam(this.$route, "scopeId");
      if (itemId == null || scopeId == null) {
        this.$message({ message: "访问规则异常" });
        return;
      }
      var submitBean = {
        scopeId: scopeId,
        itemId: itemId,
        serviceName: this.serviceName
      };
      var participants = [];
      var that = this;
      _lodash.forEach(this.target, function(value, index, collection) {
        var participant = {};
        participant.participantId = value;
        participant.participantName = that.buildSourceMap[value];
        participants.push(participant);
      });
      submitBean.participants = participants;
      this.saveParticipants(submitBean).then(result => {
        this.$router.push({
          path: "/project/control",
          query: {
            scopeId: scopeId
          }
        });
      });
    },
    returnControlRoot: function() {
      var scopeId = commons.getRouterParam(this.$route, "scopeId");
      this.$router.push({
        path: "/project/control",
        query: {
          scopeId: scopeId
        }
      });
    }
  }
};
</script>
<style scoped>
.transfer-footer {
  margin-left: 10px;
  padding: 6px 5px;
}
.el-transfer-panel__body {
  height: 600px;
}
</style>