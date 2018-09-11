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
    }
  ]
};
