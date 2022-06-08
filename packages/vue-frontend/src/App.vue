<script setup lang="ts">
import { useWakeLock } from "@vueuse/core";

const { request } = useWakeLock();
try {
  request("screen");
  console.debug("[App] wakelock requested");
} catch (error) {
  console.error("[App] useWakeLock", error);
}
</script>

<template>
  <RouterView />
</template>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
