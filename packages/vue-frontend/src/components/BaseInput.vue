<script setup lang="ts">
defineProps<{
    type: string;
}>();

const [model] = defineModel();
</script>
<template>
    <input :type="type" v-model="model" class="border" />
</template>