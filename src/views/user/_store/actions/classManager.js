import api from '../../_api/classManager.js'




const queryCollegeClass = ({ commit, state }, params) => new Promise(resolve => {
    api.queryCollegeClass(params).then(response => {
        console.log(["queryCollegeClass", response])
        resolve(response)
    })
})

const queryDepartmentList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryDepartmentList(params).then(response => {
        console.log(["queryDepartmentList", response])
        resolve(response)
    })
})
const queryMajorByDepartmentCode = ({ commit, state }, params) => new Promise(resolve => {
    api.queryMajorByDepartmentCode(params).then(response => {
        console.log(["queryMajorByDepartmentCode", response])
        resolve(response)
    })
})
const queryEducationLevel = ({ commit, state }, params) => new Promise(resolve => {
    api.queryEducationLevel(params).then(response => {
        console.log(["queryEducationLevel", response])
        resolve(response)
    })
})
const queryStuTypeByEducationLevelCode = ({ commit, state }, params) => new Promise(resolve => {
    api.queryStuTypeByEducationLevelCode(params).then(response => {
        console.log(["queryStuTypeByEducationLevelCode", response])
        resolve(response)
    })
})

const queryAllowAllotStudent = ({ commit, state }, params) => new Promise(resolve => {
    api.queryAllowAllotStudent(params).then(response => {
        console.log(["queryAllowAllotStudent", response])
        resolve(response)
    })
})
const allotStudentToClass = ({ commit, state }, params) => new Promise(resolve => {
    api.allotStudentToClass(params).then(response => {
        console.log(["allotStudentToClass", response])
        resolve(response)
    })
})
export default {
    queryAllowAllotStudent,
    allotStudentToClass,
    queryCollegeClass,
    queryDepartmentList,
    queryMajorByDepartmentCode,
    queryEducationLevel,
    queryStuTypeByEducationLevelCode
}