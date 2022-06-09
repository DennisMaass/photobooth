<template>
  <div class="result">
    <div class="result__image-wrapper">
      <img class="result__photo" :src="imageUrl" alt="taken photo" />
    </div>
    <ButtonBar class="result__actions-wrapper" justify-content="space-between">
      <div class="result__left-actions"></div>
      <div class="result__middle-actions">
        <BaseButton to="/" class="result__back">
          <Icon icon="mdi:home" color="white" width="42px" height="42px" />
        </BaseButton>
        <BaseButton @click="handlePrint" >
          <PrinterIcon width="30px" height="30px"/>
        </BaseButton>
        <BaseButton @click="handleRemove">
          <BinIcon width="30px" height="30px"/>
        </BaseButton>
        <BaseButton to="/countdown">
          <CameraIcon width="30px" height="30px"/>
        </BaseButton>
      </div>
      <div class="result__right-actions">
        <BaseButton to="/gallery" class="result__back">
          <Icon icon="mdi:picture" color="white" width="30px" height="30px"  />
        </BaseButton>
      </div>
    </ButtonBar>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import ButtonBar from "@/components/ButtonBar.vue";
import PrinterIcon from "@/components/icons/PrinterIcon.vue";
import BinIcon from "@/components/icons/BinIcon.vue";
import { Icon } from "@iconify/vue";
import { usePhotos } from "@/composables/usePhotos";
import { computed, onBeforeUnmount } from 'vue';
import { useRouter } from "vue-router";
import CameraIcon from "@/components/icons/CameraIcon.vue";

const props = defineProps({
  imageId: { type: String, required: true },
});

const { print, remove } = usePhotos();

function handlePrint() {
  print(props.imageId);
  router.push("/");
}

const router = useRouter();
function handleRemove() {
  remove(props.imageId);
  router.push("/");
}

const imageUrl = computed(
  () => `${import.meta.env.VITE_BACKEND}/previews/${props.imageId}.webp`
);

const timerID = setTimeout(()=>{
  router.push("/");
},60000)


onBeforeUnmount(()=>{
  clearTimeout(timerID)
})
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
  }

  &__middle-actions {
    display: flex;
    > * + * {
      margin-left: 3rem;
    }
  }
}
</style>
