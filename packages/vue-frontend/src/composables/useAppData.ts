import { onMounted } from "vue";
import { useWindowSize, useWakeLock } from "@vueuse/core";
import { consola } from "consola";

const { width, height } = useWindowSize();

const version = "24.09.2024";

const { isActive, request } = useWakeLock();

export default () => {
  function init() {
    onMounted(async () => {
      if (!isActive.value) {
        try {
          await request("screen");
          consola.debug("[App] wakelock requested");
        } catch (error) {
          consola.error("[App] useWakeLock", error);
        }
      }
    });
  }

  return {
    init,
    width,
    height,
    version,
    wakelockActive: isActive,
  };
};
