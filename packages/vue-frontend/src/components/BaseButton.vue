<template>
  <RouterLink v-if="to" class="base-button normalize" :to="to">
    <slot></slot>
  </RouterLink>
  <button v-else class="base-button normalize">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  to: { type: String, default: "" },
});
</script>

<style lang="scss">
.base-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.5rem;
  width: 4.5rem;
  border-radius: 50%;
  background-color: var(--base-button-background);
  padding: 1rem;

  &:hover,
  &:active {
    background-color: var(--base-button-background-active);
  }
}
</style>
