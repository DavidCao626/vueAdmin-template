<template>

	<div class="container_box">
		<div class="main_hd">
			<h3>模块名称</h3>
		</div>
		<div class="main_bd">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<el-steps :active="active" finish-status="success">
						<el-step title="步骤 1"></el-step>
						<el-step title="步骤 2"></el-step>
						<el-step title="步骤 3"></el-step>
					</el-steps>
				</div>

				<div v-if="active==0">
					0:第1步显示区域
				</div>
				<div v-else-if="active==1">
					1:第2步显示区域
				</div>
				<div v-else-if="active==2">
					2:第3步显示区域
				</div>
				<div v-else>
					3:第4步显示区域
				</div>

				<div class="footer">
					<template v-if="active==3">
						<el-button type="success"@click="subForm">确认提交</el-button>
    				
					</template>
					<template v-else>
						<el-button type="info" plain @click="next">下一步</el-button>
						
					</template>
					
					<template v-if="active > 0">
						<el-button  @click="backStep">返回</el-button>
					</template>
				</div>
			</el-card>
		</div>
	</div>

</template>

<script>
	import axios from 'axios'
	import {
	  Loading
	} from 'element-ui'
import RquestUserPathConfig from '@/API/User/user_manager_self.js'// 演示接口
	export default {
	  data() {
	    return {
	      active: 0,
	      submitArray: []
	    }
  },

	  methods: {
	    form0(va) {
	      submitArray.push(ba)
	    },
	    next() {
	      if (this.active++ > 2) this.active = 3
	    },
	    backStep() {
	      this.active--
	    },
	    subForm() {
	      var loadingVars = Loading.service({
	        fullscreen: true
	      })
	      const ajaxThis = this
	      axios({ // 获取用户菜单
	        'url': RquestUserPathConfig.getLoginUserInfo,
	        'method': 'get'
	        // 'data':this.submitArray;  需要数组转json
	      }).then(function(response) {
	        console.log(response.data)

	        loadingVars.close()
	      }).catch(function(error) {
	        console.log('接口异常' + error)
	      })
	    }
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