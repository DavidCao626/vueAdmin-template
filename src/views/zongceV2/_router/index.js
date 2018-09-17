// export const zongceRouter = {
//   path: "/zongce", //redirect: "/zongce/index",
//   name: "综测",
//   component: () => import("../index.vue"),
//   meta: { title: "新建综测计划模版", icon: "example", hidden: true }
// };

export const zongceV2Router = {
  path: "/zongceV2",
  name: "综测中心",
  component: () => import("../_layout/layout.vue"),
  meta: { title: "综测中心", hidden: true },
  children: [
    {
      path: "schoolYear",
      name: "schoolYear",
      component: () => import("../schoolYear/index.vue"),
      meta: { title: "学年管理", hidden: true }
    },
    {
      path: "stuScore",
      name: "stuScore",
      component: () => import("../stuScore/index.vue"),
      meta: { title: "学生成绩查询", hidden: true }
    },
    {
      path: "myScore",
      name: "myScore",
      component: () => import("../stuScore/myScore.vue"),
      meta: { title: "我的成绩查询", hidden: true }
    },
    {
      path: "myRanking",
      name: "myRanking",
      component: () => import("../stuScore/myRanking.vue"),
      meta: { title: "我的排名查询", hidden: true }
    },
    {
      path: "classScore",
      name: "classScore",
      component: () => import("../stuScore/classScore.vue"),
      meta: { title: "班级成绩排名管理", hidden: true }
    },
    {
      path: "stuPunish",
      name: "stuPunish",
      component: () => import("../stuPunish/index.vue"),
      meta: { title: "学生处分管理", hidden: true }
    },
    {
      path: "myPunish",
      name: "myPunish",
      component: () => import("../stuPunish/myPunish.vue"),
      meta: { title: "我的处分查询", hidden: true }
    },
    {
      path: "stuPunishLog",
      name: "stuPunishLog",
      component: () => import("../stuPunish/stuPunishLog.vue"),
      meta: { title: "学生处分查询", hidden: true }
    },
    {
      path: "baseQuality",
      name: "baseQuality",
      component: () => import("../baseQuality/index.vue"),
      meta: { title: "学生基础素质方案管理", hidden: true }
    },
    {
      path: "myQuality",
      name: "myQuality",
      component: () => import("../baseQuality/myQuality.vue"),
      meta: { title: "我的处分查询", hidden: true }
    },
    {
      path: "stuQualityLog",
      name: "stuQualityLog",
      component: () => import("../baseQuality/stuQualityLog.vue"),
      meta: { title: "学生基础素质查询", hidden: true }
    }
  ]
};
