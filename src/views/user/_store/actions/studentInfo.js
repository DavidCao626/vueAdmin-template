import api from '../../_api/studentInfo.js'





const getDictByDictNames = ({ commit, state }, params) => new Promise(resolve => {
    api.getDictByDictNames(params).then(response => {
        console.log(["getDictByDictNamesAction", response])
        resolve(response)
    })
})
const getStuBaseInfo = ({ commit, state }, params) => new Promise(resolve => {
    api.getStuBaseInfo(params).then(response => {
        console.log(["getStuBaseInfo", response])
        resolve(response)
    })
})

const getStuEconmyInfo = ({ commit, state }, params) => new Promise(resolve => {
    api.getStuEconmyInfo(params).then(response => {
        console.log(["getStuEconmyInfo", response])
        resolve(response)
    })
})

const getStuPerInfo = ({ commit, state }, params) => new Promise(resolve => {
    api.getStuPerInfo(params).then(response => {
        console.log(["getStuPerInfo", response])
        resolve(response)
    })
})

const getStuUniverInfo = ({ commit, state }, params) => new Promise(resolve => {
    api.getStuUniverInfo(params).then(response => {
        console.log(["getStuUniverInfo", response])
        resolve(response)
    })
})

const queryAllMajor = ({ commit, state }, params) => new Promise(resolve => {
    api.queryAllMajor(params).then(response => {
        console.log(["queryAllMajor", response])
        resolve(response)
    })
})

const queryCollegeOrg = ({ commit, state }, params) => new Promise(resolve => {
    api.queryCollegeOrg(params).then(response => {
        console.log(["queryCollegeOrg", response])
        resolve(response)
    })
})
export default {
    getStuEconmyInfo,
    getStuPerInfo,
    getStuUniverInfo,
    getStuBaseInfo,
    getDictByDictNames,
    queryAllMajor,
    queryCollegeOrg

}