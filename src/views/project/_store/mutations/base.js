
export const setBase1 = state => { };
//上传地址
export const setUploadAttrUrl = (state,url) => { 
    state.base_project.uploadAttrUrl = url
}
//设置业务类别下拉列表
export const setServiceTypeList = (state, serviceTypeList) => {
    // for (var i = 0; i < serviceTypeList.length; i++) { 
    //     state.base_project.serviceTypeList.push(serviceTypeList[i])
    // }
    state.base_project.serviceTypeList = serviceTypeList
}