import api from '../../_api/staff.js'


const queryCurrentOrgStaffList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryCurrentOrgStaffList(params).then(response => {
        console.log(["queryCurrentOrgStaffList", response])
        resolve(response)
    })
})


const queryOrgByOrgCode = ({ commit, state }, params) => new Promise(resolve => {
    api.queryOrgByOrgCode(params).then(response => {
        console.log(["queryOrgByOrgCode", response])
        resolve(response)
    })
})


const createStaff = ({ commit, state }, params) => new Promise(resolve => {
    api.createStaff(params).then(response => {
        console.log(["createStaff", response])
        resolve(response)
    })
})
const updateStaffInfo = ({ commit, state }, params) => new Promise(resolve => {
    api.updateStaffInfo(params).then(response => {
        console.log(["updateStaffInfo", response])
        resolve(response)
    })
})
export default {
    updateStaffInfo,
    queryCurrentOrgStaffList,
    queryOrgByOrgCode,
    createStaff
}