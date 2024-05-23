<template>
  <RouterLink v-if="to" class="flex items-center justify-center h-[4.5rem] w-[4.5rem] bg-[color:var(--base-button-background)] p-4 rounded-full active:bg-[color:var(--base-button-background-active)] hover:bg-[color:var(--base-button-background-active)]" :to="to">
    <slot></slot>
  </RouterLink>
  <button v-else class="flex items-center justify-center h-[4.5rem] w-[4.5rem] bg-[color:var(--base-button-background)] p-4 rounded-full">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  to: { type: String, default: "" },
});
</script>