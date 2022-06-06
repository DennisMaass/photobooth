<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { usePhotos } from "@/composables/usePhotos";

const props = defineProps({
  counterTime: { type: Number, default: 5 },
});

const camera = ref<HTMLVideoElement | null>(null);
const isLoading = ref(false);

const { counterTime } = toRefs(props);
const router = useRouter();

const remainingTime = ref(counterTime.value);

const { take } = usePhotos();

async function startCountDownTimer() {
  if (remainingTime.value > 0) {
    setTimeout(() => {
      remainingTime.value -= 1;
      startCountDownTimer();
    }, 1000);
  } else {
    remainingTime.value = "CHEESE";
    const photoInfo = await take();

    setTimeout(() => {
      remainingTime.value = "";
      router.push({
        name: "Result",
        params: { imageId: photoInfo.id },
      });
    }, 1500);
  }
}

function initializeCamera() {
  isLoading.value = true;

  const constraints = {
    audio: false,
    video: true,
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      isLoading.value = false;
      camera.value!.srcObject = stream;
      startCountDownTimer();
    })
    .catch(() => {
      isLoading.value = false;
      alert(
        "Error occured. Your browser may not support opening a camera stream."
      );
    });
}

function closeCameraStream() {
  const mediaStream = camera.value?.srcObject as MediaStream;
  const camTracks = mediaStream.getTracks();
  camTracks.forEach((track: MediaStreamTrack) => {
    track.stop();
  });
}

onMounted(() => {
  initializeCamera();
});

onBeforeUnmount(() => {
  closeCameraStream();
});
</script>

<template>
  <div class="countdown">
    <div class="countdown__media-wrapper">
      <video
        ref="camera"
        autoplay
        class="countdown__video"
      ></video>
    </div>

    <div v-if="!isLoading" class="countdown__time">
      {{ remainingTime }}
    </div>
  </div>
</template>

<style lang="scss">
.countdown {
  position: relative;
    height: 100vh;
    max-height: 100vh;

  &__media-wrapper {
    position: relative;
    height: 100%;
  }

  &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; //auto
    object-fit: cover;
  }

  &__time {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    color: white;
    font-size: 10rem;
  }
}
</style>
