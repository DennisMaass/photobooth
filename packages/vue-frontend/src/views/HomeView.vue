<template>
  <div class="home" @click="handleClick">
    <img class="image" src="@/assets/boho_wedding.png" alt="event image" />
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

const router = useRouter();
function handleClick() {
  router.push("/countdown");
}
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

  &__footer {
    flex: 0;
  }

  .image {
    height: calc(100% - 90px - 3rem);
    object-fit: contain;
  }

  &__image-wrapper {
    height: 100%;
    flex: 1;
    flex-shrink: 0;
    display: flex;
  }
}
</style>
