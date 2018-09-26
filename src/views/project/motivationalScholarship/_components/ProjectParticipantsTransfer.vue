<template>
  <div>
    <el-transfer filterable filter-placeholder="请输入搜索关键字" v-model="value1" :titles="['我当前的下级节点', '即将生效的节点']" :data="data">
    </el-transfer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import store from "../../_store/index.js";
import commons from '~/utils/common.js';
export default {
  data() {
    return {
      data: [],
      value1: []
    };
  },
  methods: {
    ...mapActions({
      queryChildOrg: store.namespace + "/queryChildOrg"
    }),
    generateData() {
      // Todo ajax查询我的下级可用节点
      this.queryChildOrg().then(response => {
        console.log(["穿梭框", response]);
        var org = response.resBody;
        let data = [];
        for (let i = 0; i < org.length; i++) {
          data.push({
            key: org[i].orgCode,
            label: org[i].orgName
          });
        }
        this.data = data;
      });
    }
  },
  mounted() {
    this.generateData();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  }
};
</script>