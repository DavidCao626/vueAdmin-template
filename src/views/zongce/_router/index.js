export const zongceRouter = {
  path: "/zongce",
  //redirect: "/zongce/index",
  name: "综测",
  component: () => import("../index.vue"),
  meta: { title: "zongce", icon: "example", hidden: true },
  
};
