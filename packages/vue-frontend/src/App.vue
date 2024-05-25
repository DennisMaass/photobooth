<script setup lang="ts">
import useAppData from "./composables/useAppData";
import useNavigation from "./composables/useNavigation";
import useThemes from "./composables/useThemes";
import useCheck from "./composables/useCheck";
import useNetwork from "./composables/useNetwork";
import useSettings from "./composables/useSettings";

const { init: initApp } = useAppData();
initApp();

const { init: initTheme } = useThemes();
initTheme();

const { init: initSettings } = useSettings();
initSettings();

const { init: initNavigation } = useNavigation();
initNavigation();

const { init: initCheck } = useCheck();
initCheck();

const { connect } = useNetwork();
connect();
</script>

<template>
  <div id="theme-animation-layer" class="fixed inset-0 z-50 pointer-events-none"></div>
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
}

#app {
  color: var(--text-color);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  background-color: var(--background-color);
}

h1 {
  margin: 0;
}
</style>
