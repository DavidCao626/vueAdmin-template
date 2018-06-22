import request from '~/utils/request'
import ajax from '~/utils/ajax'

//查码表
const getDictByDictNames = data =>
    request({
        url: "/systemConfApi/getDictByDictNames.do",
        method: 'post',
        data: data
    })

//查询项目列表
const queryUserPending = data =>
    request({
        url: '/project/queryUserPending.do',
        method: 'post',
        data: data
    })

export default {
    queryUserPending,
    getDictByDictNames
}