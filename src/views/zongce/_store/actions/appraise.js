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

export default {
    getDictByDictNames,
    addAppraiseCategory,
    getAppraiseCategory,
    updateAppraiseCategory
}