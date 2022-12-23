<script lang="ts" setup>
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import useAppData from "../composables/useAppData";
import useTheme from "../composables/useTheme";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ColorInput from "vue-color-input";

const {
  people,
  company,
  wallpaper,
  wallpaperImage,
  headerColor,
  fotoTextFont,
  fotoText,
  backgroundColor,
  textColor,
  topic,
  baseButtonBackground,
  baseButtonBackgroundActive,
  addEmptyPerson,
  removeLastPerson,
} = useTheme();

const { version, width, height, enabledPrinter, wakelockActive } = useAppData();
</script>
<template>
  <h1>Admin</h1>
  <div>
    <h2>Thema</h2>
    <input type="radio" id="wedding" value="wedding" v-model="topic" />
    <label for="wedding">Hochzeit</label>

    <input type="radio" id="birthday" value="birthday" v-model="topic" />
    <label for="birthday">Geburstag</label>

    <input type="radio" id="christmas" value="christmas" v-model="topic" />
    <label for="christmas">Weihnachten</label>

    <input
      type="radio"
      id="new-years-eve"
      value="new-years-eve"
      v-model="topic"
    />
    <label for="new-years-eve">Silvester</label>
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
    <h2>wallpaper</h2>
    <label for="wallpaper">wallpaper</label>
    <input type="checkbox" v-model="wallpaper" />

    <label>wallpaperImage</label>
    <input type="text" v-model="wallpaperImage" />
  </div>

  <div>
    <div>
      <h2>header color</h2>
      <input type="radio" id="dark" value="dark" v-model="headerColor" />
      <label for="dark">dark</label>

      <input type="radio" id="light" value="light" v-model="headerColor" />
      <label for="light">light</label>
    </div>
    <div>
      <label for="enabledPrinter">Enabled printer</label>
      <input type="checkbox" v-model="enabledPrinter" />
    </div>
    <div>
      <label for="baseButtonBackground">Button Background color</label>
      <ColorInput v-model="baseButtonBackground" />
    </div>
    <div>
      <label for="baseButtonBackgroundActive"
        >Button Active background color</label
      >
      <ColorInput v-model="baseButtonBackgroundActive" />
    </div>
    <div>
      <label for="backgroundColor">App Background color</label>
      <ColorInput v-model="backgroundColor" />
    </div>
    <div>
      <label for="textColor">App Text color</label>
      <ColorInput v-model="textColor" />
    </div>
  </div>

  <div>
    <BaseButton to="/setup">setup</BaseButton>
    <BaseButton to="/gallery">Gallery</BaseButton>
    <BaseButton to="/home">Home</BaseButton>
  </div>

  <div>wakelock: {{ wakelockActive }}</div>
  <div>version: {{ version }}</div>
  <div>window size: {{ width }} x {{ height }}</div>
</template>
