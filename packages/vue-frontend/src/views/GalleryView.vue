<template>
  <div class="gallery">
    <div class="gallery__slider">
      <swiper
        :slides-per-view="1"
        :space-between="10"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        @activeIndexChange="onIndexChanged"
      >
        <swiper-slide v-for="photo in allPhotos" >
          <img class="gallery__image" :src='photo' alt='' loading='lazy'/>
        </swiper-slide>
      </swiper>
    </div>
    <div class="gallery__footer">
      <ButtonBar justify-content="space-between">
          <template #middle>
            <BaseButton to="/">
            <Icon icon="mdi:home" color="white" width="42px" height="42px" />
            </BaseButton>
            <BaseButton @click="handlePrint" >
              <PrinterIcon width="30px" height="30px"/>
            </BaseButton>
            <BaseButton @click="handleRemove">
              <BinIcon width="30px" height="30px"/>
            </BaseButton>
          </template>
      </ButtonBar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import ButtonBar from "@/components/ButtonBar.vue";
import PrinterIcon from "@/components/icons/PrinterIcon.vue";
import { Icon } from "@iconify/vue";
import BinIcon from "@/components/icons/BinIcon.vue";
import { computed, onMounted, ref } from 'vue';
import { usePhotos } from '@/composables/usePhotos';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import { useRouter } from 'vue-router';

const allIds=ref()
onMounted(async ()=>{
  const { getAll } = usePhotos()
  allIds.value = await getAll()
})

const allPhotos = computed(()=> allIds.value?.ids.map((id:string)=>`${import.meta.env.VITE_BACKEND}/previews/${id}.webp`))


let swiperInstance:any = ref(null)
const onSwiper = (sw:any) => {
  swiperInstance.value = sw
  console.log("swiper",swiperInstance);
};
const onSlideChange = () => {
  console.log('slide change');
};

const onIndexChanged = () => {
  activeIndex.value = swiperInstance.value.activeIndex
};

const router = useRouter();
const { print, remove } = usePhotos();
function handlePrint() {
  print(activeId.value)
}
function handleRemove() {
  remove(activeId.value);
}

const activeIndex= ref(0)

const activeId=computed(()=>allIds.value.ids[activeIndex.value])
</script>

<style lang="scss">
.gallery{
  display: flex;
  flex-direction: column;
  padding:20px;

  > * + * {
    margin-top: 3rem;
  }

  &__slider{
    .swiper{
      width: 100%;
      height: calc(100vh - 3rem - 90px - 40px);
      overflow: hidden;
    }
  }

  &__image {
    height: 100%;
    width: auto ;
  }
}
</style>
