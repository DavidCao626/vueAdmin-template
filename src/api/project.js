import request from '~/utils/request'
import ajax from '~/utils/ajax'
import Axios from 'axios'

/**
 * 增加项目
 * @param {*} data 
 */
export function insertProject(data) {
    return ajax({
        url: '/project/insertProject.do',
        method: 'post',
        data: data
    })
}
/**
 * 增加并启动项目
 * @param {*} data 
 */
export function insertProjectAndRun(data) {
    return ajax({
        url: '/project/insertProjectAndRun.do',
        method: 'post',
        data: data
    })
}
/**
 * 更新项目
 * @param {*} data 
 */
export function updateProject(data) {
    return ajax({
        url: '/project/updateProject.do',
        method: 'post',
        data: data
    })
}

/**
 * 设置工作项时间
 * @param {*} data 
 */
export function updateWorkItemTime(data) {
    return ajax({
        url: '/project/updateWorkItemTime.do',
        method: 'post',
        data: data
    })
}
/**
 * 下发任务
 * @param {} data 
 */
export function dispenseChildTask(data) {
    return ajax({
        url: '/project/dispenseChildTask.do',
        method: 'post',
        data: data
    })
}
/**
 * 删除项目
 * @param {*} data 
 */
export function deleteProject(data) {
    return request({
        url: '/project/deleteProject.do',
        method: 'post',
        data: data
    })
}

/**
 * 查询用户项目
 * @param {*} data 
 */
export function queryUserProject(data) {
    return request({
        url: '/project/queryUserProject.do',
        method: 'post',
        data: data
    })
}

/**
 * 查询业务类别
 */
export function queryServiceTypeList() {
    return request({
        url: '/project/queryServiceTypeList.do',
        method: 'post'
    })
}

/**
 * 查询工作项
 * @param {*} data 
 */
export function queryWorkItem(data) {
    return request({
        url: '/project/queryWorkItem.do',
        method: 'post',
        data: data
    })
}
/**
 * 根据项目id获取项目
 * @param {*} data 
 */
export function getProjectById(data) {
    return request({
        url: '/project/getProjectById.do',
        method: 'post',
        data: data
    })
}

var uploadAttachmentUrl = "act/publicNotice/uploadAttachment.do";
export { uploadAttachmentUrl }