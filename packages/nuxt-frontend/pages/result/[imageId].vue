<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/offline";

const { remove } = usePhotos();
const { print } = usePrinter();
const { selectedTheme, printWithWatermark } = useThemes();

const route = useRoute();
const imageId = route.params.imageId as string;

async function handlePrint(): Promise<void> {
  const status = await print(imageId, printWithWatermark.value);
  if (status.code === "ready") {
    await navigateTo("/");
  }
}
async function handleRemove() {
  remove(imageId);
  await navigateTo("/");
}

const config = useRuntimeConfig();

const imageUrl = computed(
  () => `${config.public.backend}/previews/${imageId}.webp`
);

const timerID = setTimeout(() => {
  // navigateTo("/");
}, 60000);

onBeforeUnmount(() => {
  clearTimeout(timerID);
});

async function handleDownload() {
  await navigateTo({
    name: `/download/${imageId}`,
    query: { previewsView: "Result" },
  });
}

const { enabledPrinter } = useAppData();

</script>

<template>
  <div class="result">
    <div class="result__image-wrapper">
      <FramedImage :date="selectedTheme?.topic === 'wedding' ? '31.08.2024' : ''">
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
          <Icon icon="mdi:tray-arrow-down" color="white" width="42px" height="42px" />
        </BaseButton>
        <BaseButton v-if="enabledPrinter" @click="handlePrint">
          <Icon icon="fluent:print-20-filled" color="white" width="42px" height="42px" />
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

  >*+* {
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
