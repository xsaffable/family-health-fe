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
      component: () => import("@/views/family/picture.vue"),
      meta: {
        title: "家庭养生照片"
      }
    },
    {
      path: "/family/video",
      name: "家庭养生视频",
      component: () => import("@/views/family/video/video.vue"),
      meta: {
        title: "家庭养生视频"
      }
    },
    {
      path: "/family/diary",
      name: "家庭日记",
      component: () => import("@/views/family/diary/index.vue"),
      meta: {
        title: "家庭日记"
      }
    },
    {
      path: "/family/send_word",
      name: "家庭寄语",
      component: () => import("@/views/family/send_word/index.vue"),
      meta: {
        title: "家庭寄语"
      }
    },
    {
      path: "/family/activity_plan",
      name: "家庭养生活动计划",
      component: () => import("@/views/family/activity_plan/index.vue"),
      meta: {
        title: "家庭养生活动计划"
      }
    }
  ]
} as RouteConfigsTable;
