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
    
export default {
    pullPublicNotice,
    queryUserPending
}