import request from '~/utils/request'
import ajax from '~/utils/ajax'

//附件上传地址
const uploadAttrUrl = process.env.BASE_API+"/project/uploadAttachment.do"

const importStudent = process.env.BASE_API + "/stuInfo/importStudent.do"

//增加或者更新项目
const getDictByDictNames = data =>
    request({
        url: "/systemConfApi/getDictByDictNames.do",
        method: 'post',
        data: data
    })

const getStuBaseInfo = data =>
    request({
        url: "/stuInfo/getStuBaseInfo.do",
        method: 'post',
        data: data
    })

const getStuEconmyInfo = data =>
    request({
        url: "/stuInfo/getStuEconmyInfo.do",
        method: 'post',
        data: data
    })
const getStuPerInfo = data =>
    request({
        url: "/stuInfo/getStuPerInfo.do",
        method: 'post',
        data: data
    })
const getStuUniverInfo = data =>
    request({
        url: "/stuInfo/getStuUniverInfo.do",
        method: 'post',
        data: data
    })

const queryAllMajor = data =>
    request({
        url: "/stuInfo/queryAllMajor.do",
        method: 'post',
        data: data
    })
const queryCollegeOrg = data =>
    request({
        url: "/stuInfo/queryCollegeOrg.do",
        method: 'post',
        data: data
    })


const updateStuPerInfo = data =>
    ajax({
        url: "/stuInfo/updateStuPerInfo.do",
        method: 'post',
        data: data
    })
const updateStuEcoInfo = data =>
    ajax({
        url: "/stuInfo/updateStuEcoInfo.do",
        method: 'post',
        data: data
    })


const updateStuBaseInfo = data =>
    ajax({
        url: "/stuInfo/updateStuBaseInfo.do",
        method: 'post',
        data: data
    })

const createStudent = data =>
    ajax({
        url: "/stuInfo/createStudent.do",
        method: 'post',
        data: data
    })



const queryCurrentOrgStuList = data =>
    request({
        url: "/stuInfo/queryCurrentOrgStuList.do",
        method: 'post',
        data: data
    })

const updateStuUniverInfo = data =>
    ajax({
        url: "/stuInfo/updateStuUniverInfo.do",
        method: 'post',
        data: data
    })
const queryProvince = data =>
    ajax({
        url: "/stuInfo/queryProvince.do",
        method: 'post',
        data: data
    })

const queryCityByProvinceCode = data =>
    request({
        url: "/stuInfo/queryCityByProvinceCode.do",
        method: 'post',
        data: data
    })
const queryAreaByCityCode = data =>
    request({
        url: "/stuInfo/queryAreaByCityCode.do",
        method: 'post',
        data: data
    })
const queryStreetByAreaCode = data =>
    request({
        url: "/stuInfo/queryStreetByAreaCode.do",
        method: 'post',
        data: data
    })
const queryVillageByStreetCode = data =>
    request({
        url: "/stuInfo/queryVillageByStreetCode.do",
        method: 'post',
        data: data
    })
const queryCollegeClassByCollegeSocailCode = data =>
    request({
        url: "/dOrg/queryCollegeClassByCollegeSocailCode.do",
        method: 'post',
        data: data
    })
const importStudentApi = data =>
    request({
        url: "/stuInfo/importStudent.do",
        method: 'post',
        data: data
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
    getStuUniverInfo,
    getStuPerInfo,
    uploadAttrUrl,
    getDictByDictNames,
    getStuBaseInfo,
    queryAllMajor,
    queryCollegeOrg,
    updateStuPerInfo,
    updateStuEcoInfo,
    queryCurrentOrgStuList,
    createStudent,
    updateStuBaseInfo,
    updateStuUniverInfo,
    importStudent
};
