<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/offline";
import ButtonBar from "@/components/ButtonBar.vue";
import BaseButton from "@/components/BaseButton.vue";
import BackButton from "@/components/BackButton.vue";
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

  <div>wakelock: {{ wakelockActive }}</div>
  <div>version: {{ version }}</div>
  <div>window size: {{ width }} x {{ height }}</div>

  <ButtonBar justify-content="space-between">
    <template #left>
      <BackButton />
    </template>
    <template #middle>
      <BaseButton to="/setup">
        <Icon icon="mdi:play" color="white" width="30px" height="30px" />
      </BaseButton>
      <BaseButton to="/gallery">
        <Icon icon="mdi:image" color="white" width="30px" height="30px" />
      </BaseButton>
      <BaseButton to="/config">
        <Icon icon="mdi:cog" color="white" width="30px" height="30px" />
      </BaseButton>
      <BaseButton to="/home">
        <Icon icon="mdi:home" color="white" width="42px" height="42px" />
      </BaseButton>
    </template>
  </ButtonBar>
</template>
