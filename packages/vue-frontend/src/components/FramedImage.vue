<template>
  <div class="framed-image">
    <slot></slot>
    <div class="framed-image__sub-title">
      <div class="framed-image__name-wrapper" style="">
        <span v-if="fotoText">{{ fotoText }}</span>
        <span v-if="birthdayfirstName">{{ birthdayfirstName }}</span>
        <span v-if="brideFirstName" class="framed-image__name">{{
          brideFirstName
        }}</span>
        <span v-if="groomFirstName" class="framed-image__separator">&amp;</span>
        <span v-if="groomFirstName" class="framed-image__name">{{
          groomFirstName
        }}</span>
      </div>
      <div v-if="date" class="framed-image__date">{{ date }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useConfig from "@/composables/useAppData";
const props = defineProps({
  date: { type: String },
});

const {
  fotoText,
  fotoTextFont,
  brideFirstName,
  groomFirstName,
  birthdayfirstName,
} = useConfig();
</script>

<style lang="scss">
.framed-image {
  position: relative;
  padding: 25px 25px 80px 25px;
  border: 1px solid;
  height: 100%;
  background-color: white;
  font-family: v-bind(fotoTextFont);
  display: inline-block;

  &__image {
    width: 100%;
  }

  &__sub-title {
    position: absolute;
    left: 50%;
    bottom: 8px;
    transform: translateX(-50%);
    font-size: 26px;
  }

  &__name,
  &__date {
    font-family: Rushtick, sans-serif;
  }

  &__date {
    font-size: 22px;
    line-height: 1.2;
  }

  &__separator {
    font-family: MsMadi, sans-serif;
    padding: 0 0.8ch;
    color: hsl(30, 25%, 53%);
  }
}
</style>
