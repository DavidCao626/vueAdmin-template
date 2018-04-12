import bashPath from "../bashPath.js"
var requestPath={

      	
      	/*----------------------用户管理------------------*/
      	/*删除单一用户*/
      	deleteUserUrl:bashPath+"/userc/deleteUser.do",
      	/*获取用户列表*/
      	getUserStoreUrl:bashPath+"/userc/getUser.do",
      	/*增加用户*/
      	addUserStoreUrl:bashPath+"/user/saveUser.do",
      	/*更新用户信息*/
      	updateUserUrl:bashPath+"/user/updateUser.do",
      	/*批量删除用户*/
      	deleteMoreUrl:bashPath+"/userc/delMoreUser.do",
      	/*重置用户密码*/
      	resetUserPwdUrl:bashPath+"/userc/resetPwd.do",
      	/*获取用户担任职务列表*/
      	getUserDutyUrl:bashPath+"/user/getUserDuty.do",
      	/*删除用户担任的职务*/
      	deleteUserDutyUrl:bashPath+"/user/deleteUserDuty.do",
      	/*获取组织列表*/
      	getOrgsUrl:bashPath+"/user/getOrgList.do",
      	/*获取可用职务列表*/
      	getDutyListUrl:bashPath+"/user/getDutyList.do",
      	/*保存用户分配的职务*/
      	saveUserDutyUrl:bashPath+"/user/saveUserDuty.do",
      	/*更新用户职务*/
      	updateUserDutyUrl:bashPath+"/user/updateUserDuty.do",
      	/*查询用户职务*/
      	getUserDutyByIdUrl:bashPath+"/user/getUserDutyById.do"
      }
export default requestPath;