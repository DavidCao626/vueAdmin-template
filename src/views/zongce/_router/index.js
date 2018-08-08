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
  meta: { title: "综测", icon: "example", hidden: false },
  children: [
    {
      path: "addCategory",
      name: "addCategory",
      component: () => import("../index.vue"),
      meta: {
        title: "新建综测计划模版",
        icon: "example",
        hidden: true
      }
    },


  ]
};
