import request from '~/utils/request'
import ajax from '~/utils/ajax'

//附件上传地址
const uploadAttrUrl = process.env.BASE_API + "/project/uploadAttachment.do"
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
        data: data
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

const queryProjectServiceType = data =>
    request({
        url: "/project/queryProjectServiceType.do",
        method: 'post',
        data: data
    })

//----
const queryPovertyProject = data =>
    request({
        url: "/project/queryPovertyProject.do",
        method: 'post',
        data: data
    })
const queryNationalGrantsProject = data =>
    request({
        url: "/project/queryNationalGrantsProject.do",
        method: 'post',
        data: data
    })
const queryMotivationalScholarshipProject = data =>
    request({
        url: "/project/queryMotivationalScholarshipProject.do",
        method: 'post',
        data: data
    })
const queryNationalScholarshipProject = data =>
    request({
        url: "/project/queryNationalScholarshipProject.do",
        method: 'post',
        data: data
    })
const queryPovertyApply = data =>
    request({
        url: "/project/queryPovertyApply.do",
        method: 'post',
        data: data
    })
const queryNationalGrantsApply = data =>
    request({
        url: "/project/queryNationalGrantsApply.do",
        method: 'post',
        data: data
    })
const queryMotivationalScholarshipApply = data =>
    request({
        url: "/project/queryMotivationalScholarshipApply.do",
        method: 'post',
        data: data
    })
const queryNationalScholarshipApply = data =>
    request({
        url: "/project/queryNationalScholarshipApply.do",
        method: 'post',
        data: data
    })

const queryAllClassifyChild = data =>
    request({
        url: "/project/queryAllClassifyChild.do",
        method: 'post',
        data: data
    })
export default {
    queryAllClassifyChild,
    queryPovertyProject,
    queryNationalGrantsProject,
    queryMotivationalScholarshipProject,
    queryNationalScholarshipProject,
    queryPovertyApply,
    queryNationalGrantsApply,
    queryMotivationalScholarshipApply,
    queryNationalScholarshipApply,

    queryProjectServiceType,
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
