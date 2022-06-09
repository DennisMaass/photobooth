<template>
  <div class="result">
    <div class="result__image-wrapper">
        <FramedImage first-name="Dominique" second-name="Reinhard" date="10.06.2022">
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
        <BaseButton @click="handlePrint" >
          <Icon icon="fluent:print-20-filled" color="white" width="42px" height="42px" />
        </BaseButton>
        <BaseButton @click="handleRemove">
          <BinIcon width="30px" height="30px"/>
        </BaseButton>
        <BaseButton to="/countdown">
          <CameraIcon width="30px" height="30px"/>
        </BaseButton>
      </template>
      <template #right>
        <BaseButton to="/gallery" class="result__back">
          <Icon icon="mdi:picture" color="white" width="30px" height="30px"  />
        </BaseButton>
      </template>
    </ButtonBar>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import ButtonBar from "@/components/ButtonBar.vue";
import BinIcon from "@/components/icons/BinIcon.vue";
import { Icon } from "@iconify/vue";
import { usePhotos } from "@/composables/usePhotos";
import { computed, onBeforeUnmount } from 'vue';
import { useRouter } from "vue-router";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import FramedImage from '@/components/FramedImage.vue';

const props = defineProps({
  imageId: { type: String, required: true },
});

const router = useRouter();
const { print, remove } = usePhotos();
function handlePrint() {
  print(props.imageId);
  router.push("/");
}
function handleRemove() {
  remove(props.imageId);
  router.push("/");
}

const imageUrl = computed(
  () => `${import.meta.env.VITE_BACKEND}/previews/${props.imageId}.webp`
);

/*const timerID = setTimeout(()=>{
  router.push("/");
},60000)


onBeforeUnmount(()=>{
  clearTimeout(timerID)
})*/
</script>

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

  &__image-wrapper {
    flex: 1;
    height: calc(100% - 2rem);

  }

  &__photo {
    width: auto;
    height: 100%;
    object-fit: contain;
    max-height: calc(100% - 10rem);
    aspect-ratio: 3/2;
  }
}
</style>
