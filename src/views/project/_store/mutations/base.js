

//设置业务类别下拉列表
export const setServiceTypeList = (state, st) => {
    // for (var i = 0; i < serviceTypeList.length; i++) { 
    //     state.base_project.serviceTypeList.push(serviceTypeList[i])
    // }
    state.baseproject.serviceTypeList = null
    state['baseproject'].serviceTypeList =st
}
//上传地址
export const setUploadAttrUrl = (state,url) => { 
    state.baseproject.uploadAttrUrl = url
}
