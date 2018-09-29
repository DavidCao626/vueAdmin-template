import api from '../../_api/base.js'
//增加或者修改项目
const insertOrUpdateProject = ({ commit, state }, projectData) =>
  new Promise(resolve => {
    // if (state.projectInfoData.id) return;
    api.insertOrUpdateProject(projectData).then(response => {
      resolve(response)
    })
  })
//增加或者修改并下一步
const insertOrUpdateAndNext = ({ commit, state }, projectData) =>
  new Promise(resolve => {
    // if (state.projectInfoData.id) return;
    api.insertOrUpdateAndNext(projectData).then(response => {
      resolve(response)
    })
  })



//查询业务类别列表调用mutations赋值给state
const queryServiceTypeList = ({ commit, state }) =>
  new Promise(resolve => {
    api.queryServiceTypeList().then(response => {
      commit("setServiceTypeList", response.resBody)
      resolve(response)
    })
  })

const setProjectServiceType = ({ commit, state }, serType) => {
  api.queryClassifyTypeByCode({ 'code': serType }).then(response => {
    commit("setClassifyType", response.resBody)
  })
  commit('setProjectServiceType', serType)
}

const getProjectById = ({ commit, state }, projectId) =>
  new Promise(resolve => {
    api.getProjectById({ 'projectId': projectId }).then(response => {
      var ps = response.resBody.planStartTime;
      var pe = response.resBody.planCompleteTime;
      var psdate = new Date(Date.parse(ps.replace(/-/g, "/")));
      var pedate = new Date(Date.parse(pe.replace(/-/g, "/")));
      var att = response.resBody.projectAttachmentId;
      console.log(["attArray", Array.isArray(att)])
      if (att != null && att != "") {
        if (!Array.isArray(att)) {
          var t = [];
          t[0] = att;
          response.resBody.projectAttachmentId = t
        }
      }
      response.resBody.planStartTime = psdate
      response.resBody.planCompleteTime = pedate

      api.queryClassifyTypeByCode({ 'code': response.resBody.projectServiceType }).then(response => {
        commit("setClassifyType", response.resBody)
      })

      commit("setProjectFormData", response.resBody)
    })
  })
const savePublicityEdit = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.savePublicityEdit(data).then(response => {
      resolve(response)
    })
  })

const queryNoticeTemplateByItemId = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryNoticeTemplateByItemId(data).then(response => {
      resolve(response)
    })
  })

const getProjectAllDataByItemId = ({ commit, state }, data) =>
  new Promise(resolve => {
    queryClassifyTypeByCode
    api.getProjectAllDataByItemId(data).then(response => {
      resolve(response)
    })
  })

const queryClassifyTypeByCode = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryClassifyTypeByCode(data).then(response => {
      resolve(response)
    })
  })

const queryCategoryList = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryCategoryList(data).then(response => {
      commit("setAppraiseCategory", response.resBody)

    })
  })
const getStudentApplyProject = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.getStudentApplyProject(data).then(response => {
      resolve(response)

    })
  })

const queryIncludUnEnableStandardSubject = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryIncludUnEnableStandardSubject(data).then(response => {
      resolve(response)

    })
  })
const queryIncludEnableStandardSubject = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryIncludEnableStandardSubject(data).then(response => {
      resolve(response)

    })
  })

const startStudyWorkProject = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.startStudyWorkProject(data).then(response => {
      resolve(response)

    })
  })
const queryProjectList = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryProjectList(data).then(response => {
      resolve(response)

    })
  })

const queryProjectServiceType = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryProjectServiceType(data).then(response => {
      resolve(response)

    })
  })

const queryPovertyProject = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryPovertyProject(data).then(response => {
      resolve(response)
    })
  })

const queryNationalGrantsProject = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryNationalGrantsProject(data).then(response => {
      resolve(response)
    })
  })
const queryMotivationalScholarshipProject = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryMotivationalScholarshipProject(data).then(response => {
      resolve(response)
    })
  })
const queryNationalScholarshipProject = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryNationalScholarshipProject(data).then(response => {
      resolve(response)
    })
  })


const queryPovertyApply = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryPovertyApply(data).then(response => {
      resolve(response)
    })
  })

const queryNationalGrantsApply = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryNationalGrantsApply(data).then(response => {
      resolve(response)
    })
  })

const queryMotivationalScholarshipApply = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryMotivationalScholarshipApply(data).then(response => {
      resolve(response)
    })
  })

const queryNationalScholarshipApply = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryNationalScholarshipApply(data).then(response => {
      resolve(response)
    })
  })
const queryAllClassifyChild = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryAllClassifyChild(data).then(response => {
      resolve(response)
    })
  })

const queryEndProject = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryEndProject(data).then(response => {
      resolve(response)
    })
  })
const getSchoolYear = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.getSchoolYear(data).then(response => {
      resolve(response)
    })
  })
const querySchoolYear = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.querySchoolYear(data).then(response => {
      resolve(response)
    })
  })

const queryAppraisalProjectList = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryAppraisalProjectList(data).then(response => {
      resolve(response)
    })
  })
const querySubsidizeProjectState = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.querySubsidizeProjectState(data).then(response => {
      resolve(response)
    })
  })
const queryPovertyResult = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryPovertyResult(data).then(response => {
      resolve(response)
    })
  })
const queryNationalGrantsResult = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryNationalGrantsResult(data).then(response => {
      resolve(response)
    })
  })
const queryMotivationalScholarshipResult = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryMotivationalScholarshipResult(data).then(response => {
      resolve(response)
    })
  })
const queryNationalScholarshipResult = ({ commit, state }, data) =>
  new Promise(resolve => {
    api.queryNationalScholarshipResult(data).then(response => {
      resolve(response)
    })
  })

export default {
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
  setProjectServiceType,
  insertOrUpdateProject,
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
  queryIncludEnableStandardSubject,
  startStudyWorkProject
}
