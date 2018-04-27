import bashPath from '../bashPath.js'
var requestPath = {
      	queryStaffBaseInfoList: bashPath + '/staff/queryStaffBaseInfoList.do',
      	getDictByDictNames: bashPath + '/systemConfApi/getDictByDictNames.do',
      	getNativePlaceData: bashPath + '/studentInfo/queryNativePlace.do',
      	insertStaffBaseInfo: bashPath + '/staff/insertStaffBaseInfo.do',
      	deleteStaffBaseInfo: bashPath + '/staff/deleteStaffBaseInfo.do',
      	updateStaffBaseInfo: bashPath + '/staff/updateStaffBaseInfo.do',
      	queryStaffBaseInfoById: bashPath + '/staff/queryStaffBaseInfoById.do',
      	deleteMStaffBaseInfo: bashPath + '/staff/deleteMStaffBaseInfo.do',
      	checkStaffBaseInfo: bashPath + '/staff/checkStaffBaseInfo.do',
      	// 查询指定id的职工在职信息，编辑加载原始数据
      	queryStaffUniversityInfoById: bashPath + '/staff/queryStaffUniversityInfoById.do',
      	submitStaffInfo: bashPath + '/staff/submitStaffInfo.do',
      	checkStaffInfo: bashPath + '/staff/checkStaffInfo.do',
      	getStaffUniversityInfoIdBy: bashPath + '/staff/getStaffUniversityInfoIdBy.do',
      	upLoadStaffIdentityPic: bashPath + '/staff/upLoadStaffIdentityPic.do',
      	// //获取到当前登录职工的所有信息id(基本，在校)
      	getStaffInfoAllId: bashPath + '/staff/getStaffInfoAllId.do',
      	// 职工自己修改基本信息
      	updateStaffBaseInfoSelf: bashPath + '/staff/updateStaffBaseInfoSelf.do',
      	// 职工自己修改在职信息
      	updateStaffUniversityInfoSelf: bashPath + '/staff/updateStaffUniversityInfoSelf.do',

      	queryStaffUserAuth: bashPath + '/staff/queryStaffUserAuth.do',

  queryUserDutyList: bashPath + '/socializeClassify/queryUserDutyListX.do',
  queryDutyList: bashPath + '/staff/queryDutyList.do',
  insertUserDuty: bashPath + '/studentInfo/insertUserDuty.do',
  deleteUserDuty: bashPath + '/socializeClassify/deleteUserDuty.do',
  getUserDutyById: bashPath + '/studentInfo/getUserDutyById.do',
  updateUserDuty: bashPath + '/studentInfo/updateUserDuty.do',
 importFileUrl : bashPath +'/staff/staffExcelReader.do'
}
export default requestPath
