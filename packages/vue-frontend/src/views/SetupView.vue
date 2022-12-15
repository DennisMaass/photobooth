<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import { useCamera } from "@/composables/useCamera";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const { start, stop, stream } = useCamera();
start();

const videoTag = ref<HTMLVideoElement | null>(null);

const videoReady = ref(false);

const handleVideoReady = () => {
  videoReady.value = true;
};

async function initializeCamera() {
  videoTag.value!.srcObject = stream.value;
}

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
});

onBeforeUnmount(() => {
  stop();
  videoTag.value!.removeEventListener("canplay", handleVideoReady);
});
</script>
<template>
  <video ref="videoTag" autoplay></video>

  <div>
    <BaseButton to="/setup">setup</BaseButton>
    <BaseButton to="/gallery">Gallery</BaseButton>
    <BaseButton to="/home">Home</BaseButton>
    <BaseButton to="/admin">Admin</BaseButton>
  </div>
</template>
