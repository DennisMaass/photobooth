<script lang="ts" setup>
const { status, backendAvailable } = useCheck();

</script>
<template>
  <div>status: {{ status }}</div>
  <br />
  <div>backend</div>
  <div>reachable: {{ backendAvailable }}</div>
</template>
