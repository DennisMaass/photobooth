<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { usePhotos } from "@/composables/usePhotos";

const props = defineProps({
  counterTime: { type: Number, default: 3 },
});

const camera = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const isLoading = ref(false);
const isPhotoTaken = ref(false);
const isShotingPhoto = ref(false);

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
    const imageUrl=`http://localhost:3001/${photoInfo.id}`

    setTimeout(() => {
      remainingTime.value = "";
      router.push({
        name: "Result",
        params: { imageUrl },
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

async function takePhotoOld() {
  if (!camera.value || !canvas.value) {
    return;
  }

  const cameraSize = camera.value.getBoundingClientRect();

  if (!isPhotoTaken.value) {
    isShotingPhoto.value = true;

    const FLASH_TIMEOUT = 100;

    setTimeout(() => {
      isShotingPhoto.value = false;
    }, FLASH_TIMEOUT);
  }

  isPhotoTaken.value = !isPhotoTaken.value;

  const context = canvas.value.getContext("2d");
  if (!context) {
    return;
  }
  //TODO improve
  canvas.value!.style.width = `${cameraSize.width}px`;
  canvas.value!.style.height = `${cameraSize.height}px`;

  context.drawImage(
    camera.value,
    0,
    0,
    canvas.value.width,
    canvas.value.height
  );

  closeCameraStream();
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
        v-show="!isPhotoTaken"
        ref="camera"
        autoplay
        class="countdown__video"
      ></video>
      <canvas
        v-show="isPhotoTaken"
        ref="canvas"
        class="countdown__canvas"
      ></canvas>
    </div>

    <div v-if="!isLoading" class="countdown__time">
      {{ remainingTime }}
    </div>
    <router-link to="/result" />
  </div>
</template>

<style lang="scss">
.countdown {
  position: relative;

  &__media-wrapper {
    position: relative;
    padding-bottom: 66.67%; //75% /* 4:3 */ // 56.25%; /* 16:9 */ Drucker: 2:3
    height: 0;
  }

  &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; //auto
  }

  &__canvas {
    position: absolute;
    top: 0;
    left: 0;
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
