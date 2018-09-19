import api from '../../_api/appraisal.js'

const getDictByDictNames = ({ commit, state }, params) => new Promise(resolve => {
    api.getDictByDictNames(params).then(response => {
        console.log(["getDictByDictNamesAction", response])
        resolve(response)
    })
})
const queryConfigList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryConfigList(params).then(response => {
        console.log(["queryConfigList", response])
        resolve(response)
    })
})
const getEvaluateTemplate = ({ commit, state }, params) => new Promise(resolve => {
    api.getEvaluateTemplate(params).then(response => {
        console.log(["getEvaluateTemplate", response])
        resolve(response)
    })
})

const saveEvaluateTemplate = ({ commit, state }, params) => new Promise(resolve => {
    api.saveEvaluateTemplate(params).then(response => {
        console.log(["saveEvaluateTemplate", response])
        resolve(response)
    })
})
export default {

    queryConfigList,
    getEvaluateTemplate,
    saveEvaluateTemplate
}