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
    { path: "baseInfo", name: "baseInfo", component: () => import("../baseInfo") }
  ]
};
