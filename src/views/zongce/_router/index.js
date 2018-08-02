export const zongceRouter = {
  path: "/zongce", //redirect: "/zongce/index",
  name: "综测",
  component: () => import("../index.vue"),
  meta: { title: "新建综测计划模版", icon: "example", hidden: true }
};
