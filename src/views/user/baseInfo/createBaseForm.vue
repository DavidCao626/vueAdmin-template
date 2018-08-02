<template>
    <div>
        <h2 @click="goBack">返回</h2><br/>
        <el-form :model="formData" size="small" label-width="80px">
            <el-form-item label="编号">
                <el-input v-model="formData.sysCode" placeholder="编号"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="formData.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
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

