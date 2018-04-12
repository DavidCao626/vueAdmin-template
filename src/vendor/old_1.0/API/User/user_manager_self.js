import bashPath from "../bashPath.js"
var requestPath={
      	/*----------------------用户信息、密码修改------------------*/
      	/*获取当前登录用户的信息*/
      	getUserInfoUrl:bashPath+"/user/getUserInfo.do",
      	/*更新用户信息*/
      	updateUserInfoUrl:bashPath+"/user/updateUserInfo.do",
      	/*修改用户密码*/
      	updateUserPwdUrl:bashPath+"/user/updateUserPwd.do",
      	
      	getLoginUserInfo:bashPath+"/user/getLoginUserInfo.do "
      }
export default requestPath;