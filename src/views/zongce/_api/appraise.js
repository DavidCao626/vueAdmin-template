import request from '~/utils/request'
import ajax from '~/utils/ajax'

//附件上传地址
const uploadAttrUrl = process.env.BASE_API+"/project/uploadAttachment.do"


const getDictByDictNames = data =>
    request({
        url: "/systemConfApi/getDictByDictNames.do",
        method: 'post',
        data: data
    })

  

const addAppraiseCategory = data =>
    ajax({
        url: "/appraise/addAppraiseCategory.do",
        method: 'post',
        data: data
    })

const updateAppraiseCategory = data =>
    ajax({
        url: "/appraise/updateAppraiseCategory.do",
        method: 'post',
        data: data
    })

const getAppraiseCategory = data =>
    request({
        url: "/appraise/getAppraiseCategory.do",
        method: 'post',
        data: data
    })

export default {

    uploadAttrUrl,
    getDictByDictNames,
    addAppraiseCategory,
    getAppraiseCategory,
    updateAppraiseCategory

};
