export const projectRouter = {
  path: "/project",
  redirect: "/project/add",
  name: "项目管理",
  component: () => import("../_layout/layout.vue"),
  meta: { title: "项目管理", icon: "example", hidden: false },
  children: [
    {
      path: "add",
      name: "新建项目",
      component: () => import("../base.vue"),
      meta: { hidden: false }
    },
    {
      path: "control",
      name: "项目控制台",
      component: () => import("../contrl.vue")
    },
    {
      path: "config",
      name: "projectConfig",
      component: () => import("../config")
    },
    { path: "start", name: "项目下发任务", component: () => import("../start") }
  ]
};
