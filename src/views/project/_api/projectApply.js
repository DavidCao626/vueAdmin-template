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

const insertMotivationScholarshipApply = data =>
    ajax({
        url: "/projectApply/insertMotivationScholarshipApply.do",
        method: 'post',
        data: data
    })
const insertNationalGrantsApply = data =>
    ajax({
        url: "/projectApply/insertNationalGrantsApply.do",
        method: 'post',
        data: data
    })

export default {
    getApplyData,
    povertyApply,
    insertScholarshipApply,
    insertNationalGrantsApply
}