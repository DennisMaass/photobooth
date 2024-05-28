<script lang="ts" setup>
import { ref } from "vue";

import BaseButton from "@/components/BaseButton.vue";
import useThemes from "@/composables/useThemes";
import { Icon } from "@iconify/vue/dist/offline";
import ButtonBar from "@/components/ButtonBar.vue";
import BackButton from "@/components/BackButton.vue";

const {
  people,
  addPerson,
  removePerson,
  company,
  setCompany,
  themes,
  selectedTheme,
  setTheme,
  animationEnabled,
  fontAnimationEnabled,
  printWithWatermark
} = useThemes();

function addNewPerson() {
  addPerson(newPerson.value);

  newPerson.value = {
    firstName: "",
    lastName: "",
  }
}

const newPerson = ref({
  firstName: "",
  lastName: "",
})

function handleReset() {
  localStorage.clear();
  window.location.reload();
}
</script>

<template>
  <div class="config-view">
    <h1>Config</h1>

    <div class="space-y-6">
      <div>
        <h2>Theme</h2>
        <div class="theme-selector">
          <div v-for="theme of themes" :key="theme.name" @click="setTheme(theme.id)" class="theme-selector__theme"
            :class="{
            'theme-selector__theme--active': theme.name === selectedTheme.name,
          }">
            {{ theme.name }}
          </div>
        </div>
      </div>

      <div>
        <h2>Daten</h2>

        <div>
          <h3>People</h3>

          <div class="space-y-4">
            <div class="flex justify-center">
              <div class="flex">
                <label>first name</label>
                <input type="text" placeholder="first name" v-model="newPerson.firstName" />
                <label>last name</label>
                <input type="text" placeholder="last name" v-model="newPerson.lastName" />
              </div>
              <button @click="addNewPerson">+</button>
            </div>

            <div v-for="(person, index) of people" :key="index" class="flex justify-center">
              <div class="flex space-x-3">
                <label>first name:</label>
                <div> {{ person.firstName }} </div>
                <label>last name:</label>
                <div> {{ person.lastName }} </div>
              </div>
              <button @click="removePerson(person)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">-</button>
            </div>
          </div>
        </div>

        <div>
          <h3>Company</h3>
          <div class="space-y-4">
            <div>
              <label>name</label>
              <input type="text" placeholder="company" v-model="company" />
              <button @click="setCompany(company)">save</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2>Einstellungen</h2>
        <div class="space-y-2">
          <div class="space-x-2">
            <label>animation</label>
            <input type="checkbox" v-model="animationEnabled" />
          </div>
          <div class="space-x-2">
            <label>fontAnimation</label>
            <input type="checkbox" v-model="fontAnimationEnabled" />
          </div>
          <div class="space-x-2">
            <label>printWithWatermark</label>
            <input type="checkbox" v-model="printWithWatermark" />
          </div>
        </div>
      </div>
    </div>
    <button @click="handleReset">zurücksetzen</button>
    <div class="config-view__footer">
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
          <BaseButton to="/admin">
            admin
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
}
</style>
