<script setup lang="ts">
import { useWakeLock } from '@vueuse/core'
import { useCamera } from '@/composables/useCamera';
import { onBeforeUnmount } from 'vue';

const { request } = useWakeLock()
try {
  request()
  console.debug('[App] wakelock requested')
}catch(error){
  console.error('[App] useWakeLock',error)
}


const { start, stop } = useCamera()
start()

onBeforeUnmount(() => {
  stop()
});

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
