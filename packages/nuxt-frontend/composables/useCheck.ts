import { ref, watch } from "vue";
import { useIntervalFn } from "@vueuse/core";
import { consola } from "consola";

type Status = "booting" | "ready" | "error";

const backendAvailable = ref(false);
const status = ref<Status>("booting");
const interval = ref(500);

export default () => {

  function init() {
    consola.debug("[useCheck][init]");

    useIntervalFn(async () => {
      try {
        const data = await checkAvailibility();
        backendAvailable.value = !!data;
      } catch (error) {
        backendAvailable.value = false;
      }
    }, interval);

    watch(
      backendAvailable,
      (newVal, oldVal) => {
        if (!oldVal && newVal) {
          status.value = "ready";
          interval.value = 5000;
        } else if (oldVal && !newVal) {
          status.value = "error";
          interval.value = 500;
        }
      },
      { immediate: true }
    );
  }


  const config = useRuntimeConfig();

  async function checkAvailibility(): Promise<any> {
    const BASE_URL = config.public.backend;

    return await $fetch(`${BASE_URL}/health`);
  }


  return {
    init,
    status,
    backendAvailable,
  };
};
