<script setup lang="ts">
import { watch, ref } from "vue";
import useTheme from "../composables/useTheme";
import BaseButton from "@/components/BaseButton.vue";
import ButtonBar from "@/components/ButtonBar.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import { useRouter } from "vue-router";
import useCheck from "@/composables/useCheck";
import WeddingIntro from "@/components/WeddingIntro.vue";
import ChristmasIntro from "@/components/ChristmasIntro.vue";
import BirthdayIntro from "@/components/BirthdayIntro.vue";

const router = useRouter();

function handleClick() {
  router.push("/countdown");
}

const { selectedTheme } = useTheme();

const { status } = useCheck();
</script>

<template>
  <div v-if="status !== 'ready'">{{ status }}</div>
  <div v-else class="home" @click="handleClick" ref="homeComponent">
    <div class="home__wallpaper-container">
      <img
        v-if="selectedTheme.wallpaper"
        class="home__wallpaper"
        :src="'/wallpaper/' + selectedTheme.wallpaperImage"
        alt="event image"
      />
    </div>
    <div class="home__content">
      <div class="home__image-wrapper">
        <template v-if="!selectedTheme.wallpaper">
          <WeddingIntro v-if="selectedTheme.topic === 'wedding'"></WeddingIntro>
          <ChristmasIntro
            v-else-if="selectedTheme.topic === 'christmas'"
          ></ChristmasIntro>
          <BirthdayIntro
            v-if="selectedTheme.topic === 'birthday'"
          ></BirthdayIntro>
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
