import api from '../../_api/user.js'


const queryAuthInfoList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryAuthInfoList(params).then(response => {
        console.log(["queryAuthInfoList", response])
        resolve(response)
    })
})

const getUserAuthInfoById = ({ commit, state }, params) => new Promise(resolve => {
    api.getUserAuthInfoById(params).then(response => {
        console.log(["getUserAuthInfoById", response])
        commit("setUserAuthData", response.resBody)
        resolve(response)
    })
})


const queryUserList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryUserList(params).then(response => {
        console.log(["queryUserList", response])
        resolve(response)
    })
})

const resetUserPwd = ({ commit, state }, params) => new Promise(resolve => {
    api.resetUserPwd(params).then(response => {
        console.log(["resetUserPwd", response])
        resolve(response)
    })
})
const updateUserState = ({ commit, state }, params) => new Promise(resolve => {
    api.updateUserState(params).then(response => {
        console.log(["updateUserState", response])
        resolve(response)
    })
})

export default {
    queryUserList,
    queryAuthInfoList,
    getUserAuthInfoById,
    resetUserPwd,
    updateUserState
}