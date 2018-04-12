import bashPath from "../bashPath.js"
var requestPath={
      	/*-------------------------用户菜单渲染--------------------*/
      	/*查询当前用户所属权限菜单信息*/
      	getUserMenu:bashPath+"/systemManagerApi/getUserMenu.do",
      	siteUrl:'/',
      	siteLogin:bashPath+'/module/login.do',
      	siteReg:bashPath+'/module/login.do#/register',
      	
      	
      	/*3.10.查询用户可用职务*/
      	//user/getUserDutyList.do
      	getUserDutyList:bashPath+"/user/getUserDutyList.do",
      	/*切换职务*/
      	switchDuty:bashPath+"/duty/switchDuty.do"
      }
export default requestPath;