export const projectRouter = {
  path: "/project",
  redirect: "/project/control",
  name: "项目管理",
  component: () => import("../_layout/layout.vue"),
  meta: { title: "项目控制台", icon: "example", hidden: false },
  children: [
    {
      path: "my",
      name: "我的项目",
      component: () => import("../myProject"),
      meta: { hidden: false }
    },
    {
      path: "projectManager",
      name: "资助项目管理",
      component: () => import("../projectManager"),
      meta: { hidden: false }
    },
    {
      path: "myScope",
      name: "与我相关",
      component: () => import("../myScope"),
      meta: { hidden: false }
    },
    {
      path: "childScope",
      name: "子环节",
      component: () => import("../childScope"),
      meta: { hidden: false }
    },
    {
      path: "appraiseChildScope",
      name: "查看下级数据",
      component: () => import("../appraiseChildScope"),
      meta: { hidden: false }
    },
    { path: "todos", name: "我的待办", component: () => import("../myTodos") },
    {
      path: "dones",
      name: "我的已完成待办",
      component: () => import("../myDoneTodos")
    },
    {
      path: "add",
      name: "新建项目",
      component: () => import("../base.vue"),
      meta: { hidden: true }
    },
    {
      path: "addgj",
      name: "新建国家奖学金",
      component: () => import("../base.vue"),
      meta: { hidden: true }
    },
    {
      path: "addlz",
      name: "新建励志奖学金",
      component: () => import("../base.vue"),
      meta: { hidden: true }
    },
    {
      path: "addpk",
      name: "新建贫困建档",
      component: () => import("../base.vue"),
      meta: { hidden: true }
    },
    {
      path: "addzxj",
      name: "新建国家助学金",
      component: () => import("../base.vue"),
      meta: { hidden: true }
    },
    {
      path: "control-home",
      name: "项目控制台首页",
      component: () => import("../contrl.vue")
    },
    {
      path: "control",
      name: "项目控制台",
      component: () => import("../contrl/index.vue")
    },
    {
      path: "nodeChild",
      name: "查看项目节点",
      component: () => import("../contrl/nodeChild.vue")
    },
    {
      path: "nodeData",
      name: "查看项目数据",
      component: () => import("../contrl/nodeData.vue")
    },
    {
      path: "config-home",
      name: "projectConfig-home",
      component: () => import("../config.vue"),
      meta: { hidden: true }
    },
    {
      path: "config",
      name: "projectConfig",
      component: () => import("../config/index.vue"),
      meta: { hidden: true }
    },
    {
      path: "configClass",
      name: "configClass",
      component: () => import("../config/indexClass.vue"),
      meta: { hidden: true }
    },
    {
      path: "configCollege",
      name: "configCollege",
      component: () => import("../config/indexCollege.vue"),
      meta: { hidden: true }
    },
    {
      path: "start",
      name: "project_start",
      title: "下发任务",
      component: () => import("../start"),
      meta: { hidden: true }
    },
    {
      path: "studentForm",
      name: "student_Form",
      title: "学生申请表",
      component: () => import("../styles/studentForm.vue"),
      meta: { hidden: true }
    },
    {
      path: "stylesApproval",
      name: "styles_approval",
      title: "项目审批",
      component: () => import("../styles/approval/list.vue"),
      meta: { hidden: true }
    },
    {
      path: "stylesAudit",
      name: "styles_audit",
      title: "项目审批",
      component: () => import("../styles/audit/index.vue"),
      meta: { hidden: true }
    },
    {
      path: "configParticipant",
      name: "configParticipant",
      title: "配置班级参与者",
      component: () => import("../styles/configParticipant/index.vue"),
      meta: { hidden: false }
    },
    {
      path: "collegeParticipant",
      name: "collegeParticipant",
      title: "配置学院参与者",
      component: () => import("../styles/configParticipant/college.vue"),
      meta: { hidden: false }
    },
    {
      path: "schoolParticipant",
      name: "schoolParticipant",
      title: "配置学校参与者",
      component: () => import("../styles/configParticipant/school.vue"),
      meta: { hidden: false }
    },
    {
      path: "stylesAuditTable",
      name: "styles_audit_table",
      title: "项目审批",
      component: () => import("../styles/audit/table.vue"),
      meta: { hidden: true }
    },
    {
      path: "stylesNewTable",
      name: "styles_new_table",
      title: "班级审批",
      component: () => import("../styles/audit/classTable.vue"),
      meta: { hidden: true, title: "班级审批" }
    },
    {
      path: "stylesCollegeTable",
      name: "styles_college_table",
      title: "学院审批",
      component: () => import("../styles/audit/collegeTable.vue"),
      meta: { hidden: true, title: "学院审批" }
    },
    {
      path: "stylesSchoolTable",
      name: "styles_school_table",
      title: "学校审批",
      component: () => import("../styles/audit/schoolTable.vue"),
      meta: { hidden: true, title: "学校审批" }
    },
    {
      path: "studentHuping",
      name: "student_Huping",
      title: "班级互评",
      component: () => import("../styles/stuhuping.vue"),
      meta: { hidden: true, title: "班级互评" }
    },
    {
      path: "showClassData",
      name: "showClassData",
      title: "班级环节数据",
      component: () => import("../styles/showScopeData/classTable.vue"),
      meta: { hidden: true, title: "班级环节数据" }
    },
    {
      path: "showCollegeData",
      name: "showCollegeData",
      title: "学院环节数据",
      component: () => import("../styles/showScopeData/collegeTable.vue"),
      meta: { hidden: true, title: "学院环节数据" }
    },
    {
      path: "showSchoolData",
      name: "showSchoolData",
      title: "学校环节数据",
      component: () => import("../styles/showScopeData/schoolTable.vue"),
      meta: { hidden: true, title: "学校环节数据" }
    },
    {
      path: "stuzuping",
      name: "stuzuping",
      title: "班级组评",
      component: () => import("../styles/stuzuping.vue"),
      meta: { hidden: true, title: "班级组评" }
    },
    {
      path: "xyhuping",
      name: "xyhuping",
      title: "学院组评",
      component: () => import("../styles/xyzuping.vue"),
      meta: { hidden: true, title: "学院组评" }
    },
    {
      path: "xxzuping",
      name: "xxzuping",
      title: "学校组评",
      component: () => import("../styles/xxzuping.vue"),
      meta: { hidden: true, title: "学校组评" }
    },
    {
      path: "publicityEdit",
      name: "publicityEdit",
      title: "编辑公示",
      component: () => import("../publicityEdit"),
      meta: { hidden: true }
    },
    {
      //奖学金
      path: "scholarshipApply",
      name: "scholarshipApply",
      title: "国家奖学金申请",
      component: () => import("../styles/NationalScholarshipApply.vue"),
      meta: { hidden: true }
    },
    {
      //励志奖学金
      path: "MotivationScholarshipApply",
      name: "MotivationScholarshipApply",
      title: "励志奖学金申请",
      component: () => import("../styles/MotivationScholarshipApply.vue"),
      meta: { hidden: true }
    },
    {
      //奖学金
      path: "NationSchClassCheck",
      name: "NationSchClassCheck",
      title: "班级审批",
      component: () => import("../styles/NationSchoCheck/classTable.vue"),
      meta: { hidden: true, title: "班级审批" }
    },
    {
      //奖学金
      path: "NationSchCollegeCheck",
      name: "NationSchCollegeCheck",
      title: "学院审批",
      component: () => import("../styles/NationSchoCheck/collegeTable.vue"),
      meta: { hidden: true, title: "学院审批" }
    },
    {
      //奖学金
      path: "NationSchSchoolCheck",
      name: "NationSchSchoolCheck",
      title: "学校审批",
      component: () => import("../styles/NationSchoCheck/schoolTable.vue"),
      meta: { hidden: true, title: "学校审批" }
    },
    {
      //奖学金学院评
      path: "gsxypingyi",
      name: "gsxypingyi",
      title: "学院组评",
      component: () => import("../styles/gsxypingyi.vue"),
      meta: { hidden: true, title: "学院组评" }
    },
    {
      //奖学金学校评
      path: "gsxxpingyi",
      name: "gsxxpingyi",
      title: "学校组评",
      component: () => import("../styles/gsxxpingyi.vue"),
      meta: { hidden: true, title: "学校组评" }
    },
    {
      //奖学金
      path: "gsShowClassData",
      name: "gsShowClassData",
      title: "班级环节数据",
      component: () => import("../styles/showNationSchoData/classTable.vue"),
      meta: { hidden: true, title: "班级环节数据" }
    },
    {
      //奖学金
      path: "gsShowCollegeData",
      name: "gsShowCollegeData",
      title: "学院环节数据",
      component: () => import("../styles/showNationSchoData/collegeTable.vue"),
      meta: { hidden: true, title: "学院环节数据" }
    },
    {
      //奖学金
      path: "gsShowSchoolData",
      name: "gsShowSchoolData",
      title: "学校环节数据",
      component: () => import("../styles/showNationSchoData/schoolTable.vue"),
      meta: { hidden: true, title: "学校环节数据" }
    },
    {
      //国家助学金
      path: "NationGrantsApply",
      name: "NationGrantsApply",
      title: "学生申请表",
      component: () => import("../styles/NationGrantsApply.vue"),
      meta: { hidden: true }
    },
    {
      //国家助学金
      path: "NationGrantsClassCheck",
      name: "NationGrantsClassCheck",
      title: "班级审批",
      component: () => import("../styles/NationGrantsCheck/classTable.vue"),
      meta: { hidden: true, title: "班级审批" }
    },
    {
      //国家助学金
      path: "NationGrantsCollegeCheck",
      name: "NationGrantsCollegeCheck",
      title: "学院审批",
      component: () => import("../styles/NationGrantsCheck/collegeTable.vue"),
      meta: { hidden: true, title: "班级审批" }
    },
    {
      //国家助学金
      path: "NationGrantsSchoolCheck",
      name: "NationGrantsSchoolCheck",
      title: "学校审批",
      component: () => import("../styles/NationGrantsCheck/SchoolTable.vue"),
      meta: { hidden: true, title: "班级审批" }
    },
    {
      //国家助学金
      path: "ngShowClassData",
      name: "ngShowClassData",
      title: "班级环节数据",
      component: () => import("../styles/showNationGrantsData/classTable.vue"),
      meta: { hidden: true, title: "班级环节数据" }
    },
    {
      //国家助学金
      path: "ngShowCollegeData",
      name: "ngShowCollegeData",
      title: "学院环节数据",
      component: () =>
        import("../styles/showNationGrantsData/collegeTable.vue"),
      meta: { hidden: true, title: "学院环节数据" }
    },
    {
      //国家助学金
      path: "ngShowSchoolData",
      name: "ngShowSchoolData",
      title: "学校环节数据",
      component: () => import("../styles/showNationGrantsData/schoolTable.vue"),
      meta: { hidden: true, title: "学校环节数据" }
    },
    {
      //国家助学金
      path: "ngxypingyi",
      name: "ngxypingyi",
      title: "学院组评",
      component: () => import("../styles/ngxypingyi.vue"),
      meta: { hidden: true, title: "学院组评" }
    },
    {
      //国家助学金
      path: "ngxxpingyi",
      name: "ngxxpingyi",
      title: "学校组评",
      component: () => import("../styles/ngxxpingyi.vue"),
      meta: { hidden: true, title: "学校组评" }
    },
    {
      path: "createAppraiseProject",
      name: "createAppraiseProject",
      title: "创建综测项目",
      component: () => import("../appraise/createProject.vue"),
      meta: { hidden: true, title: "创建综测项目" }
    },
    {
      path: "issuedAppraiseProject",
      name: "issuedAppraiseProject",
      title: "下发任务",
      component: () => import("../appraise/start.vue"),
      meta: { hidden: true, title: "下发任务" }
    },
    {
      path: "appraiseResultProject",
      name: "appraiseResultProject",
      title: "综测结果项目",
      component: () => import("../appraiseResult/createProject.vue"),
      meta: { hidden: true, title: "综测结果项目" }
    },
    {
      path: "createStudyWorkProject",
      name: "createStudyWorkProject",
      title: "创建勤工俭学项目",
      component: () => import("../studyWork/createProject.vue"),
      meta: { hidden: true, title: "创建勤工俭学项目" }
    },
    {
      path: "studyWorkExpand",
      name: "studyWorkExpand",
      title: "创建勤工俭学扩展",
      component: () => import("../studyWorkExpand/createProject.vue"),
      meta: { hidden: true, title: "创建勤工俭学扩展" }
    },
    {
      path: "studyWorkConfig",
      name: "studyWorkConfig",
      title: "勤工俭学配置",
      component: () => import("../config/indexClass.vue"),
      meta: { hidden: true }
    },
    {
      path: "poverty",
      name: "poverty",
      title: "创建贫困建档项目",
      component: () => import("../poverty/createProject.vue"),
      meta: { hidden: true, title: "创建贫困建档项目" }
    },
    {
      path: "nationalGrants",
      name: "nationalGrants",
      title: "创建国家助学金项目",
      component: () => import("../nationalGrants/createProject.vue"),
      meta: { hidden: true, title: "创建国家助学金项目" }
    },
    {
      path: "motivationalScholarship",
      name: "motivationalScholarship",
      title: "创建励志奖学金项目",
      component: () => import("../motivationalScholarship/createProject.vue"),
      meta: { hidden: true, title: "创建励志奖学金项目" }
    },
    {
      path: "nationalScholarship",
      name: "nationalScholarship",
      title: "创建国家奖学金项目",
      component: () => import("../nationalScholarship/createProject.vue"),
      meta: { hidden: true, title: "创建勤工俭学项目" }
    },
    {
      path: "povertyProjectM",
      name: "povertyProjectM",
      title: "贫困建档项目管理",
      component: () => import("../projectManager/povertyProjectM.vue"),
      meta: { hidden: true, title: "贫困建档项目管理" }
    },
    {
      path: "nationalGrantsProjectM",
      name: "nationalGrantsProjectM",
      title: "国家助学金项目管理",
      component: () => import("../projectManager/nationalGrantsProjectM.vue"),
      meta: { hidden: true, title: "国家助学金项目管理" }
    },
    {
      path: "motivationalScholarshipProjectM",
      name: "motivationalScholarshipProjectM",
      title: "励志奖学金项目管理",
      component: () =>
        import("../projectManager/motivationalScholarshipProjectM.vue"),
      meta: { hidden: true, title: "励志奖学金项目管理" }
    },
    {
      path: "nationalScholarshipProjectM",
      name: "nationalScholarshipProjectM",
      title: "国家奖学金项目管理",
      component: () =>
        import("../projectManager/nationalScholarshipProjectM.vue"),
      meta: { hidden: true, title: "国家奖学金项目管理" }
    },
    {
      path: "povertyProjectR",
      name: "povertyProjectR",
      title: "贫困建档申请记录",
      component: () => import("../projectApplyRecord/povertyProjectR.vue"),
      meta: { hidden: true, title: "贫困建档申请记录" }
    },
    {
      path: "nationalGrantsR",
      name: "nationalGrantsR",
      title: "国家助学金申请记录",
      component: () => import("../projectApplyRecord/nationalGrantsR.vue"),
      meta: { hidden: true, title: "国家助学金申请记录" }
    },
    {
      path: "motivationalScholarshipR",
      name: "motivationalScholarshipR",
      title: "励志奖学金申请记录",
      component: () =>
        import("../projectApplyRecord/motivationalScholarshipR.vue"),
      meta: { hidden: true, title: "励志奖学金申请记录" }
    },
    {
      path: "nationalScholarshipR",
      name: "nationalScholarshipR",
      title: "国家奖学金申请记录",
      component: () => import("../projectApplyRecord/nationalScholarshipR.vue"),
      meta: { hidden: true, title: "国家奖学金申请记录" }
    },
    {
      path: "evalSelf",
      name: "evalSelf",
      title: "进行学生自评",
      component: () => import("../eval/createProject.vue"),
      meta: { hidden: true, title: "进行学生自评" }
    },
    {
      path: "evalEach",
      name: "evalEach",
      title: "进行小组评议",
      component: () => import("../eval/createProject.vue"),
      meta: { hidden: true, title: "进行小组评议" }
    },
    {
      path: "evalDemoc",
      name: "evalDemoc",
      title: "进行民主评议",
      component: () => import("../eval/createProject.vue"),
      meta: { hidden: true, title: "进行民主评议" }
    },
    {
      path: "appraisalProject",
      name: "appraisalProject",
      title: "综测项目",
      component: () => import("../appraisal/createProject.vue"),
      meta: { hidden: true, title: "综测项目" }
    },
    {
      path: "gjjxjResult",
      name: "gjjxjResult",
      title: "国家奖学金结果",
      component: () => import("../zizhu/gjjxj.vue"),
      meta: { hidden: true, title: "国家奖学金结果" }
    },
    {
      path: "gjzxjResult",
      name: "gjzxjResult",
      title: "国家助学金结果",
      component: () => import("../zizhu/gjzxj.vue"),
      meta: { hidden: true, title: "国家助学金结果" }
    },
    {
      path: "lzjxjResult",
      name: "lzjxjResult",
      title: "励志奖学金结果",
      component: () => import("../zizhu/lzjxj.vue"),
      meta: { hidden: true, title: "励志奖学金结果" }
    },
    {
      path: "pkjdResult",
      name: "pkjdResult",
      title: "贫困建档结果",
      component: () => import("../zizhu/pkjd.vue"),
      meta: { hidden: true, title: "贫困建档结果" }
    },
    {
      path: "checkParticipant",
      name: "checkParticipant",
      title: "检查参与者规则",
      component: () => import("../checkParticipant.vue"),
      meta: { hidden: true, title: "检查参与者规则" }
    }
  ]
};
