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
const completeUserPendingByItemId = data =>
    request({
        url: "/project/completeUserPendingByItemId.do",
        method: "post",
        data: data
    })

const getStandardScheme = data =>
    request({
        url: "/appraise/getStandardScheme.do",
        method: "post",
        data: data
    })
const addScheme = data =>
    ajax({
        url: "/appraise/addScheme.do",
        method: "post",
        data: data
    })

const updateScheme = data =>
    ajax({
        url: "/appraise/updateScheme.do",
        method: "post",
        data: data
    })

const saveAsScheme = data =>
    ajax({
        url: "/appraise/saveAsScheme.do",
        method: "post",
        data: data
    })

const queryAppraiseProspectus = data =>
    request({
        url: "/appraise/queryAppraiseProspectus.do",
        method: "post",
        data: data
    })

const startAppraiseProject = data =>
    request({
        url: "/appraise/startAppraiseProject.do",
        method: "post",
        data: data
    })

const addItem = data =>
    request({
        url: "/appraise/addItem.do",
        method: "post",
        data: data
    })
const addScore = data =>
    request({
        url: "/appraise/addScore.do",
        method: "post",
        data: data
    })

const getSchemeTree = data =>
    request({
        url: "/appraise/getSchemeTree.do",
        method: "post",
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
    querySchemesByOrgCodeAndCategoryId,
    completeUserPendingByItemId,
    addScheme,
    getStandardScheme,
    updateScheme,
    saveAsScheme,
    queryAppraiseProspectus,
    startAppraiseProject,
    addItem,
    addScore,
    getSchemeTree

};
