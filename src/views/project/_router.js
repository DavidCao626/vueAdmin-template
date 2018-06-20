export default
  {
    path: "/project",
    redirect: "/project/process",
    name: "项目管理",
    meta: { title: "项目管理", icon: "example", hidden: false },
    children: [
      {
        path: "process",
        name: "新建项目",
        component: () => import("./base.vue"),
        meta: { hidden: false }
      },
      {
        path: "control",
        name: "项目控制台",
        component: () => import("./index")
      },
      {
        path: "config",
        name: "项目配置计划",
        component: () => import("./config")
      },
      {
        path: "start",
        name: "项目下发任务",
        component: () => import("./start")
      }
    ]
  }

