export const userRouter = {
  path: "/user",
  redirect: "/user/info",
  name: "用户",
  component: () => import("../_layout/layout.vue"),
  meta: { title: "用户中心", icon: "example", hidden: false },
  children: [
    { path: "info", name: "info", component: () => import("../info") },
    { path: "studentBaseInfo", name: "studentBaseInfo", component: () => import("../studentBaseInfo") },
    { path: "staffBaseInfo", name: "staffBaseInfo", component: () => import("../staffBaseInfo") },
    { path: "resignation", name: "resignation", component: () => import("../resignation") },
    { path: "dutyManager", name: "dutyManager", component: () => import("../dutyManager") },
    { path: "userManager", name: "userManager", component: () => import("../userManager") },
    { path: "baseInfo", name: "baseInfo", component: () => import("../baseInfo") },
    { path: "authInfo", name: "authInfo", component: () => import("../authInfo") },
    { path: "createStudentForm", name: "createStudentForm", component: () => import("../studentBaseInfo/createStudentForm.vue") },
    { path: "createStaffForm", name: "createStaffForm", component: () => import("../staffBaseInfo/createStaffForm.vue") },
    { path: "createBaseForm", name: "createBaseForm", component: () => import("../baseInfo/createBaseForm.vue") },
    
    { path: "authManager", name: "authManager", component: () => import("../authManager") }
  ]
};
