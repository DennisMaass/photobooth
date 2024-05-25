<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/offline";
import { Lazy, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/navigation";


const modules = ref([Lazy, Navigation]);

const allIds = ref<string[]>([]);
onMounted(async () => {
  const { getAll } = usePhotos();
  const response = await getAll();
  allIds.value = response.ids;
});

const initialSlide = computed(() => allIds.value?.length);

const config = useRuntimeConfig();

const allPhotos = computed(() =>
  allIds.value?.map(
    (id: string) => `${config.public.backend}/previews/${id}.webp`
  )
);

let swiperInstance: any = ref(null);
const onSwiper = (sw: any) => {
  swiperInstance.value = sw;
};

const onIndexChanged = () => {
  if (!swiperInstance.value) {
    return;
  }
  activeIndex.value = swiperInstance.value.activeIndex;
};

const router = useRouter();
const { print } = usePrinter();
const { printWithWatermark } = useThemes();

function handlePrint() {
  print(activeId.value, printWithWatermark.value);
}

async function handleDownload() {
  await navigateTo({
    path: `/download/${activeId.value}`,
    query: { previewsView: "Gallery" },
  });
}

const activeIndex = ref(initialSlide.value);

const activeId = computed(() => allIds.value[activeIndex.value]);

const { enabledPrinter } = useAppData();
</script>

<template>
  <div class="gallery">
    <div class="gallery__slider" v-if="initialSlide">
      <swiper :slides-per-view="1" :space-between="10" :lazy="true" :modules="modules" :navigation="true"
        @swiper="onSwiper" @activeIndexChange="onIndexChanged" :initial-slide="initialSlide">
        <swiper-slide v-for="photo in allPhotos" :key="photo">
          <div class="flex flex-col h-full justify-center">
            <img class="swiper-lazy" :data-src="photo" alt="" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="gallery__footer">
      <ButtonBar justify-content="space-between">
        <template #middle>
          <BaseButton to="/">
            <Icon icon="mdi:home" color="white" width="42px" height="42px" />
          </BaseButton>
          <BaseButton v-if="enabledPrinter" @click="handlePrint">
            <Icon icon="fluent:print-20-filled" color="white" width="42px" height="42px" />
          </BaseButton>
          <BaseButton @click="handleDownload">
            <Icon icon="mdi:tray-arrow-down" color="white" width="42px" height="42px" />
          </BaseButton>
        </template>
      </ButtonBar>
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
      height: calc(100vh - 3rem - 90px - 40px);
      overflow: hidden;
    }
  }
}
</style>
