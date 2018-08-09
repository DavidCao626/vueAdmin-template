import request from '~/utils/request'
import ajax from '~/utils/ajax'

//附件上传地址
const uploadAttrUrl = process.env.BASE_API+"/project/uploadAttachment.do"


const getDictByDictNames = data =>
    request({
        url: "/systemConfApi/getDictByDictNames.do",
        method: 'post',
        data: data
    })

  

const addAppraiseCategory = data =>
    ajax({
        url: "/appraise/addAppraiseCategory.do",
        method: 'post',
        data: data
    })

const updateAppraiseCategory = data =>
    ajax({
        url: "/appraise/updateAppraiseCategory.do",
        method: 'post',
        data: data
    })

const getAppraiseCategory = data =>
    request({
        url: "/appraise/getAppraiseCategory.do",
        method: 'post',
        data: data
    })



const getAppraiseInfoByScopeIdAndItemId = data =>
    request({
        url: "/appraise/getAppraiseInfoByScopeIdAndItemId.do",
        method: 'post',
        data: data
    })

const addProspectus = data =>
    request({
        url: "/appraise/addProspectus.do",
        method: 'post',
        data: data
    })



const querySchemesByOrgCodeAndCategoryId = data =>
    request({
        url: "/appraise/querySchemesByOrgCodeAndCategoryId.do",
        method: 'post',
        data: data
    }) 
export default {

    uploadAttrUrl,
    getDictByDictNames,
    addAppraiseCategory,
    getAppraiseCategory,
    updateAppraiseCategory,
    getAppraiseInfoByScopeIdAndItemId,
    addProspectus,
    querySchemesByOrgCodeAndCategoryId

};
