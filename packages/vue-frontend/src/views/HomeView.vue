<script setup lang="ts">
import useTheme from "../composables/useTheme";
import BaseButton from "@/components/BaseButton.vue";
import ButtonBar from "@/components/ButtonBar.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import { useRouter } from "vue-router";

import WeddingIntro from "@/components/WeddingIntro.vue";
import ChristmasIntro from "@/components/ChristmasIntro.vue";
import BirthdayIntro from "@/components/BirthdayIntro.vue";

const router = useRouter();

function handleClick() {
  router.push("/countdown");
}

const { wallpaper, wallpaperImage, topic } = useTheme();
</script>

<template>
  <div class="home" @click="handleClick" ref="homeComponent">
    <div class="home__wallpaper-container">
      <img
        v-if="wallpaper"
        class="home__wallpaper"
        :src="'/wallpaper/' + wallpaperImage"
        alt="event image"
      />
    </div>
    <div class="home__content">
      <div class="home__image-wrapper">
        <template v-if="!wallpaper">
          <WeddingIntro v-if="topic === 'wedding'"></WeddingIntro>
          <ChristmasIntro v-else-if="topic === 'christmas'"></ChristmasIntro>
          <BirthdayIntro v-if="topic === 'birthday'"></BirthdayIntro>
        </template>
      </div>
      <div class="home__footer">
        <ButtonBar>
          <template #middle>
            <BaseButton to="/countdown">
              <CameraIcon />
            </BaseButton>
          </template>
        </ButtonBar>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.home {
  &__content {
    > * + * {
      margin-top: 3rem;
    }

    height: 100vh;
    max-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  &__wallpaper-container {
    top: 0;
    left: 0;
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: -1;
  }

  &__title {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }

  &__footer {
    flex: 0;
  }

  &__wallpaper {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .image {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  &__image-wrapper {
    height: calc(100% - 90px - 3rem);
    position: relative;
  }
}
</style>
