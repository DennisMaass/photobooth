<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import useTheme from "../composables/useTheme";
import { Icon } from "@iconify/vue/dist/offline";

const {
  people,
  addEmptyPerson,
  removeLastPerson,
  company,
  changeTheme,
  themes,
  selectedTheme,
} = useTheme();
</script>
<template>
  <h1>Config</h1>
  <div>
    <h2>Theme</h2>
    <div class="theme-selector">
      <div
        v-for="theme of themes"
        :key="theme.name"
        @click="changeTheme(theme)"
        class="theme-selector__theme"
        :class="{
          'theme-selector__theme--active': theme.name === selectedTheme.name,
        }"
      >
        {{ theme.name }}
      </div>
    </div>
  </div>
  <div>
    <h2>Daten</h2>
    <h3>People</h3>
    <div v-for="(person, index) of people" :key="index">
      <label>first name</label>
      <input type="text" placeholder="first name" v-model="person.firstName" />
      <label>last name</label>
      <input type="text" placeholder="last name" v-model="person.lastName" />
    </div>
    <button @click="addEmptyPerson">+</button>
    <button @click="removeLastPerson">-</button>
    <h3>Company</h3>
    <div>
      <label>name</label>
      <input type="text" placeholder="company" v-model="company" />
    </div>
  </div>

  <div>
    <BaseButton to="/gallery">
      <Icon icon="mdi:picture" color="white" width="30px" height="30px" />
    </BaseButton>
    <BaseButton to="/" class="result__back">
      <Icon icon="mdi:home" color="white" width="42px" height="42px" />
    </BaseButton>
  </div>
</template>
<style lang="scss">
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
