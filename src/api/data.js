import request from '~/utils/request'
import ajax from '~/utils/ajax'
export function queryServiceTypeList() {
    return request({
        url: '/task/queryServiceTypeList.do',
        method: 'post',
        data:
            {}
    })
}

export function insertServiceType(data) {
    return request({
        url: '/task/insertServiceType.do',
        method: 'post',
        data:
            data
    })
}

export function updateServiceType(data) {
    return request({
        url: '/task/updateServiceType.do',
        method: 'post',
        data:
            data
    })
}

export function deleteServiceType(data) {
    return request({
        url: '/task/deleteServiceType.do',
        method: 'post',
        data:
            data
    })
}