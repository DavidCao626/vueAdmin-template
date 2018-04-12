import bashPath from '../bashPath.js'
var requestPath = {
  // 查询基础用户对象列表错误
  queryData: bashPath + '/socializeClassify/queryData.do',

  getDictByDictNames: bashPath + '/systemConfApi/getDictByDictNames.do',
  queryUserDutyList: bashPath + '/socializeClassify/queryUserDutyList.do',
  queryDutyList: bashPath + '/socializeClassify/queryDutyList.do',
  insertUserDuty: bashPath + '/socializeClassify/insertUserDuty.do',
  deleteUserDuty: bashPath + '/socializeClassify/deleteUserDuty.do',
  getUserDutyById: bashPath + '/socializeClassify/getUserDutyById.do',
  updateUserDuty: bashPath + '/socializeClassify/updateUserDuty.do'
}
export default requestPath
