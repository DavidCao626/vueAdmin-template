import request from '~/utils/request'
import ajax from '~/utils/ajax'

//附件上传地址
const uploadAttrUrl = process.env.BASE_API+"/project/uploadAttachment.do"
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
const queryCurrentOrgStuList = data =>
    request({
        url: "/stuInfo/queryCurrentOrgStuList.do",
        method: 'post',
        data: data
    })

const queryResignationByStuNo = data =>
    request({
        url: "/stuInfo/queryResignationByStuNo.do",
        method: 'post',
        data: data
    })

export default {
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
    queryResignationByStuNo
};
