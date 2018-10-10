import api from '../../_api/base.js'

const getDictByDictNames = ({ commit, state }, params) => new Promise(resolve => {
    api.getDictByDictNames(params).then(response => {
        console.log(["getDictByDictNamesAction", response])
        resolve(response)
    })
})

const getCurrentOrgListAndOwner = ({ commit, state }, params) => new Promise(resolve => {
    api.getCurrentOrgListAndOwner(params).then(response => {
        console.log(["getCurrentOrgListAndOwner", response])
        resolve(response)
    })
})

const queryMyJobList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryMyJobList(params).then(response => {
        console.log(["queryMyJobList", response])
        resolve(response)
    })
})

const queryJobProjectList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryJobProjectList(params).then(response => {
        console.log(["queryJobProjectList", response])
        resolve(response)
    })
})

const getJobStateDict = ({ commit, state }, params) => new Promise(resolve => {
    api.getJobStateDict(params).then(response => {
        console.log(["getJobStateDict", response])
        resolve(response)
    })
})

const insertJob = ({ commit, state }, params) => new Promise(resolve => {
    api.insertJob(params).then(response => {
        console.log(["insertJob", response])
        resolve(response)
    })
})

const queryAllowPublishJobProject = ({ commit, state }, params) => new Promise(resolve => {
    api.queryAllowPublishJobProject(params).then(response => {
        console.log(["queryAllowPublishJobProject", response])
        resolve(response)
    })
})

const deleteJob = ({ commit, state }, params) => new Promise(resolve => {
    api.deleteJob(params).then(response => {
        console.log(["deleteJob", response])
        resolve(response)
    })
})

const updateJob = ({ commit, state }, params) => new Promise(resolve => {
    api.updateJob(params).then(response => {
        console.log(["updateJob", response])
        resolve(response)
    })
})

const getJobById = ({ commit, state }, params) => new Promise(resolve => {
    api.getJobById(params).then(response => {
        console.log(["getJobById", response])
        resolve(response)
    })
})


const checkAllowJobUpdate = ({ commit, state }, params) => new Promise(resolve => {
    api.checkAllowJobUpdate(params).then(response => {
        console.log(["checkAllowJobUpdate", response])
        resolve(response)
    })
})

const getProjectStateDict = ({ commit, state }, params) => new Promise(resolve => {
    api.getProjectStateDict(params).then(response => {
        console.log(["getProjectStateDict", response])
        resolve(response)
    })
})


const queryApplyRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.queryApplyRecord(params).then(response => {
        console.log(["queryApplyRecord", response])
        resolve(response)
    })
})


const getRecordStateDict = ({ commit, state }, params) => new Promise(resolve => {
    api.getRecordStateDict(params).then(response => {
        console.log(["getRecordStateDict", response])
        resolve(response)
    })
})


const queryUserResume = ({ commit, state }, params) => new Promise(resolve => {
    api.queryUserResume(params).then(response => {
        console.log(["queryUserResume", response])
        resolve(response)
    })
})

const getResumeById = ({ commit, state }, params) => new Promise(resolve => {
    api.getResumeById(params).then(response => {
        console.log(["getResumeById", response])
        resolve(response)
    })
})

const insertResume = ({ commit, state }, params) => new Promise(resolve => {
    api.insertResume(params).then(response => {
        console.log(["insertResume", response])
        resolve(response)
    })
})

const updateResume = ({ commit, state }, params) => new Promise(resolve => {
    api.updateResume(params).then(response => {
        console.log(["updateResume", response])
        resolve(response)
    })
})

const deleteResume = ({ commit, state }, params) => new Promise(resolve => {
    api.deleteResume(params).then(response => {
        console.log(["deleteResume", response])
        resolve(response)
    })
})

const queryNoEndProejct = ({ commit, state }, params) => new Promise(resolve => {
    api.queryNoEndProejct(params).then(response => {
        console.log(["queryNoEndProejct", response])
        resolve(response)
    })
})

const queryJobList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryJobList(params).then(response => {
        console.log(["queryJobList", response])
        resolve(response)
    })
})

const insertApplyRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.insertApplyRecord(params).then(response => {
        console.log(["insertApplyRecord", response])
        resolve(response)
    })
})

const queryApplyRecordAndProject = ({ commit, state }, params) => new Promise(resolve => {
    api.queryApplyRecordAndProject(params).then(response => {
        console.log(["queryApplyRecordAndProject", response])
        resolve(response)
    })
})

const deleteApplyRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.deleteApplyRecord(params).then(response => {
        console.log(["deleteApplyRecord", response])
        resolve(response)
    })
})

const affirmEmploy = ({ commit, state }, params) => new Promise(resolve => {
    api.affirmEmploy(params).then(response => {
        console.log(["affirmEmploy", response])
        resolve(response)
    })
})

const affirmPost = ({ commit, state }, params) => new Promise(resolve => {
    api.affirmPost(params).then(response => {
        console.log(["affirmPost", response])
        resolve(response)
    })
})

const queryProjectList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryProjectList(params).then(response => {
        console.log(["queryProjectList", response])
        resolve(response)
    })
})

const queryJobByProjectId = ({ commit, state }, params) => new Promise(resolve => {
    api.queryJobByProjectId(params).then(response => {
        console.log(["queryJobByProjectId", response])
        resolve(response)
    })
})
const getJobCheckStateDict = ({ commit, state }, params) => new Promise(resolve => {
    api.getJobCheckStateDict(params).then(response => {
        console.log(["getJobCheckStateDict", response])
        resolve(response)
    })
})
const completeUserPendingByItemId = ({ commit, state }, params) => new Promise(resolve => {
    api.completeUserPendingByItemId(params).then(response => {
        console.log(["completeUserPendingByItemId", response])
        resolve(response)
    })
})

const noCheckJobState = ({ commit, state }, params) => new Promise(resolve => {
    api.noCheckJobState(params).then(response => {
        console.log(["noCheckJobState", response])
        resolve(response)
    })
})

const okCheckJobState = ({ commit, state }, params) => new Promise(resolve => {
    api.okCheckJobState(params).then(response => {
        console.log(["okCheckJobState", response])
        resolve(response)
    })
})
const complateCheck = ({ commit, state }, params) => new Promise(resolve => {
    api.complateCheck(params).then(response => {
        console.log(["complateCheck", response])
        resolve(response)
    })
})


const updateJobNumbers = ({ commit, state }, params) => new Promise(resolve => {
    api.updateJobNumbers(params).then(response => {
        console.log(["updateJobNumbers", response])
        resolve(response)
    })
})
const queryCanApplyJobOrg = ({ commit, state }, params) => new Promise(resolve => {
    api.queryCanApplyJobOrg(params).then(response => {
        console.log(["queryCanApplyJobOrg", response])
        resolve(response)
    })
})

const mytest = ({ commit, state }, params) => new Promise(resolve => {
    api.mytest(params).then(response => {
        console.log(["mytest", response])
        resolve(response)
    })
})

const importJob = ({ commit, state }, params) => new Promise(resolve => {
    api.importJob(params).then(response => {
        console.log(["importJob", response])
        resolve(response)
    })
})
const getJobTemplateUrl = ({ commit, state }, params) => new Promise(resolve => {
    api.getJobTemplateUrl(params).then(response => {
        console.log(["getJobTemplateUrl", response])
        resolve(response)
    })
})

const getJobTypeDict = ({ commit, state }, params) => new Promise(resolve => {
    api.getJobTypeDict(params).then(response => {
        console.log(["getJobTypeDict", response])
        resolve(response)
    })
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
    queryApplyRecordAndProject,
    deleteApplyRecord,
    queryUserResume,
    getResumeById,
    insertResume,
    updateResume,
    deleteResume,

    getDictByDictNames,
    getCurrentOrgListAndOwner,
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
    insertApplyRecord
}