<script lang="ts" setup>
import useCheck from "@/composables/useCheck";

const { status, backendAvailable } = useCheck();

</script>
<template>
  <div>status: {{ status }}</div>
  <br />
  <div>backend</div>
  <div>reachable: {{ backendAvailable }}</div>
</template>
