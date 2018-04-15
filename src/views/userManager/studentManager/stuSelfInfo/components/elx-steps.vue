<template>

	<div class="container_box">
		<div class="main_hd">
			<h3>学生信息</h3>
		</div>
		<div class="main_bd">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<el-steps :active="active" finish-status="success">
						<el-step title="基本信息"></el-step>
						<el-step title="个人信息"></el-step>
						<el-step title="在校信息"></el-step>
					</el-steps>
				</div>

				<div v-show="active==0">
					<stu-base-info  @form1="form1ok" :loadOrg="loadOrg" :rule="ruleNum" @ruleM="next"></stu-base-info>
				</div>
				<div v-show="active==1">
					<stu-personal-info  @form1="form1ok" :rule="ruleNum" @ruleM="next"></stu-personal-info>
				</div>
				<div v-show="active==2">
					<stu-university-info  @form1="form1ok" :loadOrg="loadOrg" :rule="ruleNum" @ruleM="next"></stu-university-info>
				</div>
				<div v-show="active>2">
					<div>
						
						<div style="color: red;">提交后无法进行修改,请确认!</div>	
					</div>
				</div>

				<div class="footer">
					<template v-if="active==3">
						<el-button type="success" @click="subForm">确认提交</el-button>

					</template>
					<template v-else>
						<el-button type="info" plain @click="nextb">下一步</el-button>

					</template>

					<template v-if="active > 0">
						<el-button @click="backStep">上一步</el-button>
					</template>
				</div>
			</el-card>
		</div>
	</div>

</template>

<script>
	import Vue from 'vue'
	import Element from 'element-ui'
	import '@/theme/index.css'
	// import '@/styles/app.scss'
	import VueExpand from '@/components/VueExpand'
	Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
	import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
	import GraceComponent from '@/ComponentPackage/GraceComponents.js'
	import dataPath from '@/API/Student/student_info_manager.js'
	import reqPath from '@/API/System/SystemManagerApi.js'
	Vue.use(GraceComponent)
import axios from 'axios'
	import {
	  Loading
	} from 'element-ui'
import RquestUserPathConfig from '@/API/User/user_manager_self.js' // 演示接口
	import stuBaseInfo from './stuBaseInfo.vue'
import stuPersonalInfo from './stuPersonalInfo.vue'
import stuUniversityInfo from './stuUniversityInfo.vue'

var loadOrg = {}
loadOrg.orgCode = ''
export default {
	  components: {
	    stuBaseInfo,
	    stuPersonalInfo,
	    stuUniversityInfo
	  },
	  data() {
	    return {
	      loadOrg,
	      active: 0,
	      submitArray: {},
	      // sub: 0,
	      ruleNum: 999
	    }
  },
	  methods: {
	    form1ok(dataName, data) {
	      console.log(data)
	      switch (dataName) {
	        case 'baseInfo':
	          this.submitArray.baseInfo = data
	          break
        case 'personalForm':
	          this.submitArray.personalInfo = data
	          break
        case 'universityForm':
	          this.submitArray.universityInfo = data
	          break
        default:
	          break
      }
	    },
	    nextb() {
	      this.ruleNum = this.active

	      // this.next();
	    },
	    next() {
	      // this.active++
	      console.log(['sArr', this.submitArray])
	      console.log(['sArrl', this.submitArray])
	      if (this.active++ > 2) this.active = 3
	    },
	    backStep() {
	      this.active--
	    },
	    subForm() {
	      this.sub = 1
	      GUtils.requestBody(dataPath.submitStudentInfo, this.submitArray, function(data) {
	        console.log(['submit', 'submitData'])
	        alert('提交成功')
      })
	    }
	  },
	  watch: {
	    submitArray: function() {}
	  }
	}
</script>

<style scoped>
	.container_box {
		width: 150vh;
	}
	
	.footer {
		margin: 15px auto;
		width: 150vh;
	}
</style>