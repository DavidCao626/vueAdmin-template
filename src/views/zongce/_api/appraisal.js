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

export default {
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
