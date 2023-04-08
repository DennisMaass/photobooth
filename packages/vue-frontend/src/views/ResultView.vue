<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import ButtonBar from "@/components/ButtonBar.vue";
import BinIcon from "@/components/icons/BinIcon.vue";
import { Icon } from "@iconify/vue/dist/offline";
import { usePhotos } from "@/composables/usePhotos";
import { computed, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import FramedImage from "@/components/FramedImage.vue";
import useConfig from "@/composables/useAppData";
import useTheme from "@/composables/useTheme";
import usePrinter from "@/composables/usePrinter";
import useNotification from "@/composables/useNotification";

const props = defineProps({
  imageId: { type: String, required: true },
});

const router = useRouter();
const { remove } = usePhotos();
const { print } = usePrinter();
const { fire } = useNotification();

async function handlePrint() {
  const status = await print(props.imageId);
  if (status.code === "ready") {
    fire({
      icon: "success",
      title: "Druck gestartet",
      text: "Dauert ca. 1 Minute und 30 Sekunden",
      showConfirmButton: false,
      timer: 3000,
    });
  } else if (status.code === "busy") {
    fire({
      icon: "info",
      title: "Druckt gerade",
      text: "Versuche es bitte später nochmal",
      timer: 10000,
    });
  } else if (status.code === "error") {
    fire({
      icon: "error",
      title: "Papier oder Farbpatrone leer",
      text: "bitte wechseln",
    });
  } else {
    fire({
      icon: "error",
      title: "Es ist ein Fehler aufgetreten",
    });
  }
  router.push("/");
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
const { selectedTheme } = useTheme();
</script>

<template>
  <div class="result">
    <div class="result__image-wrapper">
      <FramedImage
        :date="selectedTheme.topic === 'wedding' ? '13.08.2022' : ''"
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
