<script lang="ts" setup>
import HomeTitle from "@/components/HomeTitle.vue";
import useTheme from "@/composables/useTheme";

const { people, wallpaperImage } = useTheme();
if (people.value.length < 2) {
  throw new Error("You need to have at least 2 people in the theme");
}
const firstPerson = people.value[0];
const secondPerson = people.value[1];
if (!firstPerson.firstName || !secondPerson.firstName) {
  throw new Error("You need to have a first name for each person");
}
const splittedFirstName = firstPerson.firstName.split("");
const splittedSecondName = secondPerson.firstName.split("");
</script>
<template>
  <img class="image" :src="'/wallpaper/' + wallpaperImage" alt="event image" />
  <HomeTitle class="home__title">
    <p>
      <span
        class="ml3"
        style="font-family: Rushtick, sans-serif; font-size: 45px"
      >
        <span
          class="letter"
          v-for="(letter, index) in splittedFirstName"
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
          v-for="(letter, index) in splittedSecondName"
          :key="index"
        >
          {{ letter }}
        </span>
      </span>
    </p>
  </HomeTitle>
</template>
