//获取项目表单信息
export const getProjectFormData = state => {
    return state.baseproject.projectFormData
};

export const getUploadAttrUrl = state => { 
    return state.baseproject.uploadAttrUrl;
}

export const getServiceTypeList = (state) => { 
    console.log(["baseGetter",state.baseproject.serviceTypeList])
    return state.baseproject.serviceTypeList
}
