import request from '~/utils/request'
import ajax from '~/utils/ajax'




const queryPhysicalForStaff = data =>
    request({
        url: "/physical/queryPhysicalForStaff.do",
        method: 'post',
        data: data
    })

const queryPhysicalForStu = data =>
    request({
        url: "/physical/queryPhysicalForStu.do",
        method: 'post',
        data: data
    })
const insertPhysical = data =>
    request({
        url: "/physical/insertPhysical.do",
        method: 'post',
        data: data
    })
const importPhysical = data =>
    request({
        url: "/physical/importPhysical.do",
        method: 'post',
        data: data
    })
const updatePhysical = data =>
    request({
        url: "/physical/updatePhysical.do",
        method: 'post',
        data: data
    })
const getPhysicalTemplateUrl = data =>
    request({
        url: "/physical/getPhysicalTemplateUrl.do",
        method: 'post',
        data: data
    })
export default {
    queryPhysicalForStaff,
    queryPhysicalForStu,
    insertPhysical,
    importPhysical,
    updatePhysical,
    getPhysicalTemplateUrl
};
