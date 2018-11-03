<template>
	<el-dropdown class="header-dropdown-devin" @command="handleCommand" trigger="click"> <span class="el-dropdown-link"> <el-tooltip class="item" effect="dark" content="切换角色" placement="bottom"> <el-button type="text" size="small"><i><img src="/static/roles.png" alt="切换角色" class="role-avar"/></i></el-button> </el-tooltip> </span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item disabled> <i class="el-icon-info" style="margin-right:15px"></i>成员职务</el-dropdown-item>
			<template v-for="item in  MemberDutyList">
					<el-dropdown-item divided :command="item"> {{item.managerNodeName}}
					<i class="el-icon-circle-check" v-if="item.currently"></i>
					<p> <span v-if="item.officeOrgName"> {{item.officeOrgName}}/</span> {{ item.dutyName }}</p>
				</el-dropdown-item>
			</template>
			<el-dropdown-item disabled><i class="el-icon-info" style="margin-right:15px"></i>任职职务</el-dropdown-item>
			<template v-for="item in  AppointDutyList">
				<el-dropdown-item divided :command="item"> 
					{{item.managerNodeName}}<i class="el-icon-circle-check" v-if="item.currently"></i>
					<p> <span v-if="item.officeOrgName"> {{item.officeOrgName}}/</span> {{ item.dutyName }}</p>
				</el-dropdown-item>
			</template>
		</el-dropdown-menu>
	</el-dropdown>
</template>
<script>
	import axios from 'axios'
	import {
	  Loading
	}

	from 'element-ui'
import RquestPathConfig from '@/API/User/user_layout_menu.js'
	import GUtils from '@/components/Utils.js'
	var MemberDutyList = []
var AppointDutyList = []
GUtils.post(RquestPathConfig.getUserDutyList, {},
	  function(data) {
	    var members = data.resBody.MEMBER
	    for (var i = 0; i < members.length; i++) {
	      MemberDutyList.push(members[i])
	    }
	    var appoints = data.resBody.APPOINT
	    for (var i = 0; i < appoints.length; i++) {
	      AppointDutyList.push(appoints[i])
	    }
	  }

	)
export default {
	  data() {
	    return {
	      MemberDutyList: MemberDutyList,
	      AppointDutyList: AppointDutyList
	    }
  },
	  methods: {
	    getMenuforServer: function() {
	  //    var loadingVars = Loading.service({
	   //     fullscreen: true
	   //   })
	      const t = this
	      axios({
	        // 获取用户菜单
	        'url': RquestPathConfig.getUserDutyList,
	        'method': 'get'
	      }).then(function(response) {
	        console.log(['切换职务列表', response.data])
	   //     loadingVars.close()
	      }).catch(function(error) {
	        console.log('接口异常' + error)
	      })
	    },
	    handleCommand: function(item) {
	      if (item.currently == true) {
	        return
      }
	      var postData = {
	        'dutyCode': item.dutyCode,
	        'managerNodeCode': item.managerNodeCode,
	        'officeOrgCode': item.officeOrgCode,
	        'classifyCode': item.classifyCode,
	        'resigId': item.resigId
	      }
	      var that = this
      GUtils.post(RquestPathConfig.switchDuty, postData, function(data) {
	        var result = data.resBody
	        if (result.status == 'Y') {
							 that.$message('职务切换成功！' + result.type)
						 item.currently = true
        } else {
	          that.$message(result.message)
	        }
	      })
	    }
	  },
	  mounted: function() {
	    this.$nextTick(function() {
	      this.getMenuforServer()
	    })
	  }
	}
</script>
<style scoped>
	.role-avar {
		height: 20px;
	}
	
	li i {
		height: 10px;
		line-height: 0px;
		color: green;
	}
</style>