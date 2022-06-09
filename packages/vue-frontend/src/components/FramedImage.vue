<template>
  <div class="framed-image">
    <slot></slot>
    <div class="framed-image__sub-title">
      <div class="framed-image__name-wrapper">
        <span class="framed-image__name">{{ firstName }}</span>
        <span class="framed-image__separator">&amp;</span>
        <span class="framed-image__name">{{ secondName }}</span>
      </div>
      <div class="framed-image__date">{{ date }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  imageUrl: { type: String },
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  date: { type: String, required: true },
});
</script>

<style lang="scss">
.framed-image {
  position: relative;
  padding: 25px 25px 80px 25px;
  border: 1px solid;
  height:100%;

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

  &__name, &__date {
    font-family: Rushtick, sans-serif;
  }

  &__date {
    font-size: 22px;
    line-height: 1.2;
  }

  &__separator {
    font-family: MsMadi, sans-serif;
    padding: 0 0.8ch;
    color:hsl(30, 25%, 53%)
  }
}
</style>
