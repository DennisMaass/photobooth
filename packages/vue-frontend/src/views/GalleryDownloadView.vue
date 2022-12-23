<template>
  <div class="gallery">
    <div class="gallery__slider" v-if="initialSlide">
      <h1>Foto auf dein Smartphone herunterladen</h1>
      <p>Drücke lange auf das Foto um es zu speichern</p>
      <swiper
        :slidesPerView="'auto'"
        :centeredSlides="true"
        :spaceBetween="10"
        @swiper="onSwiper"
        :initial-slide="initialSlide"
      >
        <swiper-slide v-for="photo in allPhotos">
          <img class="gallery__image" :src="photo" alt="" loading="lazy" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { usePhotos } from "@/composables/usePhotos";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

const allIds = ref<string[]>([]);
onMounted(async () => {
  const { getAll } = usePhotos();
  const response = await getAll();
  allIds.value = response.ids;
});

const initialSlide = computed(() => {
  return allIds.value?.length;
});
const allPhotos = computed(() =>
  allIds.value?.map(
    (id: string) => `${import.meta.env.VITE_BACKEND}/previews/${id}.webp`
  )
);

let swiperInstance: any = ref(null);
const onSwiper = (sw: any) => {
  swiperInstance.value = sw;
};
</script>

<style lang="scss">
.gallery {
  display: flex;
  flex-direction: column;
  padding: 20px;

  > * + * {
    margin-top: 3rem;
  }

  &__slider {
    .swiper {
      width: 100%;
      height: 100%;
    }
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
  }
  &__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
