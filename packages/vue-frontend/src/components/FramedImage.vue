<template>
  <div class="framed-image">
    <slot></slot>
    <div class="framed-image__sub-title">
        <span class="framed-image__name">Victoria & Thomas</span>
      <div v-if="date" class="framed-image__date">{{ date }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import useThemes from "@/composables/useThemes.js";

defineProps({
  date: { type: String },
});

const { selectedTheme } = useThemes();
const fotoTextFont = computed(() => selectedTheme.value.fotoTextFont);
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
    font-family: var(--name-letter-font), sans-serif;
  }

  &__date {
    font-size: 22px;
    line-height: 1.2;
    font-family: Rushtick, sans-serif;
  }

  &__separator {
    font-family: MsMadi, sans-serif;
    padding: 0 0.8ch;
    color: hsl(30, 25%, 53%);
  }
}
</style>
