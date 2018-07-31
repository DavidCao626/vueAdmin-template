import request from '~/utils/request'
import ajax from '~/utils/ajax'

const queryCurrentOrgStaffList = data =>
    request({
        url: "/staInfo/queryCurrentOrgStaffList.do",
        method: 'post',
        data: data
    })


const queryOrgByOrgCode = data =>
    request({
        url: "/staInfo/queryOrgByOrgCode.do",
        method: 'post',
        data: data
    })

export default {
    queryCurrentOrgStaffList,
    queryOrgByOrgCode
};
