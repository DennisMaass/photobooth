<script lang="ts" setup>
import HomeTitle from "@/components/HomeTitle.vue";
import useThemes from "@/composables/useThemes";

const { people, selectedTheme, fontAnimationEnabled } = useThemes();

const firstPerson = people.value[0];
const secondPerson = people.value[1];

let splittedFirstName: Array<string> = [];
let splittedSecondName: Array<string> = [];

if (firstPerson?.firstName) {
  splittedFirstName = firstPerson.firstName.split("");
}
if (secondPerson?.firstName) {
  splittedSecondName = secondPerson.firstName.split("");
}
</script>
<template>
  <img
    class="image"
    :src="'/wallpaper/' + selectedTheme.wallpaperImage"
    alt="event image"
  />
  <HomeTitle class="home__title">
    <div v-if="fontAnimationEnabled">
      <span class="name-letter ml3">
        <span
          class="letter"
          v-for="(letter, index) in splittedFirstName"
          :key="index"
        >
          {{ letter }}
        </span>
      </span>
      <br />
      <span class="and-letter ml3">
        <span class="letter">&amp;</span>
      </span>
      <br />
      <span class="name-letter ml3">
        <span
          class="letter"
          v-for="(letter, index) in splittedSecondName"
          :key="index"
        >
          {{ letter }}
        </span>
      </span>
    </div>
    <div v-else>
      <div class="name-letter">
        {{firstPerson.firstName}}
      </div>
      <br />
      <span class="and-letter">
        <span>&amp;</span>
      </span>
      <br />
      <div class="name-letter">
        {{secondPerson.firstName}}
      </div>
    </div>
  </HomeTitle>
</template>

<style>
.and-letter {
  font-family: var(--and-letter-font), sans-serif;
  font-size: var(--and-letter-size);
  color: var(--and-letter-color);
}

.name-letter {
  font-family: var(--name-letter-font), sans-serif;
  font-size: var(--name-letter-size);
  color: var(--name-letter-color);
}

.letter {
  display: inline-block;
  opacity: 0;
  letter-spacing: -8px;
}
</style>
