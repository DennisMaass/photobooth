<template>
  <div class="button-bar">
    <div class="button-bar__left">
     <slot name="left"></slot>
    </div>
    <div class="button-bar__middle">
    <slot name="middle"></slot>
    </div>
      <div class="button-bar__right">
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
  display: flex;
  justify-content: v-bind(justifyContent);

  &__left{

  }
  &__middle{
    display: flex;
    > * + * {
      margin-left: 3rem;
    }
  }
  &__right{

  }
}
</style>
