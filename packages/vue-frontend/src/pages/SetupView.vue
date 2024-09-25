<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BackButton from "@/components/BackButton.vue";
import ButtonBar from "@/components/ButtonBar.vue";
import useCamera from "@/composables/useCamera";
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
  <div class="setup-view">
    <div class="setup-view__content">
      <h1>Setup</h1>
      <div class="setup-view__video-container">
        <video ref="videoTag" autoplay class="setup-view__video"></video>
      </div>
    </div>
    <div class="setup-view__footer">
      <ButtonBar justify-content="space-between">
        <template #left>
          <BackButton />
        </template>
        <template #middle>
          <BaseButton to="/config">
            <Icon icon="mdi:theme" color="white" width="30px" height="30px" />
          </BaseButton>
          <BaseButton to="/gallery">
            <Icon icon="mdi:image" color="white" width="30px" height="30px" />
          </BaseButton>
          <BaseButton to="/admin">
            <Icon icon="mdi:account-lock" color="white" width="30px" height="30px" />
          </BaseButton>
          <BaseButton to="/home">
            <Icon icon="mdi:home" color="white" width="42px" height="42px" />
          </BaseButton>
        </template>
      </ButtonBar>
    </div>
  </div>
</template>
<style lang="scss">
.setup-view {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__video-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__video {
    height: 100%;
    width: auto;
  }
}
</style>
