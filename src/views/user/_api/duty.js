import request from '~/utils/request'
import ajax from '~/utils/ajax'

//附件上传地址
const uploadAttrUrl = process.env.BASE_API + "/project/uploadAttachment.do"
//增加或者更新项目
const getDictByDictNames = data =>
    request({
        url: "/systemConfApi/getDictByDictNames.do",
        method: 'post',
        data: data
    })

const deleteUserResigDutyById = data =>
    request({
        url: "/duty/deleteUserResigDutyById.do",
        method: 'post',
        data: data
    })



export default {
    deleteUserResigDutyById,
    getDictByDictNames
};
