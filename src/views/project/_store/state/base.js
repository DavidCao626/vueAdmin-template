
export const baseproject = { 
    serviceTypeList: [],
    classifyType:[],
    projectFormData : {
        projectId: 0,
        projectName: "",
        projectUserCode: "",
        projectDesc: "",
        projectServiceType: "",
        planStartTime: "",
        planCompleteTime: "",
        isSendPublicNotice: "Y",
        projectAttachmentId: [],
        attrDetailBean: [],
        expand: {
            appraiseId:"",
            appraiseName: "",//名称
            appraiseStartTime: "",//开始时间
            appraiseEndTime: "",//结束时间
            appraiseYearType: "",//年度
            appraiseServiceType:""//测评类别
        }
    },
    tempProjectId:"",//临时储存当前项目id
    uploadAttrUrl: ""
   
 }