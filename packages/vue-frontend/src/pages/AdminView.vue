<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import useAppData from "../composables/useAppData";

const { version, width, height, enabledPrinter, wakelockActive } = useAppData();

function tooglePrinter() {
  enabledPrinter.value = !enabledPrinter.value;
}
</script>
<template>
  <h1>Admin</h1>
  <button @click="tooglePrinter">
    <span v-if="enabledPrinter">disable Printer</span>
    <span v-else>enable Printer</span>
  </button>

  <div>
    <BaseButton to="/setup">setup</BaseButton>
    <BaseButton to="/gallery">Gallery</BaseButton>
    <BaseButton to="/home">Home</BaseButton>
  </div>

  <div>wakelock: {{ wakelockActive }}</div>
  <div>version: {{ version }}</div>
  <div>window size: {{ width }} x {{ height }}</div>
</template>
