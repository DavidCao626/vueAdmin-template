export const componentsRouter = {
  path: "/components",
  redirect: "/components/filtrates/data",
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
    }
  ]
};
