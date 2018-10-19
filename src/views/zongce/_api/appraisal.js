import request from '~/utils/request'
import ajax from '~/utils/ajax'

//附件上传地址
const importArtRecord = process.env.BASE_API + "/appraise/importArtRecord.do"


const getDictByDictNames = data =>
    request({
        url: "/systemConfApi/getDictByDictNames.do",
        method: 'post',
        data: data
    })
const completeUserPendingByItemId = data =>
    request({
        url: "/project/completeUserPendingByItemId.do",
        method: "post",
        data: data
    })

const queryConfigList = data =>
    request({
        url: "/appraisal/queryConfigList.do",
        method: "post",
        data: data
    })
const getEvaluateTemplate = data =>
    request({
        url: "/appraisal/getEvaluateTemplate.do",
        method: "post",
        data: data
    })
const saveEvaluateTemplate = data =>
    ajax({
        url: "/appraisal/saveEvaluateTemplate.do",
        method: "post",
        data: data
    })

const queryProjectList = data =>
    request({
        url: "/appraisal/queryProjectList.do",
        method: "post",
        data: data
    })
const queryAppraisalRecord = data =>
    request({
        url: "/appraisal/queryAppraisalRecord.do",
        method: "post",
        data: data
    })
const processAppraisalRecord = data =>
    request({
        url: "/appraisal/processAppraisalRecord.do",
        method: "post",
        data: data
    })
const getAppraisalProjectState = data =>
    request({
        url: "/appraisal/getAppraisalProjectState.do",
        method: "post",
        data: data
    })
const getAppraisalRecordState = data =>
    request({
        url: "/appraisal/getAppraisalRecordState.do",
        method: "post",
        data: data
    })
const querySchoolYear = data =>
    request({
        url: "/schoolYear/querySchoolYear.do",
        method: 'post',
        data: data
    })

const queryAppraisalRankList = data =>
    request({
        url: "/appraisal/queryAppraisalRankList.do",
        method: "post",
        data: data
    })

const queryAppraisalRankForStaff = data =>
    request({
        url: "/appraisal/queryAppraisalRankForStaff.do",
        method: "post",
        data: data
    })

const queryAppraisalRankForStu = data =>
    request({
        url: "/appraisal/queryAppraisalRankForStu.do",
        method: "post",
        data: data
    })
const deleteAppraisalProject = data =>
    request({
        url: "/appraisal/deleteAppraisalProject.do",
        method: "post",
        data: data
    })

const queryAppraisalRankForCollegeAndClass = data =>
    request({
        url: "/appraisal/queryAppraisalRankForCollegeAndClass.do",
        method: "post",
        data: data
    })

const queryProjectListSchool = data =>
    request({
        url: "/appraisal/queryProjectListSchool.do",
        method: "post",
        data: data
    })
const deleteAppraisalProjectSchool = data =>
    request({
        url: "/appraisal/deleteAppraisalProjectSchool.do",
        method: "post",
        data: data
    })
const processSchoolAppraisalRecord = data =>
    request({
        url: "/appraisal/processSchoolAppraisalRecord.do",
        method: "post",
        data: data
    })

const querySchoolAppraisalRankForCollegeAndClass = data =>
    request({
        url: "/appraisal/querySchoolAppraisalRankForCollegeAndClass.do",
        method: "post",
        data: data
    })


export default {
    querySchoolAppraisalRankForCollegeAndClass,
    deleteAppraisalProjectSchool,
    queryProjectListSchool,
    processSchoolAppraisalRecord,
    queryAppraisalRankForCollegeAndClass,
    deleteAppraisalProject,
    queryAppraisalRankList,
    queryAppraisalRankForStaff,
    queryAppraisalRankForStu,
    querySchoolYear,
    getAppraisalProjectState,
    getAppraisalRecordState,
    processAppraisalRecord,
    queryAppraisalRecord,
    queryProjectList,
    queryConfigList,
    getEvaluateTemplate,
    saveEvaluateTemplate

};
