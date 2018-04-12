import bashPath from '../bashPath.js'
var requestPath = {
      	queryUserAuthInfoList: bashPath + '/userAuth/queryUserAuthInfoList.do',
      	getDictByDictNames: bashPath + '/systemConfApi/getDictByDictNames.do',
      	getUserAuthInfoById: bashPath + '/userAuth/getUserAuthInfoById.do',
      	checkAuth: bashPath + '/userAuth/checkAuth.do',
      	updateUserAuth: bashPath + '/userAuth/updateUserAuth.do',
      	queryNodeList: bashPath + '/userAuth/queryNodeList.do',
      	queryUserObjectList: bashPath + '/userAuth/queryUserObjectList.do',
      	queryUserMember: bashPath + '/userAuth/queryUserMember.do',
      	saveUserAuth: bashPath + '/userAuth/saveUserAuth.do',
      	getItemBeanList: bashPath + '/userAuth/getItemBeanList.do'
}
export default requestPath
