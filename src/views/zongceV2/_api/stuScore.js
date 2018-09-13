import request from "~/utils/request";
import ajax from "~/utils/ajax";
const api_path = "/stuScore";

//学生成绩上传地址
const uploadStuScore = "/public/uploadStuScore.do";

//老师查学生成绩

const queryStuScoreForStaff = data =>
  request({
    url: api_path + "/queryStuScoreForStaff.do",
    method: "post",
    data: data
  });
//学生自己查询自己成绩
const queryStuScoreForStu = data =>
  request({
    url: api_path + "/queryStuScoreForStaff.do",
    method: "post",
    data: data
  });

//班级管理员查询排名
const queryScoreRankForStaff = data =>
  request({
    url: api_path + "/queryScoreRankForStaff.do",
    method: "post",
    data: data
  });
//学生自己查询自己排名
const queryScoreRankForStu = data =>
  request({
    url: api_path + "/queryScoreRankForStu.do",
    method: "post",
    data: data
  });

//班级管理员生成排名
const processRank = data =>
  request({
    url: api_path + "/processRank.do",
    method: "post",
    data: data
  });
//导入成绩
const importStuScoreForClass = data =>
  request({
    url: api_path + "/importStuScoreForClass.do",
    method: "post",
    data: data
  });
//查询学年列表(下拉框)
const querySchoolYearDict = data =>
  request({
    url: api_path + "/querySchoolYearDict.do",
    method: "post",
    data: data
  });
  
export default {
  queryStuScoreForStaff,
  queryStuScoreForStu,
  queryScoreRankForStaff,
  queryScoreRankForStu,
  importStuScoreForClass,
  processRank,
  querySchoolYearDict,
  uploadStuScore,
};
