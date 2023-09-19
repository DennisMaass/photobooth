import { onMounted } from "vue";
import { useWindowSize, useLocalStorage, useWakeLock } from "@vueuse/core";
import type { RemovableRef } from "@vueuse/core";
import { consola } from "consola";

const { width, height } = useWindowSize();

const version = 6;

const enabledPrinter = useLocalStorage("enabledPrinter", true);

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
