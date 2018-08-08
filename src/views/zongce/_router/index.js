export const zongceRouter = {
  path: "/zongce",
  name: "综测",
  redirect: "/zongce/zongce2",
  
  component: () => import("../_layout/layout.vue"),
  meta: { title: "综测", icon: "example", hidden: true },
  children: [
    {
      path: "zongce",
      name: "综测",
      component: () => import("../index.vue"),
      meta: { title: "新建综测计划模版", icon: "example", hidden: true }
    },
    {
      path: "zongce2",
      name: "标准分",
      component: () => import("../zongce2.vue"),
      meta: { title: "标准分", icon: "example", hidden: true }
    }
  ]
}; //redirect: "/zongce/index",
