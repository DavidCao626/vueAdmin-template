export const projectRouter = {
  path: "/project",
  redirect: "/project/my",
  name: "项目管理",
  component: () => import("../_layout/layout.vue"),
  meta: { title: "项目管理", icon: "example", hidden: false },
  children: [
    {
      path: "my",
      name: "我的项目",
      component: () => import("../myProject"),
      meta: { hidden: false }
    },
    { path: "todos", name: "我的待办", component: () => import("../myTodos") },
    {
      path: "add",
      name: "新建项目",
      component: () => import("../base.vue"),
      meta: { hidden: true }
    },
    {
      path: "control-home",
      name: "项目控制台首页",
      component: () => import("../contrl.vue")
    },
    {
      path: "control",
      name: "项目控制台",
      component: () => import("../contrl/index.vue")
    },
    {
      path: "config-home",
      name: "projectConfig-home",
      component: () => import("../config.vue"),
      meta: { hidden: true }
    },
    {
      path: "config",
      name: "projectConfig",
      component: () => import("../config/index.vue"),
      meta: { hidden: true }
    },
    {
      path: "start",
      name: "project_start",
      title: "下发任务",
      component: () => import("../start"),
      meta: { hidden: true }
    },
    {
      path: "studentForm",
      name: "student_Form",
      title: "学生申请表",
      component: () => import("../styles/studentForm.vue"),
      meta: { hidden: true }
    }
  ]
};
