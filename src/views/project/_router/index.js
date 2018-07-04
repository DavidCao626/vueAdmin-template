export const projectRouter = {
  path: "/project",
  redirect: "/project/stylesApproval",
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
      path: "dones",
      name: "我的已完成待办",
      component: () => import("../myDoneTodos")
    },
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
    },
    {
      path: "stylesApproval",
      name: "styles_approval",
      title: "项目审批",
      component: () => import("../styles/approval/list.vue"),
      meta: { hidden: true }
    },
    {
      path: "stylesAudit",
      name: "styles_audit",
      title: "项目审批",
      component: () => import("../styles/audit/index.vue"),
      meta: { hidden: true }
    },
    {
      path: "stylesAuditTable",
      name: "styles_audit_table",
      title: "项目审批",
      component: () => import("../styles/audit/table.vue"),
      meta: { hidden: true }
    }
    ,
    {
      path: "stylesNewTable",
      name: "styles_new_table",
      title: "项目审批3",
      component: () => import("../styles/audit/newTable.vue"),
      meta: { hidden: true }
    }
  ]
};
