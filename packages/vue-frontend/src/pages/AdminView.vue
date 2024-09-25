<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/offline";
import ButtonBar from "@/components/ButtonBar.vue";
import BaseButton from "@/components/BaseButton.vue";
import BackButton from "@/components/BackButton.vue";
import useAppData from "../composables/useAppData";
import useSettings from "../composables/useSettings";

const { version, width, height, wakelockActive } = useAppData();
const { userSettings, setUserSettings } = useSettings();

function tooglePrinter() {
  const newUserSettings = { ...userSettings.value };
  newUserSettings.global.printerEnabled = !userSettings.value.global.printerEnabled;
  setUserSettings(newUserSettings);
}
</script>
<template>
  <div class="flex flex-col h-full p-5">
    <div class="flex-1 space-y-3">
      <h1>Administration</h1>
      <BaseButton @click="tooglePrinter" theme="rectangle">
        <span v-if="userSettings.global.printerEnabled">Druckfunktion deaktivieren</span>
        <span v-else>Druckfunktion aktivieren</span>
      </BaseButton>
    </div>
    <div>Bildschirmschoner-Sperre: {{ wakelockActive }}</div>
    <div>App-Version: {{ version }}</div>
    <div>Fenstergröße: {{ width }} x {{ height }}</div>

    <ButtonBar justify-content="space-between">
      <template #left>
        <BackButton />
      </template>
      <template #middle>
        <BaseButton to="/setup">
          <Icon icon="mdi:cog" color="white" width="30px" height="30px" />
        </BaseButton>
        <BaseButton to="/gallery">
          <Icon icon="mdi:image" color="white" width="30px" height="30px" />
        </BaseButton>
        <BaseButton to="/config">
          <Icon icon="mdi:theme" color="white" width="30px" height="30px" />
        </BaseButton>
        <BaseButton to="/home">
          <Icon icon="mdi:home" color="white" width="42px" height="42px" />
        </BaseButton>
      </template>
    </ButtonBar>
  </div>
</template>
