<template>
  <page>
    <div slot="title">创建系统对象</div>
    <div slot="panel"> <br/>
      <el-form :model="formData" size="small" label-width="80px" style="width:400px">
        <el-form-item label="编号">
          <el-input v-model="formData.sysCode" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formData.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
      <br/>
    </div> <br/>
  </page>
</template>

<script>
import select from "../info/_components/select";
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "../_store/index.js";
import moment from "moment";
Vue.use(Element);
export default {
  components: {
    "elx-select": select
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  data() {
    return {
      formData: {
        sysCode: "",
        name: ""
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      var requestData = {
        sysCode: this.formData.sysCode,
        name: this.formData.name
      };
      this.createBaseClassify(requestData).then(response => {
        this.$message.success("保存成功");
        this.$router.go(-1);
      });
    },
    ...mapActions({
      createBaseClassify: store.namespace + "/createBaseClassify"
    })
  }
};
</script>

<style scoped>
</style>

