<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { consola } from "consola";
import usePhotos from "@/composables/usePhotos";
import useCamera from "@/composables/useCamera";

const props = defineProps({
  counterTime: { type: Number, default: 5 },
});

const videoTag = ref<HTMLVideoElement | null>(null);
const isLoading = ref(false);

const { counterTime } = toRefs(props);
const router = useRouter();

const remainingTime = ref(counterTime.value);
const text = ref("");

const { take } = usePhotos();

let intervalId: number;
async function startCountDownTimer() {
  intervalId = window.setInterval(async () => {
    remainingTime.value -= 1;

    if (remainingTime.value === 0) {
      clearInterval(intervalId);
      text.value = "Cheeese";
      try {
        const takeRequest = take();
        setTimeout(() => {
          text.value = "Loading...";
        }, 3000);
        const photoInfo = await takeRequest;
        router.push({
          name: "Result",
          params: { imageId: photoInfo.id },
        });
      } catch (error) {
        consola.error(error);
        router.push("/");
      }
    }
  }, 1000);
}

const { stream, start, stop } = useCamera();
start();

const videoReady = ref(false);

const handleVideoReady = () => {
  videoReady.value = true;
};
onMounted(() => {
  videoTag.value!.addEventListener("canplay", handleVideoReady);

  watch(
    () => stream.value,
    (newVal) => {
      if (!newVal) {
        return;
      }
      initializeCamera();
    },
    { immediate: true }
  );

  watch(
    () => videoReady.value,
    (newVal) => {
      if (!newVal) {
        return;
      }
      startCountDownTimer();
    },
    { immediate: true }
  );
});

onBeforeUnmount(() => {
  stop();
  videoTag.value!.removeEventListener("canplay", handleVideoReady);
});

async function initializeCamera() {
  isLoading.value = true;
  videoTag.value!.srcObject = stream.value;

  isLoading.value = false;
}
</script>

<template>
  <div class="countdown relative h-screen max-h-screen">
    <div class="countdown__media-wrapper relative h-full">
      <video ref="videoTag" autoplay
        class="countdown__video absolute inset-0 h-full w-full object-cover -scale-x-100"></video>
    </div>

    <div v-if="!isLoading"
      class="countdown__time absolute text-white right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 text-[10rem]">
      <span v-if="remainingTime > 0">{{ remainingTime }}</span>
      <span v-if="text">{{ text }}</span>
    </div>
  </div>
</template>