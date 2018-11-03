<template>
  <page>
    <div slot="title">新建职工</div>

    <div slot="panel">
      <h2 @click="goBack"></h2><br />
      <el-form :model="formData" size="small" label-width="80px" style="width:400px;">
        <el-form-item label="职工编号:">
          <el-input v-model="formData.staffCode" placeholder="职工编号"></el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input v-model="formData.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="formData.phone" placeholder="手机号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
      <br />
      <br />
    </div>
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
        staffCode: "",
        name: "",
        phone: ""
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      var requestData = {
        staffCode: this.formData.staffCode,
        name: this.formData.name,
        phone: this.formData.phone
      };
      this.createStaff(requestData).then(response => {
        this.$message.success("保存成功");
        this.$router.go(-1);
      });
    },
    ...mapActions({
      createStaff: store.namespace + "/createStaff"
    })
  }
};
</script>

<style scoped>
</style>

