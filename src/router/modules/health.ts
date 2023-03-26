export default {
  path: "/health",
  redirect: "/health/knowledge",
  meta: {
    icon: "informationLine",
    title: "养生信息",
    // showLink: false,
    rank: 1
  },
  children: [
    {
      path: "/health/knowledge",
      name: "养生知识",
      component: () => import("@/views/error/403.vue"),
      meta: {
        title: "养生知识"
      }
    },
    {
      path: "/health/news",
      name: "养生新闻",
      component: () => import("@/views/error/404.vue"),
      meta: {
        title: "养生新闻"
      }
    },
    {
      path: "/health/resource",
      name: "养生资源",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: "养生资源"
      }
    }
  ]
} as RouteConfigsTable;
