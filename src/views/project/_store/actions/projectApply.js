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


export default {
    getApplyData,
    povertyApply,
    insertScholarshipApply
}