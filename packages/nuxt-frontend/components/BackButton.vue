<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/offline";

function goBack() {
    window.history.back();
}
</script>

<template>
    <BaseButton @click="goBack">
        <Icon icon="mdi:arrow-left-bold" color="white" width="42px" height="42px" />
    </BaseButton>
</template>