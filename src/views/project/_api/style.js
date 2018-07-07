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
    ajax({
        url: '/projectApply/updateClassRecommend.do',
        method: 'post',
        data: data
    })

const updateCollegeRecommend = data =>
    ajax({
        url: '/projectApply/updateCollegeRecommend.do',
        method: 'post',
        data: data
    })
const updateSchoolRecommend = data =>
    ajax({
        url: '/projectApply/updateSchoolRecommend.do',
        method: 'post',
        data: data
    })

const completePendByItemId = data =>
    request({
        url: '/projectApply/completePendByItemId.do',
        method: 'post',
        data: data
    })
const submitClassData = data =>
    request({
        url: '/projectApply/submitClassData.do',
        method: 'post',
        data: data
    })
const submitCollegeData = data =>
    request({
        url: '/projectApply/submitCollegeData.do',
        method: 'post',
        data: data
    })
const submitSchoolData = data =>
    request({
        url: '/projectApply/submitSchoolData.do',
        method: 'post',
        data: data
    })
const getCollegeDataAndPageDataByItemId = data =>
    request({
        url: '/projectApply/getCollegeDataAndPageDataByItemId.do',
        method: 'post',
        data: data
    })

const getSchoolDataAndPageDataByItemId = data =>
    request({
        url: '/projectApply/getSchoolDataAndPageDataByItemId.do',
        method: 'post',
        data: data
    })


export default {
    getAllDataAndPageDataByItemId,
    getCollegeDataAndPageDataByItemId,
    getSchoolDataAndPageDataByItemId,
    updateClassRecommend,
    updateCollegeRecommend,
    updateSchoolRecommend,
    completePendByItemId,
    submitClassData,
    submitSchoolData,
    submitCollegeData
}