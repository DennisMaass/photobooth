<template>
  <div class="result">
      <div class="result__image-wrapper">
        <img class="result__photo" :src="imageUrl" alt="taken photo" />
      </div>
      <ButtonBar class="result__actions-wrapper">
        <div class="result__left-actions">
        <BaseButton to="/home" class="result__back">
          <Icon icon="mdi:home" height="75%" color="white" />
        </BaseButton>
        </div>
        <div class="result__middle-actions">
          <BaseButton>
            <PrinterIcon @click="handlePrint" />
          </BaseButton>
          <BaseButton @click="handleRemove">
            <BinIcon />
          </BaseButton>
        </div>
          <div class="result__right-actions">
        <BaseButton to="/gallery" class="result__back">
          <Icon icon="mdi:picture" height="75%" color="white" />
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
import { computed } from "vue";
import { useRouter } from "vue-router";

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
  () => `http://localhost:3001/previews/${props.imageId}.webp`
);
</script>

<style lang="scss">
.result {
  padding: 20px;
  height: 100vh;
  max-height: 100vh;
  background-color: #b2c3b5;
  display: flex;
  flex-direction: column;

   >* + * {
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
    aspect-ratio: 3/2;
    object-fit: cover;
  }

  &__actions-wrapper {
    display: flex;
    justify-content: center;

    >* + * {
      margin-left: 6rem;
    }
  }

  &__middle-actions{
    display: flex;
  }
}
</style>
