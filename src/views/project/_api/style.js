import request from '~/utils/request'
import ajax from '~/utils/ajax'

//获取数据
const getAllDataAndPageDataByItemId = data =>
    request({
        url: "/projectApply/getAllDataAndPageDataByItemId.do",
        method: 'post',
        data: data
    })
const updateClassRecommend = data =>
    request({
        url: '/projectApply/updateClassRecommend.do',
        method: 'post',
        data: data
    })

const completePendByItemId = data =>
    request({
        url: '/projectApply/completePendByItemId.do',
        method: 'post',
        data: data
    })

export default {
    getAllDataAndPageDataByItemId,
    updateClassRecommend,
    completePendByItemId
}