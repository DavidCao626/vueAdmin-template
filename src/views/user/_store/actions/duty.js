import api from '../../_api/duty.js'

const deleteUserResigDutyById = ({ commit, state }, params) => new Promise(resolve => {
    api.deleteUserResigDutyById(params).then(response => {
        console.log(["deleteUserResigDutyById", response])
        resolve(response)
    })
})

const queryResignationByTypeAndSysCode = ({ commit, state }, params) => new Promise(resolve => {
    api.queryResignationByTypeAndSysCode(params).then(response => {
        console.log(["queryResignationByTypeAndSysCode", response])
        resolve(response)
    })
})

const updateUserResignation = ({ commit, state }, params) => new Promise(resolve => {
    api.updateUserResignation(params).then(response => {
        console.log(["updateUserResignation", response])
        resolve(response)
    })
})

const getCurrentOrgListAndOwner = ({ commit, state }, params) => new Promise(resolve => {
    api.getCurrentOrgListAndOwner(params).then(response => {
        console.log(["getCurrentOrgListAndOwner", response])
        resolve(response)
    })
})

const queryResigDutyBySessionAndType = ({ commit, state }, params) => new Promise(resolve => {
    api.queryResigDutyBySessionAndType(params).then(response => {
        console.log(["queryResigDutyBySessionAndType", response])
        resolve(response)
    })
})

const insertUserResignation = ({ commit, state }, params) => new Promise(resolve => {
    api.insertUserResignation(params).then(response => {
        console.log(["insertUserResignation", response])
        resolve(response)
    })
})

const getCurrentMNCodeOrgListAndOwner = ({ commit, state }, params) => new Promise(resolve => {
    api.getCurrentMNCodeOrgListAndOwner(params).then(response => {
        console.log(["getCurrentMNCodeOrgListAndOwner", response])
        resolve(response)
    })
})
export default {
    deleteUserResigDutyById,
    queryResignationByTypeAndSysCode,
    updateUserResignation,
    getCurrentOrgListAndOwner,
    queryResigDutyBySessionAndType,
    insertUserResignation,
    getCurrentMNCodeOrgListAndOwner
}