import api from '../../_api/appraise.js'

const getDictByDictNames = ({ commit, state }, params) => new Promise(resolve => {
    api.getDictByDictNames(params).then(response => {
        console.log(["getDictByDictNamesAction", response])
        resolve(response)
    })
})


const addAppraiseCategory = ({ commit, state }, params) => new Promise(resolve => {
    api.addAppraiseCategory(params).then(response => {
        console.log(["addAppraiseCategory", response])
        resolve(response)
    })
})


const getAppraiseCategory = ({ commit, state }, params) => new Promise(resolve => {
    api.getAppraiseCategory(params).then(response => {
        console.log(["getAppraiseCategory", response])
        resolve(response)
    })
})

const updateAppraiseCategory = ({ commit, state }, params) => new Promise(resolve => {
    api.updateAppraiseCategory(params).then(response => {
        console.log(["updateAppraiseCategory", response])
        resolve(response)
    })
})

const getAppraiseInfoByScopeIdAndItemId = ({ commit, state }, params) => new Promise(resolve => {
    api.getAppraiseInfoByScopeIdAndItemId(params).then(response => {
        console.log(["getAppraiseInfoByScopeIdAndItemId", response])
        resolve(response)
    })
})

const addProspectus = ({ commit, state }, params) => new Promise(resolve => {
    api.addProspectus(params).then(response => {
        console.log(["addProspectus", response])
        resolve(response)
    })
})

const querySchemesByOrgCodeAndCategoryId = ({ commit, state }, params) => new Promise(resolve => {
    api.querySchemesByOrgCodeAndCategoryId(params).then(response => {
        console.log(["querySchemesByOrgCodeAndCategoryId", response])
        resolve(response)
    })
})

const completeUserPendingByItemId = ({ commit, state }, params) => new Promise(resolve => {
    api.completeUserPendingByItemId(params).then(response => {
        console.log(["completeUserPendingByItemId", response])
        resolve(response)
    })
})


const addScheme = ({ commit, state }, params) => new Promise(resolve => {
    api.addScheme(params).then(response => {
        console.log(["addScheme", response])
        resolve(response)
    })
})

const getStandardScheme = ({ commit, state }, params) => new Promise(resolve => {
    api.getStandardScheme(params).then(response => {
        console.log(["getStandardScheme", response])
        resolve(response)
    })
})

const updateScheme = ({ commit, state }, params) => new Promise(resolve => {
    api.updateScheme(params).then(response => {
        console.log(["updateScheme", response])
        resolve(response)
    })
})

const saveAsScheme = ({ commit, state }, params) => new Promise(resolve => {
    api.saveAsScheme(params).then(response => {
        console.log(["saveAsScheme", response])
        resolve(response)
    })
})

const queryAppraiseProspectus = ({ commit, state }, params) => new Promise(resolve => {
    api.queryAppraiseProspectus(params).then(response => {
        console.log(["queryAppraiseProspectus", response])
        resolve(response)
    })
})

const startAppraiseProject = ({ commit, state }, params) => new Promise(resolve => {
    api.startAppraiseProject(params).then(response => {
        console.log(["startAppraiseProject", response])
        resolve(response)
    })
})

const addItem = ({ commit, state }, params) => new Promise(resolve => {
    api.addItem(params).then(response => {
        console.log(["addItem", response])
        resolve(response)
    })
})
const addScore = ({ commit, state }, params) => new Promise(resolve => {
    api.addScore(params).then(response => {
        console.log(["addScore", response])
        resolve(response)
    })
})

const getSchemeTree = ({ commit, state }, params) => new Promise(resolve => {
    api.getSchemeTree(params).then(response => {
        console.log(["getSchemeTree", response])
        resolve(response)
    })
})

const getItemListAndScore = ({ commit, state }, params) => new Promise(resolve => {
    api.getItemListAndScore(params).then(response => {
        console.log(["getItemListAndScore", response])
        resolve(response)
    })
})
const updateScore = ({ commit, state }, params) => new Promise(resolve => {
    api.updateScore(params).then(response => {
        console.log(["updateScore", response])
        resolve(response)
    })
})
const deleteScore = ({ commit, state }, params) => new Promise(resolve => {
    api.deleteScore(params).then(response => {
        console.log(["deleteScore", response])
        resolve(response)
    })
})
const updateItem = ({ commit, state }, params) => new Promise(resolve => {
    api.updateItem(params).then(response => {
        console.log(["updateItem", response])
        resolve(response)
    })
})
const deleteItem = ({ commit, state }, params) => new Promise(resolve => {
    api.deleteItem(params).then(response => {
        console.log(["deleteItem", response])
        resolve(response)
    })
})

const getSchemeEnableUpdateState = ({ commit, state }, params) => new Promise(resolve => {
    api.getSchemeEnableUpdateState(params).then(response => {
        console.log(["getSchemeEnableUpdateState", response])
        resolve(response)
    })
})
const queryTargetOrgBehaviors = ({ commit, state }, params) => new Promise(resolve => {
    api.queryTargetOrgBehaviors(params).then(response => {
        console.log(["queryTargetOrgBehaviors", response])
        resolve(response)
    })
})


const getAllCorrelationDataByScopeIdAndItemId = ({ commit, state }, params) => new Promise(resolve => {
    api.getAllCorrelationDataByScopeIdAndItemId(params).then(response => {
        console.log(["getAllCorrelationDataByScopeIdAndItemId", response])
        resolve(response)
    })
})


const queryTargetArtfBehviors = ({ commit, state }, params) => new Promise(resolve => {
    api.queryTargetArtfBehviors(params).then(response => {
        console.log(["queryTargetArtfBehviors", response])
        resolve(response)
    })
})


const getCurrentOrgListAndOwner = ({ commit, state }, params) => new Promise(resolve => {
    api.getCurrentOrgListAndOwner(params).then(response => {
        console.log(["getCurrentOrgListAndOwner", response])
        resolve(response)
    })
})

const getSubjectBySSCodeAndProjectId = ({ commit, state }, params) => new Promise(resolve => {
    api.getSubjectBySSCodeAndProjectId(params).then(response => {
        console.log(["getSubjectBySSCodeAndProjectId", response])
        resolve(response)
    })
})

const getItemListAndScoreBySubjectCodeAndProjectId = ({ commit, state }, params) => new Promise(resolve => {
    api.getItemListAndScoreBySubjectCodeAndProjectId(params).then(response => {
        console.log(["getItemListAndScoreBySubjectCodeAndProjectId", response])
        resolve(response)
    })
})

const getStateList = ({ commit, state }, params) => new Promise(resolve => {
    api.getStateList(params).then(response => {
        console.log(["getStateList", response])
        resolve(response)
    })
})
const getSubjectByProjectIdAndSession = ({ commit, state }, params) => new Promise(resolve => {
    api.getSubjectByProjectIdAndSession(params).then(response => {
        console.log(["getSubjectByProjectIdAndSession", response])
        resolve(response)
    })
})

const getStudentApplyProject = ({ commit, state }, params) => new Promise(resolve => {
    api.getStudentApplyProject(params).then(response => {
        console.log(["getStudentApplyProject", response])
        resolve(response)
    })
})
const studentApply = ({ commit, state }, params) => new Promise(resolve => {
    api.studentApply(params).then(response => {
        console.log(["studentApply", response])
        resolve(response)
    })
})

const applyRegBehavior = ({ commit, state }, params) => new Promise(resolve => {
    api.applyRegBehavior(params).then(response => {
        console.log(["applyRegBehavior", response])
        resolve(response)
    })
})
const importRegBehavior = ({ commit, state }, params) => new Promise(resolve => {
    api.importRegBehavior(params).then(response => {
        console.log(["importRegBehavior", response])
        resolve(response)
    })
})

const queryStudentBaseInfo = ({ commit, state }, params) => new Promise(resolve => {
    api.queryStudentBaseInfo(params).then(response => {
        console.log(["queryStudentBaseInfo", response])
        resolve(response)
    })
})

const queryStdSubjectRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.queryStdSubjectRecord(params).then(response => {
        console.log(["queryStdSubjectRecord", response])
        resolve(response)
    })
})

const queryStdSubjectTree = ({ commit, state }, params) => new Promise(resolve => {
    api.queryStdSubjectTree(params).then(response => {
        console.log(["queryStdSubjectTree", response])
        resolve(response)
    })
})
const produceStdSubjectRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.produceStdSubjectRecord(params).then(response => {
        console.log(["produceStdSubjectRecord", response])
        resolve(response)
    })
})

const truncateStdSubjectRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.truncateStdSubjectRecord(params).then(response => {
        console.log(["truncateStdSubjectRecord", response])
        resolve(response)
    })
})

const produceHcSubjectRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.produceHcSubjectRecord(params).then(response => {
        console.log(["produceHcSubjectRecord", response])
        resolve(response)
    })
})
const truncateHcSubjectRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.truncateHcSubjectRecord(params).then(response => {
        console.log(["truncateHcSubjectRecord", response])
        resolve(response)
    })
})
const queryHierarchicalRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.queryHierarchicalRecord(params).then(response => {
        console.log(["queryHierarchicalRecord", response])
        resolve(response)
    })
})
const queryStdSubjectListByCode = ({ commit, state }, params) => new Promise(resolve => {
    api.queryStdSubjectListByCode(params).then(response => {
        console.log(["queryHierarchicalRecord", response])
        resolve(response)
    })
})
const startImportRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.startImportRecord(params).then(response => {
        console.log(["startImportRecord", response])
        resolve(response)
    })
})

export default {
    startImportRecord,
    queryStdSubjectListByCode,
    queryHierarchicalRecord,
    truncateHcSubjectRecord,
    produceHcSubjectRecord,
    deleteItem,
    updateItem,
    deleteScore,
    getItemListAndScore,
    updateScore,
    addScore,
    addItem,
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
    getSchemeTree,
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
}