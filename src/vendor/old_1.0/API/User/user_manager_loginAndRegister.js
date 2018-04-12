import bashPath from '../bashPath.js'
var requestPath = {
      	/* ----------------------登录注册------------------*/
      	// 登录
      	loginUrl: bashPath + '/user/login.do',
      	// form登录
      	formloginUrl: bashPath + '/user/ulogin.do',
      	// 注册
      	registerUrl: bashPath + '/user/register.do',
      		// form注册
      	formregisterUrl: bashPath + '/user/uregister.do',
      	// 注销
      	logoutUrl: bashPath + '/user/logout.do'
}
export default requestPath
