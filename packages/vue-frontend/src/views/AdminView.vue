<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import useConfigs from "../composables/useConfigs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ColorInput from "vue-color-input";

const {
  version,
  topic,
  brideFirstName,
  groomFirstName,
  wakelockActive,
  personFirstName,
  textColor,
  fotoText,
  enabledPrinter,
  personLastName,
  companyName,
  baseButtonBackgroundActive,
  backgroundColor,
  baseButtonBackground,
  headerColor,
} = useConfigs();
</script>
<template>
  <h1>Settings</h1>
  <div>
    <h2>Topic</h2>
    <input type="radio" id="wedding" value="wedding" v-model="topic" />
    <label for="wedding">Wedding</label>

    <input type="radio" id="birthday" value="birthday" v-model="topic" />
    <label for="birthday">Birthday</label>

    <input type="radio" id="christmas" value="christmas" v-model="topic" />
    <label for="christmas">Christmas</label>
  </div>
  <div>
    <h2>Topic customizations</h2>
    <div v-if="topic === 'wedding'">
      <div>
        <h3>Bride</h3>
        <label for="brideFirstName">first name</label>
        <input
          type="text"
          placeholder="Bride first name"
          v-model="brideFirstName"
        />
      </div>

      <div>
        <h3>Groom</h3>
        <label for="groomFirstName">first name</label>
        <input
          type="text"
          placeholder="Groom first name"
          v-model="groomFirstName"
        />
      </div>
    </div>
    <div v-else-if="topic === 'birthday'">
      <div>
        <h3>Person</h3>
        <label for="personFirstName">first name</label>
        <input
          type="text"
          placeholder="Person first name"
          v-model="personFirstName"
        />
        <label for="personLastName">last name</label>
        <input
          type="text"
          placeholder="Person last name"
          v-model="personLastName"
        />
      </div>
    </div>
    <div v-else-if="topic === 'christmas'">
      <div>
        <h3>Company</h3>
        <div>
          <label for="personFirstName">name</label>
          <input type="text" placeholder="Company name" v-model="companyName" />
        </div>
        <div>
          <label for="fototext">fototext</label>
          <input type="text" placeholder="fototext" v-model="fotoText" />
        </div>
      </div>
    </div>
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
</template>
