
export const baseproject = { 
    serviceTypeList: [],
    classifyType:[],
    appraiseResultProjectFormData: {
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
            id: 0,
            appraiseProjectCode: "",//测评项目代码
            assessSubjects: "",//考评科目(无科目项)
            collegeSubjects: [],//学院可管理科目
            classSubjects: []//班级可管理科目
        }
    },
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
            appraiseId:0,
            appraiseName: "",//名称
            appraiseStartTime: "",//开始时间
            appraiseEndTime: "",//结束时间
            appraiseYearType: "2018",//年度
            appraiseServiceType:""//测评类别
        }
    },
    tempProjectId:"",//临时储存当前项目id
    uploadAttrUrl: "",
    appraiseCategoryList: [],
    yearTypeList:[]
 }