export const messagesRouter = {
  path: "messages",
  redirect: "/messages/announce/list",
  name: "消息管理",
  component: () => import("../_layout/layout.vue"),
  meta: { title: "消息管理", icon: "example", hidden: false },
  children: [
    {
      path: "announce",
      name: "公告",
      component: () => import("../announce/index"),
      children: [
        {
          path: "add",
          name: "新建公告",
          component: () => import("../announce/add")
        },
        {
          path: "update",
          name: "修改公告",
          component: () => import("../announce/update")
        },
        {
          path: "list",
          name: "公告管理列表",
          component: () => import("../announce/list")
        },
        {
          path: "showlist",
          name: "公告列表",
          component: () => import("../announce/showList")
        },
        {
          path: "show",
          name: "公告详情",
          component: () => import("../announce/show"),
          meta: { hidden: true }
        }
      ]
    },
    {
      path: "notice",
      name: "公示",
      component: () => import("../notice/index"),
      children: [
        {
          path: "add",
          name: "新建公示",
          component: () => import("../notice/add")
        },
        {
          path: "update",
          name: "修改公示",
          component: () => import("../notice/update")
        },
        {
          path: "list",
          name: "公示管理列表",
          component: () => import("../notice/list")
        },
        {
          path: "showlist",
          name: "公示列表",
          component: () => import("../notice/showList")
        },
        {
          path: "show",
          name: "公示详情",
          component: () => import("../notice/show"),
          meta: { hidden: true }
        }
      ]
    }
  ]
};
