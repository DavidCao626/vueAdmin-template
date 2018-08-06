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

const queryDutyListByMNCode = ({ commit, state }, params) => new Promise(resolve => {
    api.queryDutyListByMNCode(params).then(response => {
        console.log(["queryDutyListByMNCode", response])
        resolve(response)
    })
})

const querySocializeClassify = ({ commit, state }, params) => new Promise(resolve => {
    api.querySocializeClassify(params).then(response => {
        console.log(["querySocializeClassify", response])
        resolve(response)
    })
})
const getDutyByDutyId = ({ commit, state }, params) => new Promise(resolve => {
    api.getDutyByDutyId(params).then(response => {
        console.log(["getDutyByDutyId", response])
        resolve(response)
    })
})
const getGrantRole = ({ commit, state }, params) => new Promise(resolve => {
    api.getGrantRole(params).then(response => {
        console.log(["getGrantRole", response])
        resolve(response)
    })
})

const updateDuty = ({ commit, state }, params) => new Promise(resolve => {
    api.updateDuty(params).then(response => {
        console.log(["updateDuty", response])
        resolve(response)
    })
})

const insertDuty = ({ commit, state }, params) => new Promise(resolve => {
    api.insertDuty(params).then(response => {
        console.log(["insertDuty", response])
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
    getCurrentMNCodeOrgListAndOwner,
    queryDutyListByMNCode,
    querySocializeClassify,
    getDutyByDutyId,
    getGrantRole,
    updateDuty,
    insertDuty
}