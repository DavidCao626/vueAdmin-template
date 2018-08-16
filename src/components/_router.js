export const componentsRouter = {
  path: "/components",
  redirect: "/components/elxSelcet",
  component: () => import("./_layout"),
  name: "组件demo",
  children: [
    {
      path: "filtrates",
      name: "过滤组件",
      component: () => import("./_layout"),
      children: [
        {
          path: "data",
          name: "数据过滤器",
          component: () => import("./Filtrates/Data/demo.vue")
        }
      ]
    },
    {
      path: "TimeLine",
      name: "过滤组件",
      component: () => import("./TimeLine/index.vue")
    },
    { path: "tabs", name: "tabs", component: () => import("./Tabs/index.vue") },
    {
      path: "Avatar",
      name: "avatar",
      component: () => import("./Avatar/index.vue")
    },
    {
      path: "elxSelcet",
      name: "elxSelcet",
      component: () => import("./Select/test.vue")
    }
  ]
};
