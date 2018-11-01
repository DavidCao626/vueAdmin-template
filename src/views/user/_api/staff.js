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
const createStaff = data =>
    ajax({
        url: "/staInfo/createStaff.do",
        method: 'post',
        data: data
    })
const updateStaffInfo = data =>
    request({
        url: "/staInfo/updateStaffInfo.do",
        method: 'post',
        data: data
    })

const importStaff = process.env.BASE_API + "/staInfo/importStaff.do"
export default {
    updateStaffInfo,
    queryCurrentOrgStaffList,
    queryOrgByOrgCode,
    createStaff,
    importStaff
};
