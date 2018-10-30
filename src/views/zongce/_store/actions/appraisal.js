import api from '../../_api/appraisal.js'

const getDictByDictNames = ({ commit, state }, params) => new Promise(resolve => {
    api.getDictByDictNames(params).then(response => {
        console.log(["getDictByDictNamesAction", response])
        resolve(response)
    })
})
const queryConfigList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryConfigList(params).then(response => {
        console.log(["queryConfigList", response])
        resolve(response)
    })
})
const getEvaluateTemplate = ({ commit, state }, params) => new Promise(resolve => {
    api.getEvaluateTemplate(params).then(response => {
        console.log(["getEvaluateTemplate", response])
        resolve(response)
    })
})

const saveEvaluateTemplate = ({ commit, state }, params) => new Promise(resolve => {
    api.saveEvaluateTemplate(params).then(response => {
        console.log(["saveEvaluateTemplate", response])
        resolve(response)
    })
})

const processAppraisalRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.processAppraisalRecord(params).then(response => {
        console.log(["processAppraisalRecord", response])
        resolve(response)
    })
})
const queryAppraisalRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.queryAppraisalRecord(params).then(response => {
        console.log(["queryAppraisalRecord", response])
        resolve(response)
    })
})
const queryProjectList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryProjectList(params).then(response => {
        console.log(["queryProjectList", response])
        resolve(response)
    })
})
const getAppraisalProjectState = ({ commit, state }, params) => new Promise(resolve => {
    api.getAppraisalProjectState(params).then(response => {
        console.log(["getAppraisalProjectState", response])
        resolve(response)
    })
})
const getAppraisalRecordState = ({ commit, state }, params) => new Promise(resolve => {
    api.getAppraisalRecordState(params).then(response => {
        console.log(["getAppraisalRecordState", response])
        resolve(response)
    })
})

const querySchoolYear = ({ commit, state }, params) => new Promise(resolve => {
    api.querySchoolYear(params).then(response => {
        console.log(["querySchoolYear", response])
        resolve(response)
    })
})

const queryAppraisalRankList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryAppraisalRankList(params).then(response => {
        console.log(["queryAppraisalRankList", response])
        resolve(response)
    })
})

const queryAppraisalRankForStaff = ({ commit, state }, params) => new Promise(resolve => {
    api.queryAppraisalRankForStaff(params).then(response => {
        console.log(["queryAppraisalRankForStaff", response])
        resolve(response)
    })
})

const queryAppraisalRankForStu = ({ commit, state }, params) => new Promise(resolve => {
    api.queryAppraisalRankForStu(params).then(response => {
        console.log(["queryAppraisalRankForStu", response])
        resolve(response)
    })
})
const deleteAppraisalProject = ({ commit, state }, params) => new Promise(resolve => {
    api.deleteAppraisalProject(params).then(response => {
        console.log(["deleteAppraisalProject", response])
        resolve(response)
    })
})

const queryAppraisalRankForCollegeAndClass = ({ commit, state }, params) => new Promise(resolve => {
    api.queryAppraisalRankForCollegeAndClass(params).then(response => {
        console.log(["queryAppraisalRankForCollegeAndClass", response])
        resolve(response)
    })
})

const deleteAppraisalProjectSchool = ({ commit, state }, params) => new Promise(resolve => {
    api.deleteAppraisalProjectSchool(params).then(response => {
        console.log(["deleteAppraisalProjectSchool", response])
        resolve(response)
    })
})
const queryProjectListSchool = ({ commit, state }, params) => new Promise(resolve => {
    api.queryProjectListSchool(params).then(response => {
        console.log(["queryProjectListSchool", response])
        resolve(response)
    })
})
const processSchoolAppraisalRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.processSchoolAppraisalRecord(params).then(response => {
        console.log(["processSchoolAppraisalRecord", response])
        resolve(response)
    })
})

const querySchoolAppraisalRankForCollegeAndClass = ({ commit, state }, params) => new Promise(resolve => {
    api.querySchoolAppraisalRankForCollegeAndClass(params).then(response => {
        console.log(["querySchoolAppraisalRankForCollegeAndClass", response])
        resolve(response)
    })
})
const processAppraisalRecordSchoolB = ({ commit, state }, params) => new Promise(resolve => {
    api.processAppraisalRecordSchoolB(params).then(response => {
        console.log(["processAppraisalRecordSchoolB", response])
        resolve(response)
    })
})
const processAppraisalRecordB = ({ commit, state }, params) => new Promise(resolve => {
    api.processAppraisalRecordB(params).then(response => {
        console.log(["processAppraisalRecordB", response])
        resolve(response)
    })
})
const queryAppraisalClassRecord = ({ commit, state }, params) => new Promise(resolve => {
    api.queryAppraisalClassRecord(params).then(response => {
        console.log(["queryAppraisalClassRecord", response])
        resolve(response)
    })
})
const lockAppraisalResult = ({ commit, state }, params) => new Promise(resolve => {
    api.lockAppraisalResult(params).then(response => {
        console.log(["lockAppraisalResult", response])
        resolve(response)
    })
})
export default {
    lockAppraisalResult,
    processAppraisalRecordSchoolB,
    processAppraisalRecordB,
    queryAppraisalClassRecord,
    querySchoolAppraisalRankForCollegeAndClass,
    deleteAppraisalProjectSchool,
    queryProjectListSchool,
    processSchoolAppraisalRecord,

    queryAppraisalRankForCollegeAndClass,
    deleteAppraisalProject,
    queryAppraisalRankList,
    queryAppraisalRankForStaff,
    queryAppraisalRankForStu,
    querySchoolYear,
    getAppraisalProjectState,
    getAppraisalRecordState,
    processAppraisalRecord,
    queryAppraisalRecord,
    queryProjectList,
    queryConfigList,
    getEvaluateTemplate,
    saveEvaluateTemplate
}