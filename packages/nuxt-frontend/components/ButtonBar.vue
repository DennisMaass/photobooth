<template>
  <div class="button-bar flex">
    <div>
      <slot name="left"></slot>
    </div>
    <div class="flex space-x-6">
      <slot name="middle"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  justifyContent: { type: String, default: "center" },
});
</script>

<style lang="scss">
.button-bar {
  justify-content: v-bind(justifyContent);
}
</style>
