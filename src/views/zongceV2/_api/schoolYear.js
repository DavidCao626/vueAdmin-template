import request from "~/utils/request";
import ajax from "~/utils/ajax";

//附件上传地址
const importArtRecord = process.env.BASE_API + "/appraise/importArtRecord.do";

const getSchoolYearName = data =>
  request({
    url: "/schoolYear/getSchoolYearName.do",
    method: "post",
    data: data
  });
const insertSchoolYear = data =>
  request({
    url: "/schoolYear/insertSchoolYear.do",
    method: "post",
    data: data
  });
const querySchoolYear = data =>
  request({
    url: "/schoolYear/querySchoolYear.do",
    method: "post",
    data: data
  });

const updateSchoolYear = data =>
  request({
    url: "/schoolYear/updateSchoolYear.do",
    method: "post",
    data: data
  });
const insertBatchSchoolYear = data =>
  request({
    url: "/schoolYear/insertBatchSchoolYear.do",
    method: "post",
    data: data
  });
const deleteSchoolYear = data =>
  request({
    url: "/schoolYear/deleteSchoolYear.do",
    method: "post",
    data: data
  });
export default {
  deleteSchoolYear,
  insertBatchSchoolYear,
  updateSchoolYear,
  getSchoolYearName,
  querySchoolYear,
  insertSchoolYear,
  importArtRecord
};
