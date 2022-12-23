import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "Home",
      path: "/home",
      alias: "/",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      name: "Countdown",
      path: "/countdown",
      component: () => import("@/views/CountdownView.vue"),
    },
    {
      name: "Result",
      path: "/result/:imageId",
      component: () => import("@/views/ResultView.vue"),
      props: true,
    },
    {
      name: "Gallery",
      path: "/gallery",
      component: () => import("@/views/GalleryView.vue"),
    },
    {
      name: "Download",
      path: "/download/:imageId",
      component: () => import("@/views/DownloadView.vue"),
      props: true,
    },
    {
      name: "PictureDownload",
      path: "/pd/:imageId",
      component: () => import("@/views/PictureDownloadView.vue"),
    },
    {
      name: "GalleryDownload",
      path: "/gd/",
      component: () => import("@/views/GalleryDownloadView.vue"),
    },
    {
      name: "Admin",
      path: "/admin",
      component: () => import("@/views/AdminView.vue"),
    },
    {
      name: "Config",
      path: "/config",
      component: () => import("@/views/ConfigView.vue"),
    },
    {
      name: "Setup",
      path: "/setup",

      component: () => import("@/views/SetupView.vue"),
    },
  ],
});

export default router;
