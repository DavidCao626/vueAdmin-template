import request from '~/utils/request'
import ajax from '~/utils/ajax'
//查询公告/公示
const pullPublicNotice = data =>
    request({
        url: "/publicNotice/pullPublicNotice.do",
        method: 'post',
        data: data
    })
export default {
    pullPublicNotice
}