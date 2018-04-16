<template>

		<div id="bodybox">
			<div style="" v-loading="loading">
				<el-form ref="form1" label-width="100px" size="mini" :model="formStore.formData.data" :rules="formStore.formData.rules">
					
					<el-form-item label="旧密码" prop="oldPwd">
						<el-input type="password" v-model="formStore.formData.data.oldPwd" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="新密码" prop="newPwd">
						<el-input type="password" v-model="formStore.formData.data.newPwd" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="确认新密码" prop="tNewPwd">
						<el-input type="password" v-model="formStore.formData.data.tNewPwd" size="mini"></el-input>
					</el-form-item>
					<el-form-item>
						<el-row :gutter="10">
							<el-col :span="20"><pre> </pre></el-col>
							<el-col :span="4">
								<el-button icon="el-icon-check" size="mini" type="success" @click="saveInfo('form1')">确定</el-button>
							</el-col>
						</el-row>
					</el-form-item>
				</el-form>
			</div>
		</div>

</template>
<script>
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
// var pwdValidate = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error('请再次输入密码'))
//   } else if (value !== vue.formStore.formData.data.newPwd) {
//     callback(new Error('两次输入密码不一致!'))
//   } else {
//     callback()
//   }
// }

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
  }
    //   , {
    //     validator: ,
    //     trigger: 'blur'
    //   }
  ]

})
formStore.addAttr('formData', formData)
formStore.addConf('submitData', {
  'method': 'post',
  'url': RquestPathConfig.updateUserPwdUrl
})

export default {
  data() {
    return { formStore: formStore,
      loading: false }
  },
  methods: {
    saveInfo: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          var that = this
          var axiosConfig = this.formStore.store.conf.submitData
          axiosConfig.data = this.formStore.formData.data

          GUtils.post(RquestPathConfig.updateUserPwdUrl,axiosConfig.data,function(data){
             that.$message({
                showClose: true,
                message: '恭喜你，密码修改成功',
                type: 'success'
              })
          });
     
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
}
</script>
