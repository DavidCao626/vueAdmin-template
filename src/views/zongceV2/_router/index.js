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
    }
  ]
};
