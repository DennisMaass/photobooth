<template>
  <div class="picture-download">
    <h1> Foto auf dein Smartphone herunterladen</h1>
    <p>Drücke lange auf das Foto um es zu speichern</p>
    <div>
      <img class="picture-download__image" :src="originalImageUrl" alt="photo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();
const imageId=route.params.imageId

const originalImageName=`${imageId}.jpg`
const originalImageUrl = computed(
  () => `${import.meta.env.VITE_BACKEND_HTTP}/originals/${originalImageName}`
);
</script>

<style lang="scss">
.picture-download{
  &__image {
    height:400px;
    width:auto
  }
}
</style>
