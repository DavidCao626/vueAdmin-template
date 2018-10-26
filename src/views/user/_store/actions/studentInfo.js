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

const updateStuPerInfo = ({ commit, state }, params) => new Promise(resolve => {
    api.updateStuPerInfo(params).then(response => {
        console.log(["updateStuPerInfo", response])
        resolve(response)
    })
})
const updateStuEcoInfo = ({ commit, state }, params) => new Promise(resolve => {
    api.updateStuEcoInfo(params).then(response => {
        console.log(["updateStuEcoInfo", response])
        resolve(response)
    })
})

const queryCurrentOrgStuList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryCurrentOrgStuList(params).then(response => {
        console.log(["queryCurrentOrgStuList", response])
        resolve(response)
    })
})


const createStudent = ({ commit, state }, params) => new Promise(resolve => {
    api.createStudent(params).then(response => {
        console.log(["createStudent", response])
        resolve(response)
    })
})
const updateStuBaseInfo = ({ commit, state }, params) => new Promise(resolve => {
    api.updateStuBaseInfo(params).then(response => {
        console.log(["updateStuBaseInfo", response])
        resolve(response)
    })
})

const updateStuUniverInfo = ({ commit, state }, params) => new Promise(resolve => {
    api.updateStuUniverInfo(params).then(response => {
        console.log(["updateStuUniverInfo", response])
        resolve(response)
    })
})
const queryProvince = ({ commit, state }, params) => new Promise(resolve => {
    api.queryProvince(params).then(response => {
        console.log(["queryProvince", response])
        resolve(response)
    })
})
const queryCityByProvinceCode = ({ commit, state }, params) => new Promise(resolve => {
    api.queryCityByProvinceCode(params).then(response => {
        console.log(["queryCityByProvinceCode", response])
        resolve(response)
    })
})
const queryAreaByCityCode = ({ commit, state }, params) => new Promise(resolve => {
    api.queryAreaByCityCode(params).then(response => {
        console.log(["queryAreaByCityCode", response])
        resolve(response)
    })
})
const queryStreetByAreaCode = ({ commit, state }, params) => new Promise(resolve => {
    api.queryStreetByAreaCode(params).then(response => {
        console.log(["queryStreetByAreaCode", response])
        resolve(response)
    })
})
const queryVillageByStreetCode = ({ commit, state }, params) => new Promise(resolve => {
    api.queryVillageByStreetCode(params).then(response => {
        console.log(["queryVillageByStreetCode", response])
        resolve(response)
    })
})
const queryCollegeClassByCollegeSocailCode = ({ commit, state }, params) => new Promise(resolve => {
    api.queryCollegeClassByCollegeSocailCode(params).then(response => {
        console.log(["queryCollegeClassByCollegeSocailCode", response])
        resolve(response)
    })
})
const importStudentApi = ({ commit, state }, params) => new Promise(resolve => {
    api.importStudentApi(params).then(response => {
        console.log(["importStudentApi", response])
        resolve(response)
    })
})
export default {
    importStudentApi,
queryCollegeClassByCollegeSocailCode,
    queryCityByProvinceCode,
    queryAreaByCityCode,
    queryStreetByAreaCode,
    queryVillageByStreetCode,
    queryProvince,
    getStuEconmyInfo,
    getStuPerInfo,
    getStuUniverInfo,
    getStuBaseInfo,
    getDictByDictNames,
    queryAllMajor,
    queryCollegeOrg,
    updateStuPerInfo,
    updateStuEcoInfo,
    queryCurrentOrgStuList,
    createStudent,
    updateStuBaseInfo,
    updateStuUniverInfo
}