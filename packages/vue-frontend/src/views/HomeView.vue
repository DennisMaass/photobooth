<template>
  <div class="home" @click="handleClick">
    <div class="home__image-wrapper">
      <img
        class="image"
        src="@/assets/boho_frame_square.jpg"
        alt="event image"
      />
      <div v-html="eventTitle" class="home__title"></div>
    </div>
    <div class="home__footer">
      <ButtonBar>
        <BaseButton to="/countdown">
          <CameraIcon />
        </BaseButton>
      </ButtonBar>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "@/components/BaseButton.vue";
import ButtonBar from "@/components/ButtonBar.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import { useRouter } from "vue-router";
import BohoFrame from "@/components/BohoFrame.vue";

const router = useRouter();
function handleClick() {
  router.push("/countdown");
}

const eventTitle = `<p>Dominique</br>&</br>Reinhard</p>`;
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: "Rushtick", "sans-serif";
    font-size: 40px;
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
