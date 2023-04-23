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
      component: () => import("@/views/health/knowledge/index.vue"),
      meta: {
        title: "养生知识"
      }
    },
    {
      path: "/health/knowledge/detail",
      name: "KnowledgeDetail",
      component: () => import("@/views/health/knowledge_detail/index.vue"),
      meta: {
        title: "养生知识详情",
        showLink: false
      }
    },
    {
      path: "/health/knowledge/edit",
      name: "KnowledgeEdit",
      component: () => import("@/views/health/knowledge_edit/index.vue"),
      meta: {
        title: "养生知识编辑",
        showLink: false
      }
    },
    {
      path: "/health/news",
      name: "养生新闻",
      component: () => import("@/views/health/news/index.vue"),
      meta: {
        title: "养生新闻"
      }
    },
    {
      path: "/health/news/detail",
      name: "NewsDetail",
      component: () => import("@/views/health/news_detail/index.vue"),
      meta: {
        title: "养生新闻详情",
        showLink: false
      }
    },
    {
      path: "/health/news/edit",
      name: "NewsEdit",
      component: () => import("@/views/health/news_edit/index.vue"),
      meta: {
        title: "养生新闻编辑",
        showLink: false
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
