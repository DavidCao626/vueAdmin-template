<template>
  <page>
    <div slot="title">
      修改学生信息
    </div>
    <div slot="panel">
      <!-- <el-row style="margin-bottom: 10px;">账号信息：</el-row> -->
      <!-- <el-row style="margin-bottom: 10px;">在校信息：</el-row> -->
      <el-tabs type="card" size="mini">
        <el-tab-pane label="基本信息">
          <baseform :stuNo="stuNo"></baseform>
        </el-tab-pane>
        <el-tab-pane label="个人信息">
          <geren :stuNo="stuNo"></geren>
        </el-tab-pane>
        <el-tab-pane label="在校信息">
          <zaixiao :stuNo="stuNo"></zaixiao>
        </el-tab-pane>
        <el-tab-pane label="家庭信息">
          <jiating :stuNo="stuNo"></jiating>
        </el-tab-pane>

        <!-- <el-tab-pane label="奖学金信息 ">
          <jiangxuejin></jiangxuejin>
        </el-tab-pane>
        <el-tab-pane label="助学金信息 ">
          <zhuxuejin></zhuxuejin>
        </el-tab-pane>

        <el-tab-pane label="学校资助信息 ">
          <zizhu></zizhu>
        </el-tab-pane>
        <el-tab-pane label="社会资助信息 ">
          <shehuizizhu></shehuizizhu>
        </el-tab-pane>

        <el-tab-pane label="困难学生认定信息 ">
          <kunnan></kunnan>
        </el-tab-pane> -->
      </el-tabs>
    </div>

  </page>
</template>
<script>
import avatar from "~/components/Avatar";
import jiating from "./jiating.vue";
import baseform from "./base.vue";
import biye from "./biye.vue";
import jiangxuejin from "./jiangxuejin.vue";
import zhuxuejin from "./zhuxuejin.vue";
import zizhu from "./zizhu.vue";
import shehuizizhu from "./shehuizizhu.vue";
import kunnan from "./kunnan.vue";
import zaixiao from "./zaixiao.vue";
import geren from "./geren.vue";
export default {
  data() {
    return {
      stuNo:this.$route.query.stuNo,
      activeName: "second",
      form: {
        name: ""
      }
    };
  },
  components: {
    avatar,
    biye,
    jiangxuejin,
    zhuxuejin,
    zizhu,
    shehuizizhu,
    kunnan,
    baseform,
    jiating,
    zaixiao,
    geren
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(["vm.stuNo",to.query.stuNo])
    
    });
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {}
  }
};
</script>