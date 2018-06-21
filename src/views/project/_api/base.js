import request from '~/utils/request'
import ajax from '~/utils/ajax'


//增加或者更新项目
const insertOrUpdateProject = data =>
    new Promise(resolve => {
        ajax({
            url: '/project/insertOrUpdateProject.do',
            method: 'post',
            data: data
        }).then(response => {
            resolve(response)
        })
    })
//附件上传地址
const uploadAttrUrl = "act/project/uploadAttachment.do"
//获取业务类别
const queryServiceTypeList = () =>
    new Promise(resolve => {
        request({
            url: '/project/queryServiceTypeList.do',
            method: 'post'
        }).then(response => {
            resolve(response)
        })
    })

export default {
    insertOrUpdateProject,
    uploadAttrUrl,
    queryServiceTypeList
};
