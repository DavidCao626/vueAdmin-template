//获取项目表单信息
export const getProjectFormData = state => {
    return state.base_project.projectFormData
};

export const getUploadAttrUrl = state => { 
    return state.base_project.uploadAttrUrl;
}

export const getServiceTypeList = state => { 
    console.log(["baseGetter",state.base_project.serviceTypeList])
    return state.base_project.serviceTypeList
}
