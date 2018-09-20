// export const zongceRouter = {
//   path: "/zongce", //redirect: "/zongce/index",
//   name: "综测",
//   component: () => import("../index.vue"),
//   meta: { title: "新建综测计划模版", icon: "example", hidden: true }
// };

export const zongceRouter = {
  path: "/zongce",
  name: "综测中心",
  //redirect: "/zongce/addCategory",
  component: () => import("../_layout/layout.vue"),
  meta: { title: "综测", icon: "example", hidden: true },
  children: [
    {
      path: "singleUserQuestion",
      name: "个人自评",
      component: () => import("../singleUserQuestion.vue"),
      meta: { title: "个人自评", icon: "example", hidden: true }
    },
    {
      path: "groupQuestion",
      name: "小组评议",
      component: () => import("../groupQuestion.vue"),
      meta: { title: "多人评议", icon: "example", hidden: true }
    },
    {
      path: "childScopeTable",
      name: "childScopeTable",
      component: () => import("../childScopeTable.vue"),
      meta: { title: "学院完成情况", icon: "example", hidden: true }
    },
    {
      path: "configDetail",
      name: "configDetail",
      component: () => import("../configDetail.vue"),
      meta: { title: "配置分数项", icon: "example", hidden: true }
    },
      {
        path: "projectManager",
        name: "projectManager",
        component: () => import("../projectManagerV2.vue"),
      meta: { title: "我的项目管理", icon: "example", hidden: true }
    },
        {
          path: "appraisalResultRecord",
          name: "appraisalResultRecord",
          component: () => import("../appraisalResultRecord.vue"),
      meta: { title: "测评结果记录", icon: "example", hidden: true }
    }
  



    

  
    // {
    //   path: "addCategory",
    //   name: "addCategory",
    //   component: () => import("../index.vue"),
    //   meta: { title: "新建综测计划模版", icon: "example", hidden: true }
    // },
    // {
    //   path: "appraiseScheme",
    //   name: "appraiseScheme",
    //   component: () => import("../appraiseScheme.vue"),
    //   meta: { title: "配置计划书", icon: "example", hidden: true }
    // },
    // {
    //   path: "operateScheme",
    //   name: "operateScheme",
    //   component: () => import("../operateScheme.vue"),
    //   meta: { title: "编辑方案", icon: "example", hidden: true }
    // },
    // {
    //   path: "zongce2",
    //   name: "标准分",
    //   component: () => import("../zongce2.vue"),
    //   meta: { title: "标准分", icon: "example", hidden: true }
    // },

    // {
    //   path: "stdManager",
    //   name: "科目行为管理",
    //   component: () => import("../pingce1.vue"),
    //   meta: { title: "科目行为管理", icon: "example", hidden: true }
    // },
    // {
    //   path: "asManager",
    //   name: "考评行为管理",
    //   component: () => import("../pingce2.vue"),
    //   meta: { title: "考评行为管理", icon: "example", hidden: true }
    // },
    // {
    //   path: "hcManager",
    //   name: "分值科目记录管理",
    //   component: () => import("../pingce3.vue"),
    //   meta: { title: "分值科目记录管理", icon: "example", hidden: true }
    // },
    // {
    //   path: "stdResultManager",
    //   name: "标准科目结果管理",
    //   component: () => import("../pingce4.vue"),
    //   meta: { title: "标准科目结果管理", icon: "example", hidden: true }
    // },
    // {
    //   path: "rankManager",
    //   name: "综测排名结果管理",
    //   component: () => import("../pingce5.vue"),
    //   meta: { title: "综测排名结果管理", icon: "example", hidden: true }
    // },
    // {
    //   path: "showProspectus",
    //   name: "showProspectus",
    //   component: () => import("../showProspectus.vue"),
    //   meta: { title: "查看计划书", icon: "example", hidden: true }
    // },
    // {
    //   path: "tempRouterGo",
    //   name: "tempRouterGo",
    //   component: () => import("../tempRouterGo.vue"),
    //   meta: { title: "router跳自己用", icon: "example", hidden: true }
    // },
    // {
    //   path: "behaviorsManager",
    //   name: "behaviorsManager",
    //   component: () => import("../behaviorsManager.vue"),
    //   meta: { title: "科目行为记录管理", icon: "example", hidden: true }
    // },
    // {
    //   path: "studentApply",
    //   name: "studentApply",
    //   component: () => import("../studentApply.vue"),
    //   meta: { title: "学生申请", icon: "example", hidden: true }
    // },
    // {
    //   path: "artfBehviorsManager",
    //   name: "artfBehviorsManager",
    //   component: () => import("../artfBehviorsManager.vue"),
    //   meta: { title: "生成考评行为记录", icon: "example", hidden: true }
    // },
    // {
    //   path: "hierarchicalRecord",
    //   name: "hierarchicalRecord",
    //   component: () => import("../hierarchicalRecord.vue"),
    //   meta: { title: "生成分值科目记录", icon: "example", hidden: true }
    // },
    // {
    //   path: "standardRecord",
    //   name: "standardRecord",
    //   component: () => import("../standardRecord.vue"),
    //   meta: { title: "生成标准科目记录", icon: "example", hidden: true }
    // },
    // {
    //   path: "importBehaviors",
    //   name: "importBehaviors",
    //   component: () => import("../importBehaviors.vue"),
    //   meta: { title: "导入科目行为", icon: "example", hidden: true }
    // },
    // {
    //   path: "standardRank",
    //   name: "standardRank",
    //   component: () => import("../standardRank.vue"),
    //   meta: { title: "生成标准科目排名", icon: "example", hidden: true }
    // },
    // {
    //   path: "managerCategory",
    //   name: "managerCategory",
    //   component: () => import("../managerCategory.vue"),
    //   meta: { title: "测评类别管理", icon: "example", hidden: true }
    // },
    // {
    //   path: "managerProject",
    //   name: "managerProject",
    //   component: () => import("../managerProject.vue"),
    //   meta: { title: "测评项目管理", icon: "example", hidden: true }
    // },
    // {
    //   path: "managerProspectus",
    //   name: "managerProspectus",
    //   component: () => import("../managerProspectus.vue"),
    //   meta: { title: "测评计划书管理", icon: "example", hidden: true }
    // },
    // {
    //   path: "managerScheme",
    //   name: "managerScheme",
    //   component: () => import("../managerScheme.vue"),
    //   meta: { title: "测评方案管理", icon: "example", hidden: true }
    // },
    // {
    //   path: "stuBehaviorRegistered", 
    //   name: "stuBehaviorRegistered",
    //   component: () => import("../stuBehaviorRegistered.vue"),
    //   meta: { title: "我的科目行为", icon: "example", hidden: true }
    // },
    // {
    //   path: "stuBehaviorArtificial",
    //   name: "stuBehaviorArtificial",
    //   component: () => import("../stuBehaviorArtificial.vue"),
    //   meta: { title: "我的考评行为", icon: "example", hidden: true }
    // },
    // {
    //   path: "stuHcRecord",
    //   name: "stuHcRecord",
    //   component: () => import("../stuHcRecord.vue"),
    //   meta: { title: "我的分值记录", icon: "example", hidden: true }
    // },
    // {
    //   path: "stuRank",
    //   name: "stuRank",
    //   component: () => import("../stuRank.vue"),
    //   meta: { title: "我的综测排名", icon: "example", hidden: true }
    // },
    //   {
    //   path: "showScheme",
    //     name: "showScheme",
    //   component: () => import("../schemeShow/showScheme.vue"),
    //   meta: { title: "查看方案详情", icon: "example", hidden: true }
    // },
    // {
    //   path: "showSchemeDetail",
    //   name: "showSchemeDetail",
    //   component: () => import("../schemeShow/zongce2.vue"),
    //   meta: { title: "科目项与分值项详情", icon: "example", hidden: true }
    // }
  ]
};
