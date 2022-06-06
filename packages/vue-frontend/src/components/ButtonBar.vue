<template>
  <div class="button-bar">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  justifyContent:{type:String,default:"center"}
})
</script>

<style lang="scss">
.button-bar {
  display: flex;
  justify-content: v-bind(justifyContent);
}
</style>
