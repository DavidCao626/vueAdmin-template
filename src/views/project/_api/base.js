import request from '~/utils/request'
import ajax from '~/utils/ajax'

//附件上传地址
const uploadAttrUrl = "act/project/uploadAttachment.do"
//增加或者更新项目
const insertOrUpdateProject = data =>
    ajax({
        url: '/project/insertOrUpdateProject.do',
        method: 'post',
        data: data
    })

//获取业务类别
const queryServiceTypeList = () =>

    request({
        url: '/project/queryServiceTypeList.do',
        method: 'post'
    })


const getProjectById = (data) =>

    request({
        url: '/project/getProjectById.do',
        method: 'post',
        data: data
    })

const insertOrUpdateAndNext = (data) =>
    ajax({
        url: '/project/insertOrUpdateAndNext.do',
        method: 'post',
        data: data
    })


export default {
    insertOrUpdateProject,
    uploadAttrUrl,
    queryServiceTypeList,
    getProjectById,
    insertOrUpdateAndNext
};
