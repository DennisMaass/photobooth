<script setup lang="ts">
import { useCssVar, useWakeLock } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";
import useConfigs from "./composables/useConfigs";

const {
  wakelockActive,
  init,
  baseButtonBackground,
  baseButtonBackgroundActive,
} = useConfigs();

const { isActive, request } = useWakeLock();

init();
watch(
  isActive,
  (newVal) => {
    wakelockActive.value = newVal;
  },
  { immediate: true }
);

onMounted(async () => {
  try {
    await request("screen");
    console.debug("[App] wakelock requested");
  } catch (error) {
    console.error("[App] useWakeLock", error);
  }
});

//TODO make it reactive
const body = document.querySelector("body");
const el = ref(body);

const baseButtonBackgroundCSS = useCssVar("--base-button-background", el);
watch(
  baseButtonBackground,
  (newVal) => {
    baseButtonBackgroundCSS.value = newVal;
  },
  { immediate: true }
);

const baseButtonBackgroundActiveCSS = useCssVar(
  "--base-button-background-active",
  el
);
watch(
  baseButtonBackgroundActive,
  (newVal) => {
    baseButtonBackgroundActiveCSS.value = newVal;
  },
  { immediate: true }
);
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
:root[data-theme="dark"] {
  color-scheme: dark;
}

:root[data-theme="light"] {
  color-scheme: light;
}

* {
  box-sizing: border-box;
  color: var(--text-color);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-color: black;
}

h1 {
  margin: 0;
}

@font-face {
  font-family: "Fira Sans";
  src: url(@/assets/fonts/FiraSans-Bold.ttf);
}
</style>
