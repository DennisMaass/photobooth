<script lang="ts" setup>
const config = useRuntimeConfig();
const basepath = `${config.public.backend}/wallpaper`;
</script>
<template>
  <img class="image" :src="`${basepath}/birthday-1-klein.webp`" alt="event image" />
</template>
