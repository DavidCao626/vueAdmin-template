<template>
  <div>

    <page>
      <el-form size="mini" :model="formStore.formData.data" disabled label-width="120px">
        <el-form-item label="登录名">
          <el-input size="mini" v-model="showData.auth_user_name"></el-input>
        </el-form-item>
        <el-form-item label="管理节点">
          <el-input size="mini" v-model="showData.manager_node_name"></el-input>
        </el-form-item>
        <el-form-item label="职务">
          <el-input size="mini" v-model="showData.duty_name"></el-input>
        </el-form-item>
        <el-form-item label="用户对象">
          <el-input size="mini" v-model="showData.user_object_name"></el-input>
        </el-form-item>
        <auth-body></auth-body>
      </el-form>

      <el-dialog title="认证备注" :visible.sync="authMessageFormDV" width="30vw" top="8vh">
        <el-form size="mini" :model="authFormStore.formData.data" ref="authForm" :rules="authFormStore.formData.rules" label-width="80px">
          <el-form-item label="认证备注">
            <el-input type="textarea" size="mini" v-model="authFormStore.formData.data.msg"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="sauthMessage('authForm')">确 定</el-button>
        </span>
      </el-dialog>

        <el-button size="small" @click="sAuth('Y')">通 过</el-button>
        <el-button size="small" @click="sAuth('N')">不通过</el-button>
    </page>
  </div>
</template>

<script>
import Vue from "vue";
import Element from "element-ui";
import "@/theme/index.css";
import VueExpand from "@/components/VueExpand";
Vue.use(Element);
Vue.use(VueExpand);

import { mapGetters, mapActions } from "vuex";
import store from "../_store/index.js";
import moment from "moment";

import GUtils from "@/components/Utils.js";
import GStoreFactory from "@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js";
import GraceComponent from "@/ComponentPackage/GraceComponents.js";
import dataPath from "@/API/UserAuth/User_Auth_Info.js";
import inputCom from "@/module/revolution-vue/element-proxy/ItemListElement/resolver.js";
Vue.use(GraceComponent);
var requestData = {
  dicts: ["check_flag", "authState"]
};
var dictData = {};
GUtils.post(dataPath.getDictByDictNames, requestData, function(data) {
  dictData = data.resBody;
});

var formStore = GStoreFactory.buildServiceForm();
var formDataStore = GStoreFactory.buildServiceFormData();
formDataStore.pushData({
  auth_user_name: "",
  manager_node_name: "",
  duty_name: "",
  user_object_name: ""
});
formStore.addAttr("formData", formDataStore);
var authFormStore = GStoreFactory.buildServiceForm();
var authFormDataStore = GStoreFactory.buildServiceFormData();
authFormDataStore.pushData({
  msg: ""
});
authFormStore.addAttr("formData", authFormDataStore);
export default {
  props: {
    authUserInfoDVp: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "auth-body": inputCom
  },
  data() {
    return {
      inp: inputCom,
      formStore,
      authFormStore,
      authMessageFormDV: false,
      authUserInfoDV: false,
      state: ""
    };
  },
  computed: {
    showData() {
      this.inp
        .getResolver()
        .bindDataSource(
          this.$store.getters[store.namespace + "/getUserAuthData"].auth_body
        );
      this.inp
        .getResolver()
        .changeItems(
          this.$store.getters[store.namespace + "/getUserAuthData"].itemBeanList
            .items
        );
      return this.$store.getters[store.namespace + "/getUserAuthData"];
    }
  },
  watch: {
    authUserInfoDVp() {
      this.authUserInfoDV = this.authUserInfoDVp;
    },
    showData() {
      console.log(["watchShowData", showData]);
      this.inp.getResolver().bindDataSource(this.showData.auth_body);
      this.inp.getResolver().changeItems(this.showData.itemBeanList.items);
    }
  },
  methods: {
    sAuth: function(state) {
      this.authMessageFormDV = true;
      this.state = state;
    },
    sauthMessage: function(formName) {
      this.authMessageFormDV = false;
      var that = this;
      GUtils.post(
        dataPath.checkAuth,
        {
          id: this.showData.id,
          state: this.state,
          msg: this.authFormStore.formData.data.msg
        },
        function(data) {
         that.$message.success("操作成功")
         that.$router.go(-1)
        }
      );
    },
    h() {
      this.authUserInfoDV = false;
      this.$emit("diafalse", false);
    }
  },
  mounted: function() {}
};
</script>

<style>
</style>