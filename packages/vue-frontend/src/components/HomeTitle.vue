<template>
  <div class="home-title">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";

import { onMounted } from "vue";

onMounted(() => {
  anime
    .timeline({ loop: true })
    .add({
      targets: ".ml3 .letter",
      opacity: [.0, 1],
      easing: "easeOutExpo",
      duration: 15,
      delay: (el: HTMLElement, i: number) => 100 * (i + 1),
    })
    .add({
      targets: ".ml3",
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 5000,
    });
});
</script>

<style lang="scss">
.home-title {
  font-family: "sans-serif";
  font-size: 40px;
}

.letter {
  padding: 4px;
}
</style>
