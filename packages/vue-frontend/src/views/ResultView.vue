<template>
  <div class="result">
    <div class="result__content-wrapper">
      <div class="result__back-wrapper">
        <RouterLink to="/home" class="result__back button normalize">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#fff"
          >
            <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M194.6 32H317.4C338.1 32 356.4 45.22 362.9 64.82L373.3 96H448C483.3 96 512 124.7 512 160V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V160C0 124.7 28.65 96 64 96H138.7L149.1 64.82C155.6 45.22 173.9 32 194.6 32H194.6zM256 384C309 384 352 341 352 288C352 234.1 309 192 256 192C202.1 192 160 234.1 160 288C160 341 202.1 384 256 384z"
            /></svg
        ></RouterLink>
      </div>
      <div class="result__image-wrapper">
        <img class="result__photo" :src="imageUrl" />
      </div>
      <div class="result__actions-wrapper">
        <RouterLink to="/gallery" class="button normalize">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="#fff"
          >
            <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M512 32H160c-35.35 0-64 28.65-64 64v224c0 35.35 28.65 64 64 64H512c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM528 320c0 8.822-7.178 16-16 16h-16l-109.3-160.9C383.7 170.7 378.7 168 373.3 168c-5.352 0-10.35 2.672-13.31 7.125l-62.74 94.11L274.9 238.6C271.9 234.4 267.1 232 262 232c-5.109 0-9.914 2.441-12.93 6.574L176 336H160c-8.822 0-16-7.178-16-16V96c0-8.822 7.178-16 16-16H512c8.822 0 16 7.178 16 16V320zM224 112c-17.67 0-32 14.33-32 32s14.33 32 32 32c17.68 0 32-14.33 32-32S241.7 112 224 112zM456 480H120C53.83 480 0 426.2 0 360v-240C0 106.8 10.75 96 24 96S48 106.8 48 120v240c0 39.7 32.3 72 72 72h336c13.25 0 24 10.75 24 24S469.3 480 456 480z"
            />
          </svg>
        </RouterLink>
        <RouterLink to="/mail" class="button normalize">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#fff"
          >
            <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M448 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V128C512 92.65 483.3 64 448 64zM64 112h384c8.822 0 16 7.178 16 16v22.16l-166.8 138.1c-23.19 19.28-59.34 19.27-82.47 .0156L48 150.2V128C48 119.2 55.18 112 64 112zM448 400H64c-8.822 0-16-7.178-16-16V212.7l136.1 113.4C204.3 342.8 229.8 352 256 352s51.75-9.188 71.97-25.98L464 212.7V384C464 392.8 456.8 400 448 400z"
            />
          </svg>
        </RouterLink>
        <RouterLink to="/print" class="button normalize"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#fff"
          >
            <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z"
            /></svg
        ></RouterLink>
        <!-- <router-link to="/collage" class="button normalize"
          >NEW COLLAGE</router-link
        >
        <router-link to="/filter" class="button normalize"
          >IMAGE FILTER</router-link
        > -->
        <RouterLink to="/delete" class="button normalize">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="#fff"
          >
            <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
            />
          </svg>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  imageUrl: { type: String, required: true },
});

// const route = useRoute();
// console.log("context", route);
// const imageUrl = ref();
// // console.log("imageUrl", imageUrl.value);
// return { imageUrl };
</script>

<style>
.result {
  height: 100vh;
  background-color: #b2c3b5;
}
.result__content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 2rem);
  padding: 1rem;
}

.result__back-wrapper {
  display: flex;
  justify-content: flex-end;
}

.result__image-wrapper {
  flex: 1;
  padding: 3rem;
}

.result__photo {
  width: auto;
  height: 100%;
  aspect-ratio: 3/2;
}

.result__back {
  margin: 1rem;
}

.result__actions-wrapper {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}
</style>
