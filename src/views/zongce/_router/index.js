// export const zongceRouter = {
//   path: "/zongce", //redirect: "/zongce/index",
//   name: "综测",
//   component: () => import("../index.vue"),
//   meta: { title: "新建综测计划模版", icon: "example", hidden: true }
// };

export const zongceRouter = {
  path: "/zongce",
  name: "综测中心",
  redirect: "/zongce/addCategory",
  component: () => import("../_layout/layout.vue"),
  meta: { title: "综测", icon: "example", hidden: true },
  children: [
    {
      path: "addCategory",
      name: "addCategory",
      component: () => import("../index.vue"),
      meta: { title: "新建综测计划模版", icon: "example", hidden: true }
    },
    {
      path: "appraiseScheme",
      name: "appraiseScheme",
      component: () => import("../appraiseScheme.vue"),
      meta: { title: "配置计划书", icon: "example", hidden: true }
    },

    {
      path: "operateScheme",
      name: "operateScheme",
      component: () => import("../operateScheme.vue"),
      meta: { title: "编辑方案", icon: "example", hidden: true }
    },
    {
      path: "zongce2",
      name: "标准分",
      component: () => import("../zongce2.vue"),
      meta: { title: "标准分", icon: "example", hidden: true }
    },
    {
      path: "pc",
      name: "评测模版",
      component: () => import("../pingce.vue"),
      meta: { title: "标准分", icon: "example", hidden: true }
    }, 
    {
      path: "pc2",
      name: "选择模版",
      component: () => import("../pingce2.vue"),
      meta: { title: "标准分", icon: "example", hidden: false }
    },
    {
      path: "showProspectus",
      name: "showProspectus",
      component: () => import("../showProspectus.vue"),
      meta: { title: "查看计划书", icon: "example", hidden: true }
    },

    {
      path: "tempRouterGo",
      name: "tempRouterGo",
      component: () => import("../tempRouterGo.vue"),
      meta: { title: "router跳自己用", icon: "example", hidden: true }
    },
    {
      path: "behaviorsManager",
      name: "behaviorsManager",
      component: () => import("../behaviorsManager.vue"),
      meta: { title: "科目行为记录管理", icon: "example", hidden: true }
    }, {
      path: "studentApply",
      name: "studentApply",
      component: () => import("../studentApply.vue"),
      meta: { title: "学生申请", icon: "example", hidden: true }
    }, {
      path: "artfBehviorsManager",
      name: "artfBehviorsManager",
      component: () => import("../artfBehviorsManager.vue"),
      meta: { title: "生成考评行为记录", icon: "example", hidden: true }
    }, {
      path: "hierarchicalRecord",
      name: "hierarchicalRecord",
      component: () => import("../hierarchicalRecord.vue"),
      meta: { title: "生成分值科目记录", icon: "example", hidden: true }
    }, {
      path: "standardRecord",
      name: "standardRecord",
      component: () => import("../standardRecord.vue"),
      meta: { title: "生成标准科目记录", icon: "example", hidden: true }
    }, {
      path: "importBehaviors",
      name: "importBehaviors",
      component: () => import("../importBehaviors.vue"),
      meta: { title: "导入科目行为", icon: "example", hidden: true }
    }
    

  ]
};
