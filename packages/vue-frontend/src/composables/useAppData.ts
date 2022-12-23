import { onMounted } from "vue";
import { useWindowSize, useLocalStorage, useWakeLock } from "@vueuse/core";
import type { RemovableRef } from "@vueuse/core";

const { width, height } = useWindowSize();

const version = 6;

const enabledPrinter = useLocalStorage("enabledPrinter", false);

const { isActive, request } = useWakeLock();

type UseAppData = {
  init: () => void;
  width: RemovableRef<number>;
  height: RemovableRef<number>;
  version: number;
  enabledPrinter: RemovableRef<boolean>;
  wakelockActive: RemovableRef<boolean>;
};

export default (): UseAppData => {
  function init() {
    onMounted(async () => {
      if (!isActive.value) {
        try {
          await request("screen");
          console.debug("[App] wakelock requested");
        } catch (error) {
          console.error("[App] useWakeLock", error);
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
