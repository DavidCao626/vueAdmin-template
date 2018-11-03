import request from '~/utils/request'
import ajax from '~/utils/ajax'
//查询公告/公示
const pullPublicNotice = data =>
    request({
        url: "/publicNotice/pullPublicNotice.do",
        method: 'post',
        data: data
    })

//查码表
const getDictByDictNames = data =>
    request({
        url: "/systemConfApi/getDictByDictNames.do",
        method: 'post',
        data: data
    })

//查询
const queryUserPending = data =>
    request({
        url: '/project/queryUserPending.do',
        method: 'post',
        data: data
    })
   
export function getOrgTypeDict(data) {
    return request({
        url: '/publicNotice/getOrgTypeDict.do',
        method: 'post',
        data:
            data

    })
}
/**
 * 
 * @param {获取用户相关scope} data 
 */
const getUserScope = data =>
    request({
        url: '/projectApply/getUserScope.do',
        method: 'post',
        data: data
    })
const queryUserNoticeByStatus = data =>
    request({
        url: 'notice/queryUserNoticeByStatus.do',
        method: 'post',
        data: data
    })

export function getCurrentUserInfo(data) {
    return request({
        url: '/user/getCurrentUserInfo.do',
        method: 'post',
        data:
            data

    })
}
export default {
    getCurrentUserInfo,
    pullPublicNotice,
    queryUserPending,
    getUserScope,
    getOrgTypeDict,
    queryUserNoticeByStatus
}