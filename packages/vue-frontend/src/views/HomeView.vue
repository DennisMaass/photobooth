<template>
  <div class="home" @click="handleClick">
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
import HomeTitle from "@/components/HomeTitle.vue";

const router = useRouter();
function handleClick() {
  router.push("/countdown");
}

const eventTitle = `
      <span style="font-family: Rushtick">Dominique</span>
      </br>
      <span style="font-family: serif">&amp;</span>
      </br>
      <span style="font-family: Rushtick">Reinhard</span>`;
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
