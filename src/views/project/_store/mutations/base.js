

//设置业务类别下拉列表
export const setServiceTypeList = (state, st) => {
    // for (var i = 0; i < serviceTypeList.length; i++) { 
    //     state.base_project.serviceTypeList.push(serviceTypeList[i])
    // }
    state.baseproject.serviceTypeList = null
    state['baseproject'].serviceTypeList = st
}
//上传地址
export const setUploadAttrUrl = (state, url) => {
    state.baseproject.uploadAttrUrl = url
}

//储存临时项目id
export const setTempProjectId = (state, id) => {
    state.baseproject.tempProjectId = id;
}

export const setProjectServiceType = (state, serType) => {
    state.baseproject.projectFormData.projectServiceType = serType
    state.baseproject.appraiseResultProjectFormData.projectServiceType = serType
    state.baseproject.studyWorkProjectFormData.projectServiceType = serType
    state.baseproject.povertyProjectFormData.projectServiceType = serType
    state.baseproject.nationalGrantsProjectFormData.projectServiceType = serType
    state.baseproject.motivationalScholarshipProjectFormData.projectServiceType = serType
    state.baseproject.nationalScholarshipProjectFormData.projectServiceType = serType
    state.baseproject.studyWorkProjectExpandFormData.projectServiceType = serType
}

//设置项目表单内容表单
export const setProjectFormData = (state, projectFormData) => {
    state.baseproject.projectFormData = projectFormData
}

export const setClassifyType = (state, classifyType) => {
    state.baseproject.classifyType = classifyType
}
export const setAppraiseCategory = (state, appraiseCategoryList) => {
    state.baseproject.appraiseCategoryList = appraiseCategoryList
}

export const setYearTypeList = (state, yearTypeList) => {
    state.baseproject.yearTypeList = yearTypeList
}