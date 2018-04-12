import bashPath from "../bashPath.js"

var requestPath={
      	/*----------------------职务管理------------------*/
      	/*获取职务列表*/
      	getAllDuty:bashPath+"/duty/getAllDuty.do",
      	/*增加职务*/
      	saveDuty:bashPath+"/duty/insertDuty.do",
      	/*获取角色列表*/
      	getRoles:bashPath+"/systemConfApi/systemRoleList.do",
      	/*获取用户类型列表*/
      	getTargetUserType:bashPath+"/duty/getTargetUserType.do",
      	/*删除职务*/
      	deleteDuty:bashPath+"/duty/deleteDuty.do",
      	/*更新职务*/
      	updateDuty:bashPath+"/duty/updateDuty.do",
      	/*批量删除职务*/
      	deleteMoreDuty:bashPath+"/duty/deleteMoreDuty.do",
      	getDutyById:bashPath+"/duty/getDutyById.do",
      	/*切换职务*/
      	switchDuty:bashPath+"/duty/switchDuty.do"
      }
export default requestPath;