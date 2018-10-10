import request from '~/utils/request'
import ajax from '~/utils/ajax'

//附件上传地址
const importArtRecord = process.env.BASE_API +"/appraise/importArtRecord.do"

const mytest = data =>
    ajax({
        url: "/expandEval/saveExEveluateBean.do",
        method: 'post',
        data: data
    }) 

const getDictByDictNames = data =>
    request({
        url: "/systemConfApi/getDictByDictNames.do",
        method: 'post',
        data: data
    })

const getCurrentOrgListAndOwner = data =>
    request({
        url: "/systemManagerApi/getCurrentOrgListAndOwner.do",
        method: 'post',
        data: data
    })

const queryMyJobList = data =>
    request({
        url: "/studyWork/queryMyJobList.do",
        method: 'post',
        data: data
    })

const queryJobProjectList = data =>
    request({
        url: "/studyWork/queryJobProjectList.do",
        method: 'post',
        data: data
    })
const getJobStateDict = data =>
    request({
        url: "/studyWork/getJobStateDict.do",
        method: 'post',
        data: data
    })
const insertJob = data =>
    request({
        url: "/studyWork/insertJob.do",
        method: 'post',
        data: data
    })

const queryAllowPublishJobProject = data =>
    request({
        url: "/studyWork/queryAllowPublishJobProject.do",
        method: 'post',
        data: data
    })
const deleteJob = data =>
    request({
        url: "/studyWork/deleteJob.do",
        method: 'post',
        data: data
    })

const updateJob = data =>
    request({
        url: "/studyWork/updateJob.do",
        method: 'post',
        data: data
    })
const getJobById = data =>
    request({
        url: "/studyWork/getJobById.do",
        method: 'post',
        data: data
    })

const checkAllowJobUpdate = data =>
    request({
        url: "/studyWork/checkAllowJobUpdate.do",
        method: 'post',
        data: data
    })

const getProjectStateDict = data =>
    request({
        url: "/studyWork/getProjectStateDict.do",
        method: 'post',
        data: data
    })
const queryApplyRecord = data =>
    request({
        url: "/studyWork/queryApplyRecord.do",
        method: 'post',
        data: data
    })
const getRecordStateDict = data =>
    request({
        url: "/studyWork/getRecordStateDict.do",
        method: 'post',
        data: data
    })

const queryUserResume = data =>
    request({
        url: "/studyWork/queryUserResume.do",
        method: 'post',
        data: data
    })

const getResumeById = data =>
    request({
        url: "/studyWork/getResumeById.do",
        method: 'post',
        data: data
    })

const insertResume = data =>
    request({
        url: "/studyWork/insertResume.do",
        method: 'post',
        data: data
    })

const updateResume = data =>
    request({
        url: "/studyWork/updateResume.do",
        method: 'post',
        data: data
    })

const deleteResume = data =>
    request({
        url: "/studyWork/deleteResume.do",
        method: 'post',
        data: data
    })

const queryNoEndProejct = data =>
    request({
        url: "/studyWork/queryNoEndProejct.do",
        method: 'post',
        data: data
    })
const queryJobList = data =>
    request({
        url: "/studyWork/queryJobList.do",
        method: 'post',
        data: data
    })
const insertApplyRecord = data =>
    request({
        url: "/studyWork/insertApplyRecord.do",
        method: 'post',
        data: data
    })
const queryApplyRecordAndProject = data =>
    request({
        url: "/studyWork/queryApplyRecordAndProject.do",
        method: 'post',
        data: data
    })
const deleteApplyRecord = data =>
    request({
        url: "/studyWork/deleteApplyRecord.do",
        method: 'post',
        data: data
    })

const affirmEmploy = data =>
    request({
        url: "/studyWork/affirmEmploy.do",
        method: 'post',
        data: data
    })

const affirmPost = data =>
    request({
        url: "/studyWork/affirmPost.do",
        method: 'post',
        data: data
    })

const queryProjectList = data =>
    request({
        url: "/studyWork/queryProjectList.do",
        method: 'post',
        data: data
    })

const queryJobByProjectId = data =>
    request({
        url: "/studyWork/queryJobByProjectId.do",
        method: 'post',
        data: data
    })

const getJobCheckStateDict = data =>
    request({
        url: "/studyWork/getJobCheckStateDict.do",
        method: 'post',
        data: data
    })

const completeUserPendingByItemId = data =>
    request({
        url: "/project/completeUserPendingByItemId.do",
        method: "post",
        data: data
    })

const okCheckJobState = data =>
    request({
        url: "/studyWork/okCheckJobState.do",
        method: 'post',
        data: data
    })

const noCheckJobState = data =>
    request({
        url: "/studyWork/noCheckJobState.do",
        method: 'post',
        data: data
    })
const complateCheck = data =>
    request({
        url: "/studyWork/complateCheck.do",
        method: 'post',
        data: data
    })

const updateJobNumbers = data =>
    request({
        url: "/studyWork/updateJobNumbers.do",
        method: 'post',
        data: data
    })

const queryCanApplyJobOrg = data =>
    request({
        url: "/studyWork/queryCanApplyJobOrg.do",
        method: 'post',
        data: data
    })

const importJob = data =>
    request({
        url: "/studyWork/importJob.do",
        method: 'post',
        data: data
    })
    

const getJobTemplateUrl = data =>
    request({
        url: "/studyWork/getJobTemplateUrl.do",
        method: 'post',
        data: data
    })
const getJobTypeDict = data =>
    request({
        url: "/studyWork/getJobTypeDict.do",
        method: 'post',
        data: data
    })



export default {
    getJobTypeDict,
    getJobTemplateUrl,
    importJob,
    mytest,
     queryCanApplyJobOrg,
    updateJobNumbers,
    complateCheck,
    okCheckJobState,
noCheckJobState,
    completeUserPendingByItemId,
    getJobCheckStateDict,
    queryProjectList,
    queryJobByProjectId,

    affirmEmploy,
    affirmPost,

    //简历
    queryUserResume,
    getResumeById,
    insertResume,
    updateResume,
    deleteResume,
    //简历结束

    getCurrentOrgListAndOwner,
    importArtRecord,
    getDictByDictNames,
    queryMyJobList,
    queryJobProjectList,
    getJobStateDict,
    insertJob,
    queryAllowPublishJobProject,
    deleteJob,
    updateJob,
    getJobById,
    checkAllowJobUpdate,
    getProjectStateDict,
    queryApplyRecord,
    getRecordStateDict,
    queryNoEndProejct,
    queryJobList,
    insertApplyRecord,
    queryApplyRecordAndProject,
    deleteApplyRecord
   
};
