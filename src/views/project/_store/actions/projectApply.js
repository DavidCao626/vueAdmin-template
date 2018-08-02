import api from '../../_api/projectApply.js'



const getApplyData = ({ commit, state }, data) => new Promise(resolve => {
    api.getApplyData(data).then(response => {
        console.log(["getApplyData", response])
        resolve(response)
    })
})
const povertyApply = ({ commit, state }, data) => new Promise(resolve => {
    api.povertyApply(data).then(response => {
        console.log(["povertyApply", response])
        resolve(response)
    })
})
const insertScholarshipApply = ({ commit, state }, data) => new Promise(resolve => {
    api.insertScholarshipApply(data).then(response => {
        console.log(["insertScholarshipApply", response])
        resolve(response)
    })
})

const insertMotivationScholarshipApply = ({ commit, state }, data) => new Promise(resolve => {
    api.insertMotivationScholarshipApply(data).then(response => {
        console.log(["insertMotivationScholarshipApply", response])
        resolve(response)
    })
})
const insertNationalGrantsApply = ({ commit, state }, data) => new Promise(resolve => {
    api.insertNationalGrantsApply(data).then(response => {
        console.log(["insertNationalGrantsApply", response])
        resolve(response)
    })
})
const getStuEconmyInfo = ({ commit, state }, data) => new Promise(resolve => {
    api.getStuEconmyInfo(data).then(response => {
        console.log(["getStuEconmyInfo", response])
        resolve(response)
    })
})

export default {
    getApplyData,
    povertyApply,
    insertScholarshipApply,
    insertMotivationScholarshipApply,
    insertNationalGrantsApply,
    getStuEconmyInfo
}