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
export default {
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
    getSchemeEnableUpdateState
}