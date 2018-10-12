import api from '../../_api/physical.js'

const queryPhysicalForStaff = ({ commit, state }, params) => new Promise(resolve => {
    api.queryPhysicalForStaff(params).then(response => {
        console.log(["queryPhysicalForStaff", response])
        resolve(response)
    })
})

const queryPhysicalForStu = ({ commit, state }, params) => new Promise(resolve => {
    api.queryPhysicalForStu(params).then(response => {
        console.log(["queryPhysicalForStu", response])
        resolve(response)
    })
})

const insertPhysical = ({ commit, state }, params) => new Promise(resolve => {
    api.insertPhysical(params).then(response => {
        console.log(["insertPhysical", response])
        resolve(response)
    })
})

const importPhysical = ({ commit, state }, params) => new Promise(resolve => {
    api.importPhysical(params).then(response => {
        console.log(["importPhysical", response])
        resolve(response)
    })
})

const updatePhysical = ({ commit, state }, params) => new Promise(resolve => {
    api.updatePhysical(params).then(response => {
        console.log(["updatePhysical", response])
        resolve(response)
    })
})
const getPhysicalTemplateUrl = ({ commit, state }, params) => new Promise(resolve => {
    api.getPhysicalTemplateUrl(params).then(response => {
        console.log(["getPhysicalTemplateUrl", response])
        resolve(response)
    })
})
export default {
    queryPhysicalForStaff,
    queryPhysicalForStu,
    insertPhysical,
    importPhysical,
    updatePhysical,
    getPhysicalTemplateUrl

}