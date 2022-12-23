<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import useAppData from "../composables/useAppData";

const { version, width, height, enabledPrinter, wakelockActive } = useAppData();
</script>
<template>
  <h1>Admin</h1>
  <div>enabledPrinter: {{ enabledPrinter }}</div>

  <div>
    <BaseButton to="/setup">setup</BaseButton>
    <BaseButton to="/gallery">Gallery</BaseButton>
    <BaseButton to="/home">Home</BaseButton>
  </div>

  <div>wakelock: {{ wakelockActive }}</div>
  <div>version: {{ version }}</div>
  <div>window size: {{ width }} x {{ height }}</div>
</template>
