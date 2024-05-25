import { onLongPress } from "@vueuse/core";
import { useRouter, useRoute } from "vue-router";

export default () => {
  const route = useRoute();

  function init() {
    const body = document.querySelector("body");
    onLongPress(
      body,
      async () => {
        if (route.fullPath === "/") {
          await navigateTo({ path: "/admin" });
        }
      },
      { delay: 3000 }
    );
  }

  return { init };
};
