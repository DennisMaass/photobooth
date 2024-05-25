<script lang="ts" setup>
import { Lazy, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/navigation";

const modules = ref([Lazy, Navigation]);

const allIds = ref<string[]>([]);
onMounted(async () => {
  const { getAll } = usePhotos(false);
  const response = await getAll();
  allIds.value = response.ids;
});

const initialSlide = computed(() => allIds.value?.length);

const config = useRuntimeConfig();

const allPhotos = computed(() => {
  const allPhotos = allIds.value?.map(
    (id: string) => `${config.public.backendHttp}/previews/${id}.webp`
  );
  return allPhotos;
});

let swiperInstance: any = ref(null);
const onSwiper = (sw: any) => {
  swiperInstance.value = sw;
};
</script>
<template>
  <div class="gallery">
    <h1>Foto auf dein Smartphone herunterladen</h1>
    <p>Drücke lange auf das Foto um es zu speichern</p>
    <div class="gallery__slider" v-if="initialSlide">
      <swiper :slidesPerView="1" :centeredSlides="true" :lazy="true" :modules="modules" :navigation="true"
        :spaceBetween="10" @swiper="onSwiper" :initial-slide="initialSlide">
        <swiper-slide v-for="photo in allPhotos">
          <img class="swiper-lazy object-cover block h-full w-full" :data-src="photo" alt="" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<style lang="scss">
.gallery {
  display: flex;
  flex-direction: column;
  padding: 20px;

  >*+* {
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
}
</style>
