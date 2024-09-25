<script lang="ts" setup>
import { ref, computed } from "vue";

import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import useThemes from "@/composables/useThemes";
import { Icon } from "@iconify/vue/dist/offline";
import ButtonBar from "@/components/ButtonBar.vue";
import BackButton from "@/components/BackButton.vue";
import useSettings from "@/composables/useSettings";

const {
  themes,
  selectedTheme,
  setTheme,
  animationEnabled,
  fontAnimationEnabled,
  printWithWatermark,
} = useThemes();

const { userSettings, setUserSettings } = useSettings();

if (userSettings.value.themes.global.people.length < 2) {
  userSettings.value.themes.global.people.push({ firstName: "", lastName: "" });
  userSettings.value.themes.global.people.push({ firstName: "", lastName: "" });
}

function setPhototext(value: string) {
  const newUserSettings = { ...userSettings.value };
  newUserSettings.themes.global.photoText = value;
  setUserSettings(newUserSettings);
}

function setDate(value: string) {
  const newUserSettings = { ...userSettings.value };
  newUserSettings.themes.global.date = value;
  setUserSettings(newUserSettings);
}

const firstPerson = computed(() => userSettings.value.themes.global.people[0]);

function setFirstPerson(firstName: string, lastName: string) {
  const newUserSettings = { ...userSettings.value };
  newUserSettings.themes.global.people[0].firstName = firstName;
  newUserSettings.themes.global.people[0].lastName = lastName;
  setUserSettings(newUserSettings);
}
const secondPerson = computed(() => userSettings.value.themes.global.people[1]);

function setSecondPerson(firstName: string, lastName: string) {
  const newUserSettings = { ...userSettings.value };
  newUserSettings.themes.global.people[1].firstName = firstName;
  newUserSettings.themes.global.people[1].lastName = lastName;
  setUserSettings(newUserSettings);
}

const basepath = `${import.meta.env.VITE_BACKEND}/assets/wallpaper`;
</script>

<template>
  <div class="config-view">
    <div class="config-view__content">
      <h1>Konfiguration</h1>

      <div class="space-y-6">
        <div>
          <h2>Themes</h2>
          <div class="theme-selector">
            <div v-for="theme of themes" :key="theme.name" @click="setTheme(theme.id)" class="theme-selector__theme"
              :class="{
                'theme-selector__theme--active': theme.name === selectedTheme.name,
              }">
              <h3>{{ theme.name }}</h3>
              <div class="theme-selector__theme-image-container">
                <img class="theme-selector__theme-image" :src="`${basepath}/${theme.wallpaperImage}`"
                  alt="theme image" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h3>Namen</h3>
            <div class="space-y-4">
              <div class="flex justify-center">
                <div class="flex">
                  <label>Vorname</label>
                  <BaseInput type="text" @update:modelValue="setFirstPerson($event, firstPerson.lastName)"
                    :modelValue="firstPerson.firstName" />
                </div>
                <div class="flex">
                  <label>Nachname</label>
                  <BaseInput type="text" @update:modelValue="setFirstPerson(firstPerson.firstName, $event)"
                    :modelValue="firstPerson.lastName" />
                </div>
              </div>
              <div class="flex justify-center">
                <div class="flex">
                  <label>Vorname</label>
                  <BaseInput type="text" @update:modelValue="setSecondPerson($event, firstPerson.lastName)"
                    :modelValue="secondPerson.firstName" />
                </div>
                <div class="flex">
                  <label>Nachname</label>
                  <BaseInput type="text" @update:modelValue="setSecondPerson(firstPerson.firstName, $event)"
                    :modelValue="secondPerson.lastName" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3>Fotodaten</h3>
            <div class="space-y-4">
              <div class="flex justify-center">
                <label>Foto untertitle 1</label>
                <BaseInput type="text" @update:modelValue="setPhototext"
                  :modelValue="userSettings.themes.global.photoText" />
              </div>
              <div class="flex justify-center">
                <label>Foto untertitle 2</label>
                <BaseInput type="text" @update:modelValue="setDate" :modelValue="userSettings.themes.global.date" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2>Sonstiges</h2>
          <div class="space-y-2">
            <div class="space-x-2">
              <label>Startbildschirm Animation</label>
              <BaseInput type="checkbox" v-model="animationEnabled" />
            </div>
            <div class="space-x-2">
              <label>Schrift Animation</label>
              <BaseInput type="checkbox" v-model="fontAnimationEnabled" />
            </div>
            <div class="space-x-2">
              <label>Wasserzeichen drucken</label>
              <BaseInput type="checkbox" v-model="printWithWatermark" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="config-view__footer">
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
          <BaseButton to="/admin">
            <Icon icon="mdi:account-lock" color="white" width="30px" height="30px" />
          </BaseButton>
          <BaseButton to="/home">
            <Icon icon="mdi:home" color="white" width="42px" height="42px" />
          </BaseButton>
        </template>
      </ButtonBar>
    </div>
  </div>
</template>
<style lang="scss">
.config-view {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;

  &__content {
    flex: 1;
  }

  &__footer {
    margin-top: 30px;
  }
}

.theme-selector {
  display: flex;
  justify-content: space-between;

  &__theme {
    cursor: pointer;
    height: 200px;
    width: 200px;
    border: #ccc 1px solid;

    &--active {
      background-color: #ccc;
    }
  }

  &__theme-image-container {
    align-items: center;
    display: flex;
    justify-content: center;
    height: 180px;
  }

  &__theme-image {
    object-fit: contain;
    height: 100%;
    width: 100%;
    flex-grow: 0;
  }
}
</style>
