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
export default {
    getDictByDictNames,
    addAppraiseCategory
}