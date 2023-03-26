export default {
  path: "/family",
  redirect: "/family/picture",
  meta: {
    icon: "ubuntuFill",
    title: "家庭生活",
    // showLink: false,
    rank: 2
  },
  children: [
    {
      path: "/family/picture",
      name: "家庭养生照片",
      component: () => import("@/views/error/403.vue"),
      meta: {
        title: "家庭养生照片"
      }
    },
    {
      path: "/family/video",
      name: "家庭养生视频",
      component: () => import("@/views/error/404.vue"),
      meta: {
        title: "家庭养生视频"
      }
    },
    {
      path: "/family/diary",
      name: "家庭日记",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: "家庭日记"
      }
    },
    {
      path: "/family/send_word",
      name: "家庭寄语",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: "家庭寄语"
      }
    },
    {
      path: "/family/info_record",
      name: "家庭信息记录",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: "家庭信息记录"
      }
    },
    {
      path: "/family/activity_plan",
      name: "家庭养生活动计划",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: "家庭养生活动计划"
      }
    }
  ]
} as RouteConfigsTable;
