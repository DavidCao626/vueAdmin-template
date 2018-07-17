import request from '~/utils/request'
import ajax from '~/utils/ajax'

//查码表
const getDictByDictNames = data =>
    request({
        url: "/systemConfApi/getDictByDictNames.do",
        method: 'post',
        data: data
    })
const pullPublicNotice = data =>
    request({
        url: "/publicNotice/pullPublicNotice.do",
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
//根据id获取公告/公示
const getPublicNoticeById = data =>
    request({
        url: "/publicNotice/getPublicNoticeById.do",
        method: "post",
        data:data
    })    

const insertNotice = data =>
    request({
        url: "/publicNotice/insertNotice.do",
        method: "post",
        data: data
    })

const uploadAttrUrl = process.env.BASE_API + "/project/uploadAttachment.do"
export default {
    queryPublicNotice,
    getDictByDictNames,
    getPublicNoticeById,
    pullPublicNotice,
    uploadAttrUrl,
    insertNotice
}