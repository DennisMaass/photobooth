<template>
  <div class="home" @click="handleClick" ref="homeComponent">
    <div class="home__image-wrapper">
      <img
        class="image"
        src="@/assets/boho_frame_square.jpg"
        alt="event image"
      />
      <HomeTitle class="home__title">
        <p v-html="eventTitle"></p>
      </HomeTitle>
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
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import ButtonBar from "@/components/ButtonBar.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import { useRouter } from "vue-router";
import HomeTitle from "@/components/HomeTitle.vue";
import { onLongPress, templateRef } from '@vueuse/core'

const router = useRouter();

const target = templateRef('homeComponent')
onLongPress(target, onLongPressCallback, { delay: 2000 })
function onLongPressCallback(){
  router.push("/gallery");
}

function handleClick() {
  router.push("/countdown");
}

const eventTitle = `
      <span class="ml3" style="font-family: Rushtick,sans-serif;font-size: 45px">
        <span class='letter'>M</span>
        <span class='letter'>u</span>
        <span class='letter'>n</span>
        <span class='letter'>j</span>
        <span class='letter'>a</span>
      </span>
      </br>
      <span class="ml3" style="font-family: MsMadi,sans-serif;font-size: 33px;color:hsl(30, 25%, 53%);">
        <span class='letter'>&amp;</span>
      </span>
      </br>
      <span class="ml3" style="font-family: Rushtick,sans-serif;font-size: 45px">
        <span class='letter'>J</span>
        <span class='letter'>o</span>
        <span class='letter'>e</span>
      </span>`;
</script>

<style lang="scss">
.home {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;

  > * + * {
    margin-top: 3rem;
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
