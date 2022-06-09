<template>
  <div class="gallery">
    <img class="gallery_image" v-for='photo of allPhotos' :src='photo' alt=''>
  </div>
</template>

<script lang="ts" setup>
import { usePhotos } from '@/composables/usePhotos';
import { computed } from 'vue';

const { getAll } = usePhotos()
const allIds = await getAll()

const allPhotos= allIds.ids.map((id)=>`${import.meta.env.VITE_BACKEND}/previews/${id}.webp`)
console.log("allPhotos",allPhotos);
</script>

<style lang="scss"></style>
