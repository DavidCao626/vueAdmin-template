import request from '~/utils/request'
import ajax from '~/utils/ajax'

/**
 * 获取节点的信息
 * @param {} data 
 */
export function getNodeInfo(data) {
    return request({
        url: 'taskRecord/getNodeInfo.do',
        method: 'post',
        data:
            data
    })
}


/**
 * 查询未审批的
 * @param {*} data 
 */
export function queryTodo(data) {
    return request({
        url: 'taskRecord/queryTodo.do',
        method: 'post',
        data:
            data
    })
}

/**
 * 查询已经审批的
 * @param {*} data 
 */
export function queryDone(data) {
    return request({
        url: 'taskRecord/queryDone.do',
        method: 'post',
        data:
            data
    })
}

export function approveRecord(data) {
    return ajax({
        url: 'taskRecord/approveRecord.do',
        method: 'post',
        data:
            data
    })
}