import request from '~/utils/request'
import ajax from '~/utils/ajax'

//查码表
const getDictByDictNames = data =>
    request({
        url: "/systemConfApi/getDictByDictNames.do",
        method: 'post',
        data: data
    })

    //查询公告/公示
const queryPublicNotice = data =>
    request({
        url: "/publicNotice/queryPublicNotice.do",
        method: 'post',
        data:data
    })    

export default {
    queryPublicNotice,
    getDictByDictNames
}