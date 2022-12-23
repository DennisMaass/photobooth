import { onLongPress } from "@vueuse/core";
import { useRouter, useRoute } from "vue-router";

export default () => {
  const router = useRouter();
  const route = useRoute();

  function init() {
    const body = document.querySelector("body");
    onLongPress(
      body,
      () => {
        if (route.name === "Home") {
          router.push({ name: "Config" });
        }
      },
      { delay: 3000 }
    );
  }

  return { init };
};
