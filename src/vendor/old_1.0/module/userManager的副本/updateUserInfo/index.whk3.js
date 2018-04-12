import Vue from 'vue'
import Element from 'element-ui'
import '@/theme/index.css'
import VueExpand from '@/components/VueExpand'
Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
import GraceComponent from '@/ComponentPackage/GraceComponents.js'
import RquestPathConfig from '@/API/User/user_manager_self.js'
import axios from 'axios'
Vue.use(GraceComponent)

var userInfoFormStore = GStoreFactory.buildServiceForm()
var userInfoFormData = GStoreFactory.buildServiceFormData()
userInfoFormData.pushData({
  id: '',
  login_name: '',
  login_pwd: '',
  nick_name: '',
  mobile_phone: '',
  qq: '',
  email: '',
  user_state: '',
  major_duty_id: '',
  register_time: '',
  last_update_time: ''
})
userInfoFormData.pushRules({
  qq: [{
    pattern: /^[0-9]*$/,
    message: '请输入正确的QQ号码',
    trigger: 'blur'
  }],
  /*	email: [{
			validator: GUtils.validSingle("请输入正确的邮箱格式", 'email', false),
			trigger: 'blur'
		}],*/
  email: [{
    pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    message: '请输入正确邮箱格式',
    trigger: 'blur'
  }],
  nick_name: [
    /* {
				required: true,
				message: '请输入昵称',
				trigger: 'blur'
			},*/
    {
      min: 3,
      max: 20,
      message: '昵称长度在 3 到 20 个字符',
      trigger: 'blur'
    }
  ],
  mobile_phone: [
    /* {
				required: true,
				message: '手机号不能为空',
				trigger: 'blur'
			},*/
    {
      min: 11,
      max: 11,
      message: '手机号码长度为11位',
      trigger: 'blur'
    }, {
      pattern: /^[0-9]*$/,
      message: '手机号码只能为数字',
      trigger: 'blur'
    }
  ]
})
userInfoFormStore.addAttr('formData', userInfoFormData)
userInfoFormStore.addConf('loadData', {
  'method': 'post',
  'url': RquestPathConfig.getUserInfoUrl
})
userInfoFormStore.addConf('updateUserInfo', {
  'method': 'post',
  'url': RquestPathConfig.updateUserInfoUrl
})
var vue = new Vue({
  el: '#bodybox',
  data: {
    userInfoFormStore: userInfoFormStore,
    loading: false
  },
  created: function() {
    // this.loading = true;
    console.log(['this.loading', this.loading])
    var axiosConfig = userInfoFormStore.store.conf.loadData
    GUtils.post(axiosConfig.url, {}, function(data) {
      userInfoFormData.data = data.resBody[0].userInfo[0]
      // vue.loading = false;
    })
    //		axios(axiosConfig).then(function(response) {
    //				console.log(["response", response]);
    //				userInfoFormData.data = response.data.body.resBody[0].userInfo[0];
    //
    //				console.log(["vue.loading", vue.loading]);
    //			})
    //			.catch(function(error) {
    //				console.log(error);
    //			});
  },
  methods: {
    test: function() {
      console.log(['this', this])
    },
    saveInfo: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.loading = true;
          var saveDataConfig = userInfoFormStore.store.conf.updateUserInfo
          saveDataConfig.data = {
            'nickName': this.userInfoFormStore.formData.data.nick_name,
            'mobilePhone': this.userInfoFormStore.formData.data.mobile_phone,
            'qq': this.userInfoFormStore.formData.data.qq,
            'email': this.userInfoFormStore.formData.data.email
          }
          GUtils.post(saveDataConfig.url, saveDataConfig.data, function(data) {
            vue.$message({
              showClose: true,
              message: '恭喜你，信息修改成功',
              type: 'success'
            })
            // vue.loading = false;
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
})
