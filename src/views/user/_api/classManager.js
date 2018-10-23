import request from '~/utils/request'
import ajax from '~/utils/ajax'




const queryCollegeClass = data =>
    request({
        url: "/dOrg/queryCollegeClass.do",
        method: 'post',
        data: data
    })
const queryDepartmentList = data =>
    request({
        url: "/dOrg/queryDepartmentList.do",
        method: 'post',
        data: data
    })
const queryMajorByDepartmentCode = data =>
    request({
        url: "/dOrg/queryMajorByDepartmentCode.do",
        method: 'post',
        data: data
    })
const queryEducationLevel = data =>
    request({
        url: "/dOrg/queryEducationLevel.do",
        method: 'post',
        data: data
    })
const queryStuTypeByEducationLevelCode = data =>
    request({
        url: "/dOrg/queryStuTypeByEducationLevelCode.do",
        method: 'post',
        data: data
    })
export default {
    queryCollegeClass,
    queryDepartmentList,
    queryMajorByDepartmentCode,
    queryEducationLevel,
    queryStuTypeByEducationLevelCode
};
