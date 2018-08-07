import api from '../../_api/import.js'


const queryImportRecordList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryImportRecordList(params).then(response => {
        console.log(["queryImportRecordList", response])
        resolve(response)
    })
})



const rollBackStudentInfoByBatch = ({ commit, state }, params) => new Promise(resolve => {
    api.rollBackStudentInfoByBatch(params).then(response => {
        console.log(["rollBackStudentInfoByBatch", response])
        resolve(response)
    })
})

const rollBackStaffInfoByBatch = ({ commit, state }, params) => new Promise(resolve => {
    api.rollBackStaffInfoByBatch(params).then(response => {
        console.log(["rollBackStaffInfoByBatch", response])
        resolve(response)
    })
})
export default {
    queryImportRecordList,
    rollBackStudentInfoByBatch,
    rollBackStaffInfoByBatch
}