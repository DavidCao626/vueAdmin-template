<template>
  <page id="bodybox" style="width: 400px;">
    <span slot="title">账户详情</span>
    <div slot="panel" >
          <div v-loading="loading">
            <el-form style="width: 90%;" ref="form1" label-width="80px" size="mini" :model="userInfoFormStore.formData.data" :rules="userInfoFormStore.formData.rules">
              <el-form-item label="登录名" prop="login_name">
                <el-input size="mini" v-model="userInfoFormStore.formData.data.login_name" disabled></el-input>
              </el-form-item>
              <el-form-item label="用户昵称" prop="nick_name">
                <el-input size="mini" v-model="userInfoFormStore.formData.data.nick_name"></el-input>
              </el-form-item>
              <el-form-item label="移动电话" prop="mobile_phone">
                <el-input size="mini" v-model="userInfoFormStore.formData.data.mobile_phone"></el-input>
              </el-form-item>
              <el-form-item label="QQ号码" prop="qq">
                <el-input size="mini" v-model="userInfoFormStore.formData.data.qq"></el-input>
              </el-form-item>
              <el-form-item label="电子邮件" prop="email">
                <el-input size="mini" v-model="userInfoFormStore.formData.data.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-check" type="primary" style="width: 100%;    margin-top: 10px;" @click="saveInfo('form1')">保存资料</el-button>
              </el-form-item>
            </el-form>
          </div>

    </div>

  </page>
</template>

<script>
import Vue from "vue";
import Element from "element-ui";
import "@/theme/index.css";
import VueExpand from "@/components/VueExpand";
Vue.use(Element);
Vue.use(VueExpand);
import GUtils from "@/components/Utils.js";
import GStoreFactory from "@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js";
import GraceComponent from "@/ComponentPackage/GraceComponents.js";
import RquestPathConfig from "@/API/User/user_manager_self.js";
import axios from "axios";
import avatar from "~/components/Avatar";
Vue.use(GraceComponent);

var userInfoFormStore = GStoreFactory.buildServiceForm();
var userInfoFormData = GStoreFactory.buildServiceFormData();
userInfoFormData.pushData({
  id: "",
  login_name: "",
  login_pwd: "",
  nick_name: "",
  mobile_phone: "",
  qq: "",
  email: "",
  user_state: "",
  major_duty_id: "",
  register_time: "",
  last_update_time: ""
});
userInfoFormData.pushRules({
  qq: [
    {
      pattern: /^[0-9]*$/,
      message: "请输入正确的QQ号码",
      trigger: "blur"
    }
  ],
  email: [
    {
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      message: "请输入正确邮箱格式",
      trigger: "blur"
    }
  ],
  nick_name: [
    {
      min: 3,
      max: 20,
      message: "昵称长度在 3 到 20 个字符",
      trigger: "blur"
    }
  ],
  mobile_phone: [
    {
      min: 11,
      max: 11,
      message: "手机号码长度为11位",
      trigger: "blur"
    },
    {
      pattern: /^[0-9]*$/,
      message: "手机号码只能为数字",
      trigger: "blur"
    }
  ]
});
userInfoFormStore.addAttr("formData", userInfoFormData);
userInfoFormStore.addConf("loadData", {
  method: "post",
  url: RquestPathConfig.getUserInfoUrl
});
userInfoFormStore.addConf("updateUserInfo", {
  method: "post",
  url: RquestPathConfig.updateUserInfoUrl
});
export default {
  components: {
    avatar
  },
  data() {
    return {
      userInfoFormStore: userInfoFormStore,
      loading: false
    };
  },
  created: function() {
    console.log(["this.loading", this.loading]);
    var axiosConfig = userInfoFormStore.store.conf.loadData;
    GUtils.post(axiosConfig.url, {}, function(data) {
      userInfoFormData.data = data.resBody[0].userInfo[0];
    });
  },
  methods: {
    onSuccess(obj) {
      console.log(["obj", obj]);
    },
    test: function() {
      console.log(["this", this]);
    },
    saveInfo: function(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.loading = true;
          var saveDataConfig = userInfoFormStore.store.conf.updateUserInfo;
          saveDataConfig.data = {
            nickName: this.userInfoFormStore.formData.data.nick_name,
            mobilePhone: this.userInfoFormStore.formData.data.mobile_phone,
            qq: this.userInfoFormStore.formData.data.qq,
            email: this.userInfoFormStore.formData.data.email
          };
          GUtils.post(saveDataConfig.url, saveDataConfig.data, function(data) {
            that.$message({
              showClose: true,
              message: "恭喜你，信息修改成功",
              type: "success"
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
