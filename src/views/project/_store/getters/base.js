//获取项目表单信息
export const getProjectFormData = state => {
    return state.baseproject.projectFormData
};

export const getStudyWorkProjectFormData = state => {
    return state.baseproject.studyWorkProjectFormData
};


export const getAppraiseResultProjectFormData = state => {
    return state.baseproject.appraiseResultProjectFormData
};


export const getUploadAttrUrl = state => { 
    return state.baseproject.uploadAttrUrl;
}
export const getServiceTypeList = (state) => { 
    console.log(["baseGetter",state.baseproject.serviceTypeList])
    return state.baseproject.serviceTypeList
}
export const getClassifyTypeList = (state) => {
    return state.baseproject.classifyType
}
export const getappraiseCategoryList = (state) => {
    return state.baseproject.appraiseCategoryList
}
export const getYearTypeList = (state) => {
    return state.baseproject.yearTypeList
}


export const getPovertyProjectFormData = state => {
    return state.baseproject.povertyProjectFormData
};
export const getNationalGrantsProjectFormData = state => {
    return state.baseproject.nationalGrantsProjectFormData
};
export const getMotivationalScholarshipProjectFormData = state => {
    return state.baseproject.motivationalScholarshipProjectFormData
};
export const getNationalScholarshipProjectFormData = state => {
    return state.baseproject.nationalScholarshipProjectFormData
};