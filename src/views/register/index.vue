<template>
	<div class="form-container">
		<div class="title">
		
		<img src="http://xgc.imu.edu.cn/images/logo.png" height="70px">
		</div>
		<el-card class="box-card  login-form ">
			<div slot="header" class="clearfix">
			    <span>新用户注册</span>
			    <router-link to="/"> <el-button style="float: right; padding: 3px 0" type="text"> 返回登录</el-button></router-link>
			  </div>
	
		  	<br />
			<el-form id="loginForm" :model="ruleLoginForm" status-icon  :rules="rules2" ref="ruleLoginForm" label-width="80px" label-position="left"  method="post">
				
				<el-form-item label="用户名：" prop="username">
				    <el-input v-model="ruleLoginForm.username" name="loginName" autocomplete="on"  value="&nbsp;" placeholder="填写你的账号 最少4位"></el-input>
				</el-form-item>
				
				<el-form-item label="密码：" prop="pass">
					<el-input type="password" v-model="ruleLoginForm.pass" name="pwd" autocomplete="off" placeholder="填写你的密码"></el-input>
				</el-form-item>
				
				 <el-form-item label="确认密码" prop="checkPass"  :required="true">
   					 <el-input type="password" name="tpwd" v-model="ruleLoginForm.checkPass" auto-complete="off"></el-input>
				  </el-form-item>

			<br />
				<el-form-item>
					<el-button type="danger" @click="submitForm('ruleLoginForm')">提交注册</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>


<script>

export default {
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleLoginForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      serverMessage: {
        exType: 'error',
        message: '登录失败',
        code: '123',
        msgData: '用户名或密码不存在'
      },
      ruleLoginForm: {
        pass: '',
        username: '',
        checkPass: ''
      },
      rules2: {
        pass: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 6,
          message: '密码长度最少6位',
          trigger: 'blur'
        }],
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 4,
          max: 14,
          message: '长度在4 到 14 个字符',
          trigger: 'blur'
        }
        ],
        checkPass: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('Register', this.ruleLoginForm).then(() => {
            this.$router.push({ path: '/login' })
          }).catch(() => {

          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
 .form-container {
 	width: 100%;
	height: 100%;
	background-image: url('https://file.iviewui.com/iview-admin/login_bg.jpg');
	background-size: cover;
	background-position: center;
	position: fixed;
	.title {
        font-size: 21px;
        position: absolute;
		left: 70px;
		top: 60px;
    }
    .login-form {
	    position: absolute;
		right:280px;
		top: 53%;
		transform: translatey(-60%);
		width: 350px;
		box-shadow:0px 5px 20px 0px #3b1900;
    }
}
</style>