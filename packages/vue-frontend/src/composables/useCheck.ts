import { ref, watch } from "vue";
import { useIntervalFn } from "@vueuse/core";
import { ofetch } from "ofetch";

type Status = "booting" | "ready" | "error";

const backendAvailable = ref(false);
const status = ref<Status>("booting");
const interval = ref(500);
export default () => {
  function init() {
    console.debug("[useCheck][init]");

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

  async function checkAvailibility(): Promise<any> {
    const BASE_URL = `${import.meta.env.VITE_BACKEND}`;

    return await ofetch(`${BASE_URL}/health`, {
      method: "GET",
    });
  }

  return {
    init,
    status,
    backendAvailable,
  };
};
