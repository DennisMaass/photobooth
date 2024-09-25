<template>
  <RouterLink v-if="to" :class="[classes]" :to="to">
    <slot></slot>
  </RouterLink>
  <button v-else :class="[classes]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  to?: string;
  theme?: "rectangle" | "circle";
}>(), {
  theme: "circle",
});

const classes = computed(() => {
  if (props.to) {
    return "flex items-center justify-center h-[4.5rem] w-[4.5rem] bg-[color:var(--base-button-background)] p-4 rounded-full";
  } else if (props.theme === "rectangle") {
    return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  } else if (props.theme === "circle") {
    return "flex items-center justify-center h-[4.5rem] w-[4.5rem] bg-[color:var(--base-button-background)] p-4 rounded-full active:bg-[color:var(--base-button-background-active)] hover:bg-[color:var(--base-button-background-active)]";
  }

  return "";
});
</script>
