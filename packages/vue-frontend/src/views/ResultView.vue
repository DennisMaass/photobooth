<template>
  <div class="result">
    <div class="result__content-wrapper">
      <div class="result__back-wrapper">
        <BaseButton to="/home" class="result__back">
          <CameraIcon />
        </BaseButton>
      </div>
      <div class="result__image-wrapper">
        <img class="result__photo" :src="imageUrl" alt="taken photo"/>
      </div>
      <div class="result__actions-wrapper">
        <BaseButton>
          <PrinterIcon @click="handlePrint" />
        </BaseButton>
        <BaseButton @click="handleRemove">
          <BinIcon />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import PrinterIcon from "@/components/icons/PrinterIcon.vue";
import BinIcon from "@/components/icons/BinIcon.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import { usePhotos } from "@/composables/usePhotos";
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  imageId: { type: String, required: true },
});

const { print, remove } = usePhotos();

function handlePrint() {
  print(props.imageId);
  router.push("/");
}


const router = useRouter()
function handleRemove() {
  remove(props.imageId);
  router.push("/");
}

const imageUrl= computed(()=>`http://localhost:3001/previews/${props.imageId}.webp`)
</script>

<style>
.result {
  height: 100vh;
  background-color: #b2c3b5;
}
.result__content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 2rem);
  padding: 1rem;
}

.result__back-wrapper {
  display: flex;
  justify-content: flex-end;
}

.result__image-wrapper {
  flex: 1;
  padding: 3rem;
}

.result__photo {
  width: auto;
  height: 100%;
  aspect-ratio: 3/2;
}

.result__back {
  margin: 1rem;
}

.result__actions-wrapper {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}
</style>
