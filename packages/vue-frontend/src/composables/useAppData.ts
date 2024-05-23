import { onMounted } from "vue";
import { useWindowSize, useLocalStorage, useWakeLock } from "@vueuse/core";
import { consola } from "consola";

const { width, height } = useWindowSize();

const version = "23.05.2024";

const enabledPrinter = useLocalStorage("enabledPrinter", true);

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
    enabledPrinter,
  };
};
