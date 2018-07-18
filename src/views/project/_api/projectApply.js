import request from '~/utils/request'
import ajax from '~/utils/ajax'

//获取申请页面数据
const getApplyData = data =>
    request({
        url: '/projectApply/getApplyData.do',
        method: 'post',
        data: data
    })
const povertyApply = data =>
    ajax({
        url: '/projectApply/povertyApply.do',
        method: 'post',
        data :data
    })    
const insertScholarshipApply = data =>
    ajax({
        url: "/projectApply/insertScholarshipApply.do",
        method: 'post',
        data:data
    })

export default {
    getApplyData,
    povertyApply,
    insertScholarshipApply
}