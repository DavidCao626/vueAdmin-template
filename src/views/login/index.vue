<template>
  <div class="form-container">
    <div class="title">
      <div style="width: 95%;margin: 0 auto;">

         <svg-icon  icon-class="logo2" style="height:60px;width: 470px;margin-top: 8px;" ></svg-icon>
      </div>
      <!--	<h3>学生工作管理系统</h3>-->
    </div>
    <el-card class="box-card  login-form ">
      <div slot="header" class="clearfix">
        <span>{{$t('login.title')}}</span>
        <!-- <div style="float: right;" type="text"> <lang-select class="lang"></lang-select></div> -->
      </div>

      <br />
      <el-form id="loginForm" :model="ruleLoginForm" status-icon :rules="rules2" ref="ruleLoginForm" label-width="80px" label-position="left">

        <el-form-item :label="$t('login.username')" prop="username">
          <el-input v-model="ruleLoginForm.username" name="loginName" :placeholder="$t('login.usernamePor')"></el-input>
        </el-form-item>

        <el-form-item :label="$t('login.password')" prop="pass">
          <el-input type="password" v-model="ruleLoginForm.pass" name="pwd" :placeholder="$t('login.passwordPor')"></el-input>

        </el-form-item>
        <br />
        <el-form-item>
          <el-button type="success" size="medium" @click="submitForm('ruleLoginForm')" v-waves>{{$t('login.logIn')}}</el-button>
          <!-- <el-button type="text">忘记密码?</el-button> -->
          &nbsp;&nbsp;
          <!-- <router-link to="/register">
					<el-button style="" type="text"> {{$t('login.register')}}</el-button>
				</router-link> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
	
	
<script>
import waves from "~/directive/waves"; // 水波纹指令
import LangSelect from "~/components/LangSelect";
export default {
  directives: {
    waves
  },
  components: {
    LangSelect
  },
  data() {
    return {
      ShowStateBit: 1,
      serverMessage: {
        exType: "error",
        message: "登录失败",
        code: "123",
        msgData: "用户名或密码不存在"
      },
      ruleLoginForm: {
        pass: "123456",
        username: "user1"
      },
      rules2: {
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 14, message: "长度在4 到 14 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("Login", this.ruleLoginForm)
            .then(() => {
              this.$router.push({ path: "/" });
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" >
.lang .svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
body,
html {
  margin: 0px;
  padding: 0px;
}
.form-container {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/bg.jpg);
  background-size: cover;
  background-position: 0 55%;
  position: fixed;
  background-color: #fff;
  .title {
    /*font-size: 21px; */
    position: absolute;
    right: 0;
    top: 0px;
    /* color: #fff; */
    /* font-weight: 600; */
    /* font-family: "\5B8B\4F53"; */
    /* background-color: #ed6535; */
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.19) 1px 7px 8px 0px;
    padding: 10px;
    opacity: 0.6;
    /* background: #0c9bea; */
    background-color: #2c424e;
    /* background-image: linear-gradient(#4e69a2, #3b5998 50%); */

    div {
      margin-left: 80px;
      margin-top: 20px;
      opacity: 0.8;
    }
  }
  .login-form {
    position: absolute;
    right: 15%;
    top: 450px;
    -webkit-transform: translatey(-60%);
    /* transform: translatey(-60%); */
    width: 350px;
    /* -webkit-box-shadow: 0px 5px 20px 0px #3b1900; */
    /* box-shadow: 0px 5px 20px 0px #3b1900; */
  }
}
</style>