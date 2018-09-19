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



export default {
    queryConfigList,
    getEvaluateTemplate,
    saveEvaluateTemplate
    
};
