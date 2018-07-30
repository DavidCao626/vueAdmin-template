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


const queryResignationByTypeAndSysCode = data =>
    request({
        url: "/duty/queryResignationByTypeAndSysCode.do",
        method: 'post',
        data: data
    })


const updateUserResignation = data =>
    request({
        url: "/duty/updateUserResignation.do",
        method: 'post',
        data: data
    })
    /**
     * 获取下级当前组织包括当前组织
     * @param {*} data 
     */
const getCurrentOrgListAndOwner = data =>
    request({
        url: "/systemManagerApi/getCurrentOrgListAndOwner.do",
        method: 'post',
        data: data
    })

    /**
     * 获取管理节点下的组织包括管理节点
     * @param {*} data 
     */
const getCurrentMNCodeOrgListAndOwner = data =>
    request({
        url: "/systemManagerApi/getCurrentMNCodeOrgListAndOwner.do",
        method: 'post',
        data: data
    })
const queryResigDutyBySessionAndType = data =>
    request({
        url: "/duty/queryResigDutyBySessionAndType.do",
        method: 'post',
        data: data
    })

const insertUserResignation = data =>
    request({
        url: "/duty/insertUserResignation.do",
        method: 'post',
        data: data
    })
export default {
    getCurrentOrgListAndOwner,
    deleteUserResigDutyById,
    getDictByDictNames,
    queryResignationByTypeAndSysCode,
    updateUserResignation,
    queryResigDutyBySessionAndType,
    insertUserResignation,
    getCurrentMNCodeOrgListAndOwner
};
