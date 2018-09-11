
export const baseproject = {
    povertyProjectFormData: {
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
            yearType: "2018"
        }
    },
    //国家助学金
    nationalGrantsProjectFormData: {
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
            yearType: "2018"
        }
    },
    //励志奖学金
    motivationalScholarshipProjectFormData: {
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
            yearType: "2018",
            appraiseProjectCode: ""//测评项目代码
        }
    },
    //国家奖学金
    nationalScholarshipProjectFormData: {
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
            yearType: "2018",
            appraiseProjectCode: ""//测评项目代码
        }
    },




    serviceTypeList: [],
    classifyType: [],
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
            classSubjects: [],//班级可管理科目
            academicSubjects: ""//学业科目
        }
    },
    projectFormData: {
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
            appraiseId: 0,
            appraiseName: "",//名称
            appraiseStartTime: "",//开始时间
            appraiseEndTime: "",//结束时间
            appraiseYearType: "2018",//年度
            appraiseServiceType: ""//测评类别
        }
    },
    studyWorkProjectFormData: {
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
            name: "",//名称
            startTime: "",//开始时间
            endTime: "",//结束时间
            yearType: "2018"//年度
        }
    },
    //勤工俭学扩展
    studyWorkProjectExpandFormData: {
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
            projectCode: ""//名称
        }
    },
    tempProjectId: "",//临时储存当前项目id
    uploadAttrUrl: "",
    appraiseCategoryList: [],
    yearTypeList: []
}