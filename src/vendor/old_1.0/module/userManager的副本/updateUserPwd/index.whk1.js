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

// 验证两次密码是否一致
var pwdValidate = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== vue.formStore.formData.data.newPwd) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

var formStore = GStoreFactory.buildServiceForm()
var formData = GStoreFactory.buildServiceFormData()
formData.pushData({
  oldPwd: '',
  newPwd: '',
  tNewPwd: ''
})
formData.pushRules({
  oldPwd: [{
    required: true,
    message: '请输入旧密码',
    trigger: 'blur'
  }, {
    min: 6,
    max: 18,
    message: '长度在 6 到 18 个字符',
    trigger: 'blur'
  }],
  newPwd: [{
    required: true,
    message: '请输入新密码',
    trigger: 'blur'
  }, {
    min: 6,
    max: 18,
    message: '长度在 6 到 18 个字符',
    trigger: 'blur'
  }],
  tNewPwd: [{
    required: true,
    message: '请输入确认密码',
    trigger: 'blur'
  }, {
    min: 6,
    max: 18,
    message: '长度在 6 到 18 个字符',
    trigger: 'blur'
  }, {
    validator: pwdValidate,
    trigger: 'blur'
  }]

})
formStore.addAttr('formData', formData)
formStore.addConf('submitData', {
  'method': 'post',
  'url': RquestPathConfig.updateUserPwdUrl
})

var vue = new Vue({
  el: '#bodybox',
  data: {
    formStore: formStore,
    loading: false
  },
  methods: {
    saveInfo: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          var axiosConfig = this.formStore.store.conf.submitData
          axiosConfig.data = this.formStore.formData.data
          axios(axiosConfig).then(function(response) {
            vue.loading = false
            console.log(['response', response])
            if (response.data.length == 0) {
              vue.$message({
                showClose: true,
                message: '恭喜你，密码修改成功',
                type: 'success'
              })
            } else {
              vue.$message({
                showClose: true,
                message: response.data.body.message,
                type: 'error'
              })
            }
          })
            .catch(function(error) {
              vue.loading = false
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    test: function() {
      console.log(['test', this])
    }
  }
})
