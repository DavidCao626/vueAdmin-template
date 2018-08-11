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
      path: "showProspectus",
      name: "showProspectus",
      component: () => import("../showProspectus.vue"),
      meta: { title: "查看计划书", icon: "example", hidden: true }
    }
  ]
};
