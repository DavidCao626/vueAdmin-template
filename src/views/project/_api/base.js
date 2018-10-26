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

const queryEndProject = data =>
    request({
        url: "/studyWork/queryEndProject.do",
        method: 'post',
        data: data
    })

const getSchoolYear = data =>
    request({
        url: "/baseQuality/getSchoolYear.do",
        method: 'post',
        data: data
    })

const querySchoolYear = data =>
    request({
        url: "/schoolYear/querySchoolYear.do",
        method: 'post',
        data: data
    })


const queryAppraisalProjectList = data =>
    request({
        url: "/appraisal/queryAppraisalProjectList.do",
        method: 'post',
        data: data
    })




const querySubsidizeProjectState = data =>
    request({
        url: "/project/querySubsidizeProjectState.do",
        method: 'post',
        data: data
    })

const queryPovertyResult = data =>
    request({
        url: "/project/queryPovertyResult.do",
        method: 'post',
        data: data
    })

const queryNationalGrantsResult = data =>
    request({
        url: "/project/queryNationalGrantsResult.do",
        method: 'post',
        data: data
    })

const queryMotivationalScholarshipResult = data =>
    request({
        url: "/project/queryMotivationalScholarshipResult.do",
        method: 'post',
        data: data
    })

const queryNationalScholarshipResult = data =>
    request({
        url: "/project/queryNationalScholarshipResult.do",
        method: 'post',
        data: data
    })




const getStuEconmyInfo = data =>
    request({
        url: "/stuInfo/getStuEconmyInfo.do",
        method: 'post',
        data: data
    })
const updateStuEcoInfo = data =>
    ajax({
        url: "/stuInfo/updateStuEcoInfo.do",
        method: 'post',
        data: data
    })

const getSubsidizeScoreDataForNG = data =>
    request({
        url: "/projectApply/getSubsidizeScoreDataForNG.do",
        method: 'post',
        data: data
    })

const getSubsidizeScoreDataForNS = data =>
    request({
        url: "/projectApply/getSubsidizeScoreDataForNS.do",
        method: 'post',
        data: data
    })

const queryParticipantRules = data =>
    request({
        url: "/project/queryParticipantRules.do",
        method: 'post',
        data: data
    })

const checkParticipantRules = data =>
    request({
        url: "/project/checkParticipantRules.do",
        method: 'post',
        data: data
    })

const stopScope = data =>
    request({
        url: "/project/stopScope.do",
        method: 'post',
        data: data
    })

const queryStuTypeByEducationLevelCode = data =>
    request({
        url: "/dOrg/queryStuTypeByEducationLevelCode.do",
        method: 'post',
        data: data
    })
export default {
    queryStuTypeByEducationLevelCode,
    stopScope,
    queryParticipantRules,
checkParticipantRules,
    getSubsidizeScoreDataForNG,
    getSubsidizeScoreDataForNS,
    getStuEconmyInfo,
    updateStuEcoInfo,
    queryPovertyResult,
    queryNationalGrantsResult,
    queryMotivationalScholarshipResult,
queryNationalScholarshipResult,
        
        
    querySubsidizeProjectState,
    queryAppraisalProjectList,
    querySchoolYear,
    getSchoolYear,
    queryEndProject,
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
