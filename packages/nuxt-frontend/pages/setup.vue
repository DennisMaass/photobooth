<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/offline";

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
  <h1>Setup</h1>
  <video ref="videoTag" autoplay></video>

  <ButtonBar justify-content="space-between">
    <template #left>
      <BackButton />
    </template>
    <template #middle>
      <BaseButton to="/config">
        <Icon icon="mdi:cog" color="white" width="30px" height="30px" />
      </BaseButton>
      <BaseButton to="/gallery">
        <Icon icon="mdi:image" color="white" width="30px" height="30px" />
      </BaseButton>
      <BaseButton to="/admin">
        admin
      </BaseButton>
      <BaseButton to="/home">
        <Icon icon="mdi:home" color="white" width="42px" height="42px" />
      </BaseButton>
    </template>
  </ButtonBar>
</template>
