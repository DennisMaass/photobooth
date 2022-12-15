<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import BaseButton from "@/components/BaseButton.vue";
import ButtonBar from "@/components/ButtonBar.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import { useRouter } from "vue-router";
import { onLongPress } from "@vueuse/core";
import WeddingIntro from "@/components/WeddingIntro.vue";
import ChristmasIntro from "@/components/ChristmasIntro.vue";
import { ref } from "vue";

const router = useRouter();

const homeComponent = ref<HTMLElement | null>(null);
onLongPress(homeComponent, onLongPressCallback, { delay: 2000 });
function onLongPressCallback() {
  router.push("/admin");
}

function handleClick() {
  router.push("/countdown");
}

const topic = useLocalStorage("topic", "wedding");
</script>

<template>
  <div class="home" @click="handleClick" ref="homeComponent">
    <div class="home__image-wrapper">
      <WeddingIntro v-if="topic === 'wedding'"></WeddingIntro>
      <ChristmasIntro v-else-if="topic === 'christmas'"></ChristmasIntro>
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
