import request from '~/utils/request'
import ajax from '~/utils/ajax'
export function addTaskProject(data) {
    return ajax({
        url: '/task/insertTaskProject.do',
        method: 'post',
        data:
            data
    })
}

export function getTaskProject(data) {
    return request({
        url: '/task/getNodeTaskProjectBySystemSerialNo.do',
        method: 'post',
        data:
            data
    })
}

export function updateTaskProject(data) {
    return ajax({
        url: '/task/updateTaskProject.do',
        method: 'post',
        data:
            data
    })
}
export function queryUserOrg() {
    return request({
        url: '/systemManagerApi/getCurrentOrgList.do',
        method: 'post',
        data: {}
    })
}

export function queryDutyByOrgCode(data) {
    return request({
        url: '/task/queryDutyByOrgCode.do',
        method: 'post',
        data: data
    })
}

export function queryUserByDutyCodeAndOrgCode(data) {
    return request({
        url: '/task/queryUserByDutyCodeAndOrgCode.do',
        method: 'post',
        data: data
    })
}

export function addTaskNode(data) {
    return ajax({
        url: '/task/insertTaskNode.do',
        method: 'post',
        data: data
    })
}

export function getTaskNodeBySystemSerialNo(data) {
    return request({
        url: '/task/getTaskNodeBySystemSerialNo.do',
        method: 'post',
        data: data
    })
}

export function updateTaskNode(data) {
    return ajax({
        url: '/task/updateTaskNode.do',
        method: 'post',
        data: data
    })
}