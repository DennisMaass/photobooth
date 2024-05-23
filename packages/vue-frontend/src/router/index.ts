import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "Home",
      path: "/home",
      alias: "/",
      component: () => import("@/pages/HomeView.vue"),
    },
    {
      name: "Countdown",
      path: "/countdown",
      component: () => import("@/pages/CountdownView.vue"),
    },
    {
      name: "Result",
      path: "/result/:imageId",
      component: () => import("@/pages/ResultView.vue"),
      props: true,
    },
    {
      name: "Gallery",
      path: "/gallery",
      component: () => import("@/pages/GalleryView.vue"),
    },
    {
      name: "Download",
      path: "/download/:imageId",
      component: () => import("@/pages/DownloadView.vue"),
      props: true,
    },
    {
      name: "PictureDownload",
      path: "/pd/:imageId",
      component: () => import("@/pages/PictureDownloadView.vue"),
    },
    {
      name: "GalleryDownload",
      path: "/gd/",
      component: () => import("@/pages/GalleryDownloadView.vue"),
    },
    {
      name: "Admin",
      path: "/admin",
      component: () => import("@/pages/AdminView.vue"),
    },
    {
      name: "Config",
      path: "/config",
      component: () => import("@/pages/ConfigView.vue"),
    },
    {
      name: "Setup",
      path: "/setup",

      component: () => import("@/pages/SetupView.vue"),
    },
    {
      name: "Health",
      path: "/health",

      component: () => import("@/pages/HealthView.vue"),
    },
  ],
});

export default router;
