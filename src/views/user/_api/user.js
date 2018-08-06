import request from '~/utils/request'
import ajax from '~/utils/ajax'

const queryAuthInfoList = data =>
    request({
        url: "/userAuth/queryAuthInfoList.do",
        method: 'post',
        data: data
    })
const getUserAuthInfoById = data =>
    request({
        url: "/userAuth/getUserAuthInfoById.do",
        method: 'post',
        data: data
    })

const queryUserList = data =>
    request({
        url: "/user/queryUserList.do",
        method: 'post',
        data: data
    })



const resetUserPwd = data =>
    request({
        url: "/user/resetUserPwd.do",
        method: 'post',
        data: data
    })

const updateUserState = data =>
    request({
        url: "/user/updateUserState.do",
        method: 'post',
        data: data
    })
export default {
    queryAuthInfoList,
    getUserAuthInfoById,
    queryUserList,
    resetUserPwd,
    updateUserState
}; 
