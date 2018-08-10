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
export default {
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
    updateScheme
}