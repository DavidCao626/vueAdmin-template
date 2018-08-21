import request from '~/utils/request'
import ajax from '~/utils/ajax'

//附件上传地址
const importArtRecord = process.env.BASE_API +"/appraise/importArtRecord.do"


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

const getItemListAndScore = data =>
    request({
        url: "/appraise/getItemListAndScore.do",
        method: "post",
        data: data
    })

const updateScore = data =>
    request({
        url: "/appraise/updateScore.do",
        method: "post",
        data: data
    })

const deleteScore = data =>
    request({
        url: "/appraise/deleteScore.do",
        method: "post",
        data: data
    })

const updateItem = data =>
    request({
        url: "/appraise/updateItem.do",
        method: "post",
        data: data
    })
const deleteItem = data =>
    request({
        url: "/appraise/deleteItem.do",
        method: "post",
        data: data
    })

const getSchemeEnableUpdateState = data =>
    request({
        url: "/appraise/getSchemeEnableUpdateState.do",
        method: "post",
        data: data
    })

const queryTargetOrgBehaviors = data =>
    request({
        url: "/appraise/queryTargetOrgBehaviors.do",
        method: "post",
        data: data
    })


const getAllCorrelationDataByScopeIdAndItemId = data =>
    request({
        url: "/appraise/getAllCorrelationDataByScopeIdAndItemId.do",
        method: "post",
        data: data
    })


const queryTargetArtfBehviors = data =>
    request({
        url: "/appraise/queryTargetArtfBehviors.do",
        method: "post",
        data: data
    })



const getSubjectBySSCodeAndProjectId = data =>
    request({
        url: "/appraise/getSubjectBySSCodeAndProjectId.do",
        method: "post",
        data: data
    })
const getCurrentOrgListAndOwner = data =>
    request({
        url: "/systemManagerApi/getCurrentOrgListAndOwner.do",
        method: 'post',
        data: data
    })
const getItemListAndScoreBySubjectCodeAndProjectId = data =>
    request({
        url: "/appraise/getItemListAndScoreBySubjectCodeAndProjectId.do",
        method: "post",
        data: data
    })
const getStateList = data =>
    request({
        url: "/appraise/getStateList.do",
        method: "post",
        data: data
    })

const getSubjectByProjectIdAndSession = data =>
    request({
        url: "/appraise/getSubjectByProjectIdAndSession.do",
        method: "post",
        data: data
    })

const getStudentApplyProject = data =>
    request({
        url: "/appraise/getStudentApplyProject.do",
        method: "post",
        data: data
    })
const studentApply = data =>
    request({
        url: "/appraise/studentApply.do",
        method: "post",
        data: data
    })


const applyRegBehavior = data =>
    request({
        url: "/appraise/applyRegBehavior.do",
        method: "post",
        data: data
    })


const importRegBehavior = data =>
    ajax({
        url: "/appraise/importRegBehavior.do",
        method: "post",
        data: data
    })


const queryStudentBaseInfo = data =>
    request({
        url: "/appraise/queryStudentBaseInfo.do",
        method: "post",
        data: data
    })

const queryStdSubjectRecord = data =>
    request({
        url: "/appraise/queryStdSubjectRecord.do",
        method: "post",
        data: data
    })

const queryStdSubjectTree = data =>
    request({
        url: "/appraise/queryStdSubjectTree.do",
        method: "post",
        data: data
    })
const produceStdSubjectRecord = data =>
    request({
        url: "/appraise/produceStdSubjectRecord.do",
        method: "post",
        data: data
    })

const truncateStdSubjectRecord = data =>
    request({
        url: "/appraise/truncateStdSubjectRecord.do",
        method: "post",
        data: data
    })

const queryHierarchicalRecord = data =>
    request({
        url: "/appraise/queryHierarchicalRecord.do",
        method: "post",
        data: data
    })
const truncateHcSubjectRecord = data =>
    request({
        url: "/appraise/truncateHcSubjectRecord.do",
        method: "post",
        data: data
    })
const produceHcSubjectRecord = data =>
        request({
        url: "/appraise/produceHcSubjectRecord.do",
            method: "post",
            data: data
        })

const queryStdSubjectListByCode = data =>
    request({
        url: "/appraise/queryStdSubjectListByCode.do",
        method: "post",
        data: data
    })

const startImportRecord = data =>
    request({
        url: "/appraise/startImportRecord.do",
        method: "post",
        data: data
    })


const truncateAppraiseBehaviorRegRecord = data =>
    request({
        url: "/appraise/truncateAppraiseBehaviorRegRecord.do",
        method: "post",
        data: data
    })

const queryAllEnableStandardSubject = data =>
    request({
        url: "/appraise/queryAllEnableStandardSubject.do",
        method: "post",
        data: data
    })

export default {
    queryAllEnableStandardSubject,
    truncateAppraiseBehaviorRegRecord,
    startImportRecord,
    queryStdSubjectListByCode,
    produceHcSubjectRecord,
    truncateHcSubjectRecord,
    queryHierarchicalRecord,
    importArtRecord,
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
    getSchemeTree,
    getItemListAndScore,
    updateScore,
    deleteScore,
    updateItem,
    deleteItem,
    getSchemeEnableUpdateState,
    queryTargetOrgBehaviors,
    getAllCorrelationDataByScopeIdAndItemId,
    queryTargetArtfBehviors,
    getCurrentOrgListAndOwner,
    getSubjectBySSCodeAndProjectId,
    getItemListAndScoreBySubjectCodeAndProjectId,
    getStateList,
    getSubjectByProjectIdAndSession,
    getStudentApplyProject,
    studentApply,
    applyRegBehavior,
    importRegBehavior,
    queryStudentBaseInfo,
    queryStdSubjectRecord,
    queryStdSubjectTree,
    produceStdSubjectRecord,
    truncateStdSubjectRecord
};
