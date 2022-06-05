import { createRouter, createWebHistory } from "vue-router";

const HomeView = () => import("@/views/HomeView.vue");
const CountdownView = () => import("@/views/CountdownView.vue");
const ResultView = () => import("@/views/ResultView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      alias: "/",
      component: HomeView,
      name: "Home",
    },
    {
      path: "/countdown",
      component: CountdownView,
      name: "Countdown",
      props: true,
    },
    {
      path: "/result",
      component: ResultView,
      name: "Result",
      props: true,
    },
  ],
});

export default router;
