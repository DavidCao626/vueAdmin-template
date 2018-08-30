import request from '~/utils/request'
import ajax from '~/utils/ajax'

//附件上传地址
const uploadAttrUrl = process.env.BASE_API+"/project/uploadAttachment.do"
//增加或者更新项目
const insertOrUpdateProject = data =>
    ajax({
        url: '/project/insertOrUpdateProject.do',
        method: 'post',
        data: data
    })

//获取业务类别
const queryServiceTypeList = () =>

    request({
        url: '/project/queryServiceTypeList.do',
        method: 'post'
    })


const getProjectById = (data) =>

    request({
        url: '/project/getProjectById.do',
        method: 'post',
        data: data
    })

const insertOrUpdateAndNext = (data) =>
    ajax({
        url: '/project/insertOrUpdateAndNext.do',
        method: 'post',
        data: data
    })

const savePublicityEdit = data =>
    request({
        url: '/project/savePublicityEdit.do',
        method: 'post',
        data: data
    })

const queryNoticeTemplateByItemId = data =>
    request({
        url: "/project/queryNoticeTemplateByItemId.do",
        method: 'post',
        data:data
    })

const getProjectAllDataByItemId = data =>
    request({
        url: "/project/getProjectAllDataByItemId.do",
        method: 'post',
        data: data
    })


const queryClassifyTypeByCode = data =>
    request({
        url: "/project/queryClassifyTypeByCode.do",
        method: 'post',
        data: data
    })


const queryCategoryList = data =>
    request({
        url: "/appraise/queryCategoryList.do",
        method: 'post',
        data: data
    })

const getStudentApplyProject = data =>
    request({
        url: "/appraise/getStudentApplyProject.do",
        method: 'post',
        data: data
    })


const queryIncludUnEnableStandardSubject = data =>
    request({
        url: "/appraise/queryIncludUnEnableStandardSubject.do",
        method: 'post',
        data: data
    })

const queryIncludEnableStandardSubject = data =>
    request({
        url: "/appraise/queryIncludEnableStandardSubject.do",
        method: 'post',
        data: data
    })

const startStudyWorkProject = data =>
    request({
        url: "/studyWork/startProject.do",
        method: 'post',
        data: data
    })
const queryProjectList = data =>
    request({
        url: "/project/queryProjectList.do",
        method: 'post',
        data: data
    })


export default {
    queryProjectList,
    startStudyWorkProject,
    insertOrUpdateProject,
    uploadAttrUrl,
    queryServiceTypeList,
    getProjectById,
    insertOrUpdateAndNext,
    savePublicityEdit,
    queryNoticeTemplateByItemId,
    getProjectAllDataByItemId,
    queryClassifyTypeByCode,
    queryCategoryList,
    getStudentApplyProject,
    queryIncludUnEnableStandardSubject,
    queryIncludEnableStandardSubject
};
