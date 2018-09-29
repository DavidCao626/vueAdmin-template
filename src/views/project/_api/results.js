import request from "~/utils/request";
import ajax from "~/utils/ajax";
//获取数据
const getCurrentOrgListAndOwner = data =>
  request({
    url: "/systemManagerApi/getCurrentOrgListAndOwner.do",
    method: "post",
    data: data
  });
//查询学年列表(下拉框)
const querySchoolYearDict = data =>
  request({
    url: "/schoolYear/querySchoolYearDict.do",
    method: "post",
    data: data
  });
export default {
  getCurrentOrgListAndOwner,
  querySchoolYearDict
};
