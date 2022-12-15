<script lang="ts" setup>
import HomeTitle from "@/components/HomeTitle.vue";
import useConfig from "@/composables/useConfigs";

const { brideFirstName, groomFirstName } = useConfig();

const splittedBrideFirstName = brideFirstName.value.split("");
const splittedGroomFirstName = groomFirstName.value.split("");
</script>
<template>
  <img class="image" src="@/assets/boho_frame_square.jpg" alt="event image" />
  <HomeTitle class="home__title">
    <p>
      <span
        class="ml3"
        style="font-family: Rushtick, sans-serif; font-size: 45px"
      >
        <span
          class="letter"
          v-for="(letter, index) in splittedBrideFirstName"
          :key="index"
        >
          {{ letter }}
        </span>
      </span>
      <br />
      <span
        class="ml3"
        style="
          font-family: MsMadi, sans-serif;
          font-size: 33px;
          color: hsl(30, 25%, 53%);
        "
      >
        <span class="letter">&amp;</span>
      </span>
      <br />
      <span
        class="ml3"
        style="font-family: Rushtick, sans-serif; font-size: 45px"
      >
        <span
          class="letter"
          v-for="(letter, index) in splittedGroomFirstName"
          :key="index"
        >
          {{ letter }}
        </span>
      </span>
    </p>
  </HomeTitle>
</template>
