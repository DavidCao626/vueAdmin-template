<template>
  <div class="form-container">
    <div class="title">

      <img src="http://xgc.imu.edu.cn/images/logo.png" height="70px">
      <!--	<h3>学生工作管理系统</h3>-->
    </div>
    <el-card class="box-card  login-form ">
      <div slot="header" class="clearfix">
        <span>{{$t('login.title')}}</span>
          <div style="float: right;" type="text"> <lang-select class="lang"></lang-select></div>
      </div>

      <br />
      <el-form id="loginForm" :model="ruleLoginForm" status-icon :rules="rules2" ref="ruleLoginForm" label-width="80px" label-position="left">

        <el-form-item :label="$t('login.username')" prop="username">
          <el-input v-model="ruleLoginForm.username" name="loginName"  :placeholder="$t('login.usernamePor')"></el-input>
        </el-form-item>

        <el-form-item :label="$t('login.password')" prop="pass">
          <el-input type="password" v-model="ruleLoginForm.pass" name="pwd" :placeholder="$t('login.passwordPor')"></el-input>

        </el-form-item>
        <br />
        <el-form-item>
          <el-button   type="success" size="medium" @click="submitForm('ruleLoginForm')" v-waves>{{$t('login.logIn')}}</el-button>
          <!-- <el-button type="text">忘记密码?</el-button> -->
          &nbsp;&nbsp;
        	<router-link to="/register">
					<el-button style="" type="text"> {{$t('login.register')}}</el-button>
				</router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
	
	
<script>
import waves from '~/directive/waves' // 水波纹指令
import LangSelect from '~/components/LangSelect'
export default {
  directives: {
    waves
  },
  components: {
    LangSelect
  },
  data() {
    return {
      ShowStateBit:1,
      serverMessage: {
        exType: 'error',
        message: '登录失败',
        code: '123',
        msgData: '用户名或密码不存在'
      },
      ruleLoginForm: {
        pass: '123456',
        username: 'user1'
      },
      rules2: {
        pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 14, message: '长度在4 到 14 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('Login', this.ruleLoginForm)
            .then(() => {
              this.$router.push({ path: '/' })
            })
            .catch(() => {})
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" >
.lang .svg-icon{
  
    width: 1em;
    height: 1em;
    vertical-align: -.15em;
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

  background-image: url("http://news.imu.edu.cn/images/17/08/25/1aw2kev8i5/10.jpg");

  background-size: cover;
  background-position: center;
  position: fixed;
  .title {
    font-size: 21px;
    position: absolute;
    right: 155px;
    top: 130px;
    color: #fff;
    font-weight: 600;
    font-family: "宋体";

    div {
      margin-left: 80px;
      margin-top: 20px;
      opacity: 0.8;
    }
  }
  .login-form {
    position: absolute;
    right: 280px;
    top: 50%;
    transform: translatey(-60%);
    width: 350px;
    box-shadow: 0px 5px 20px 0px #3b1900;
  }
}
</style>