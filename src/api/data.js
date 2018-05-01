import request from '~/utils/request'
import ajax from '~/utils/ajax'
export function queryServiceTypeList() {
    return request({
        url: '/data/queryServiceTypeList.do',
        method: 'post',
        data:
            {}
    })
}

export function insertServiceType(data) {
    return request({
        url: '/data/insertServiceType.do',
        method: 'post',
        data:
            data
    })
}

export function updateServiceType(data) {
    return request({
        url: '/data/updateServiceType.do',
        method: 'post',
        data:
            data
    })
}

export function deleteServiceType(data) {
    return request({
        url: '/data/deleteServiceType.do',
        method: 'post',
        data:
            data
    })
}

export function insertServiceChildType(data) {
    return request({
        url: '/data/insertServiceChildType.do',
        method: 'post',
        data:
            data
    })
}
export function updateServiceChildType(data) {
    return request({
        url: '/data/updateServiceChildType.do',
        method: 'post',
        data:
            data
    })
}
export function deleteServiceChildType(data) {
    return request({
        url: '/data/deleteServiceChildType.do',
        method: 'post',
        data:
            data
    })
}