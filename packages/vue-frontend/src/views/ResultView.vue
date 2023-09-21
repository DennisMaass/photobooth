<script lang="ts" setup>
import { computed, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import ButtonBar from "@/components/ButtonBar.vue";
import BinIcon from "@/components/icons/BinIcon.vue";
import { Icon } from "@iconify/vue/dist/offline";
import { usePhotos } from "@/composables/usePhotos.js";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import FramedImage from "@/components/FramedImage.vue";
import useConfig from "@/composables/useAppData.js";
import useThemes from "@/composables/useThemes.js";
import usePrinter from "@/composables/usePrinter.js";

const props = defineProps({
  imageId: { type: String, required: true },
});

const router = useRouter();
const { remove } = usePhotos();
const { print } = usePrinter();
const { selectedTheme,printWithWatermark } = useThemes();

async function handlePrint(): Promise<void> {
  const status = await print(props.imageId, printWithWatermark.value);
  if (status.code === "ready") {
    router.push("/");
  }
}
function handleRemove() {
  remove(props.imageId);
  router.push("/");
}

const imageUrl = computed(
  () => `${import.meta.env.VITE_BACKEND}/previews/${props.imageId}.webp`
);

const timerID = setTimeout(() => {
  router.push("/");
}, 60000);

onBeforeUnmount(() => {
  clearTimeout(timerID);
});

function handleDownload() {
  router.push({
    name: "Download",
    params: { imageId: props.imageId },
    query: { previewsView: "Result" },
  });
}

const { enabledPrinter } = useConfig();

</script>

<template>
  <div class="result">
    <div class="result__image-wrapper">
      <FramedImage
        :date="selectedTheme.topic === 'wedding' ? '22.09.2023' : ''"
      >
        <img class="result__photo" :src="imageUrl" alt="taken photo" />
      </FramedImage>
    </div>
    <ButtonBar justify-content="space-between">
      <template #left>
        <BaseButton to="/" class="result__back">
          <Icon icon="mdi:home" color="white" width="42px" height="42px" />
        </BaseButton>
      </template>
      <template #middle>
        <BaseButton @click="handleDownload">
          <Icon
            icon="mdi:tray-arrow-down"
            color="white"
            width="42px"
            height="42px"
          />
        </BaseButton>
        <BaseButton v-if="enabledPrinter" @click="handlePrint">
          <Icon
            icon="fluent:print-20-filled"
            color="white"
            width="42px"
            height="42px"
          />
        </BaseButton>
        <BaseButton @click="handleRemove">
          <BinIcon width="30px" height="30px" />
        </BaseButton>
        <BaseButton to="/countdown">
          <CameraIcon width="30px" height="30px" />
        </BaseButton>
      </template>
      <template #right>
        <BaseButton to="/gallery" class="result__back">
          <Icon icon="mdi:image" color="white" width="30px" height="30px" />
        </BaseButton>
      </template>
    </ButtonBar>
  </div>
</template>

<style lang="scss">
.result {
  padding: 20px;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 3rem;
  }
  &__back-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  &__photo {
    width: 780px;
    height: 520px;
    display: block;
  }
}
</style>
