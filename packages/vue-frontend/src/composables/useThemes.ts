import { onMounted, ref, watch, computed } from "vue";
import { useLocalStorage, useCssVar } from "@vueuse/core";
import Snowflakes from "magic-snowflakes";
import { Fireworks } from "fireworks-js";
import { type Container, tsParticles } from "tsparticles-engine";
import { confetti } from "@/particleOptions";
import { loadFull } from "tsparticles";
import { useRoute } from "vue-router";
import { ofetch } from "ofetch";
import { consola } from "consola";
import useSettings from "@/composables/useSettings";

import type { Ref } from "vue";
import type { Person } from "@/types/person.type";
import type { Theme } from "@/types/theme.type";

const company = ref("")
const fotoText = ref("")
const animationEnabled = useLocalStorage("animationEnabled", false);
const fontAnimationEnabled = useLocalStorage("fontAnimationEnabled", true);
const printWithWatermark = useLocalStorage("printWithWatermark", false);

/* const newThemeType = {
  id: "wedding1",
  name: "Hochzeit",
  topic: "wedding",
  animation: undefined,
  general: {
    header: { color: "light" },
    background: { color: "transparent" },
    text: {
      color: "#2c3e50",
      font: "Fira Sans",
    },
    button: {
      background: {
        normal: "#a58769",
        active: "#b8a189",
      },
      color: "#2c3e50",
    },
  },
  views: {
    home: {
      image: {
        wallpaper: false,
        name: "boho_frame_square.jpg",
      },
    },
    result: {
      text: {
        value: "",
        font: "Fira Sans",
      },
    },
  },
}; */

const themes = ref<Array<Theme>>([]);

const snowflakes: Ref<Snowflakes | undefined> = ref();
const fireworks: Ref<Fireworks | undefined> = ref();
const particles: Ref<Container | undefined> = ref();

export default () => {
  const { setUserSettings, userSettings } = useSettings();

  const selectedThemeId = computed(() => userSettings.value.global.selectedTheme);
  const selectedTheme = computed(() => themes.value.find((t) => t.id === selectedThemeId.value) || themes.value[0]);

  const people = computed(() => userSettings.value.themes.global.people);

  function removePerson(person: Person) {
    const newPeople = people.value.filter((p) => p.firstName !== person.firstName || p.lastName !== person.lastName);

    const newUserSettings = { ...userSettings.value };
    newUserSettings.themes.global.people = newPeople;
    setUserSettings(newUserSettings);
  }

  function addPerson(person: Person) {
    const newUserSettings = { ...userSettings.value };
    newUserSettings.themes.global.people.push(person);
    setUserSettings(userSettings.value);
  }

  function setCompany(value: string) {
    company.value = value;
  }

  function findTheme(id: string) {
    return themes.value.find((t) => t.id === id);
  }

  function setCssVars(theme: Theme) {
    const body = document.querySelector("body")

    const textColorVar = useCssVar("--text-color", body);
    const baseButtonBackgroundActiveCSS = useCssVar(
      "--base-button-background-active",
      body
    );
    const baseButtonBackgroundCSS = useCssVar("--base-button-background", body);
    const backgroundColorVar = useCssVar("--background-color", body);

    document.documentElement.dataset.theme = theme.headerColor;
    textColorVar.value = theme.textColor;
    backgroundColorVar.value = theme.backgroundColor;
    baseButtonBackgroundCSS.value = theme.baseButtonBackground;
    baseButtonBackgroundActiveCSS.value = theme.baseButtonBackgroundActive;

    if (theme.custom?.andLetterSize) {
      const andLetterSizeVar = useCssVar("--and-letter-size", body);
      andLetterSizeVar.value = theme.custom.andLetterSize;
      const andLetterColorVar = useCssVar("--and-letter-color", body);
      andLetterColorVar.value = theme.custom.andLetterColor;
      const andLetterFontVar = useCssVar("--and-letter-font", body);
      andLetterFontVar.value = theme.custom.andLetterFont;

      const nameLetterSizeVar = useCssVar("--name-letter-size", body);
      nameLetterSizeVar.value = theme.custom.nameLetterSize;
      const nameLetterColorVar = useCssVar("--name-letter-color", body);
      nameLetterColorVar.value = theme.custom.nameLetterColor;
      const nameLetterFontVar = useCssVar("--name-letter-font", body);
      nameLetterFontVar.value = theme.custom.nameLetterFont;
    }
  }

  function setTheme(id: string) {
    const themeObj = findTheme(id);
    if (!themeObj) {
      consola.error("theme not found");
      return;
    }

    userSettings.value.global.selectedTheme = themeObj.id;
    setUserSettings(userSettings.value);

    if (animationEnabled.value && !themeObj.animation) {
      animationEnabled.value = false
    }

    if (!fotoText.value && themeObj.fotoText) {
      fotoText.value = themeObj.fotoText;
    }
    consola.info("setTheme", themeObj);
    setCssVars(themeObj)
  }

  const route = useRoute();

  async function getThemes(): Promise<Array<Theme>> {
    const BASE_URL = `${import.meta.env.VITE_BACKEND}/themes`;
    return await ofetch(`${BASE_URL}/`);
  }

  async function init() {
    onMounted(() => {
      watch(
        [animationEnabled, selectedTheme, route],
        () => {
          switchAnimation();
        },
        { immediate: true }
      );
    });

    themes.value = await getThemes();

    watch(
      userSettings,
      (newVal) => {
        if (!newVal) {
          return;
        }

        const newSelectedTheme = newVal.global.selectedTheme;
        if (newSelectedTheme !== selectedThemeId.value) {
          setTheme(newSelectedTheme);
        }

        setCssVars(selectedTheme.value);
      }, { immediate: true }
    );

    const currentAnimation = computed(() => {
      if (snowflakes.value) {
        return "snowflakes";
      } else if (fireworks.value) {
        return "fireworks";
      } else if (particles.value) {
        return "confetti";
      }
      return undefined;
    });

    function stopAnimation() {
      if (snowflakes.value) {
        snowflakes.value.destroy();
        snowflakes.value = undefined;
      } else if (fireworks.value) {
        fireworks.value.stop(true);
        fireworks.value = undefined;
      } else if (particles.value) {
        particles.value.destroy();
        particles.value = undefined;
      }
    }

    async function startAnimation(animation: string) {
      const themeAnimationLayer = document.querySelector(
        "#theme-animation-layer"
      ) as HTMLElement;

      if (!themeAnimationLayer) {
        consola.error("themeAnimationLayer is null");
        return;
      }

      if (animation === "snowflakes") {
        snowflakes.value = new Snowflakes({ container: themeAnimationLayer });
        snowflakes.value.start();
      } else if (animation === "fireworks") {
        fireworks.value = new Fireworks(themeAnimationLayer, {
          hue: { min: 10, max: 45 },
          intensity: 10,
          delay: { min: 70, max: 90 },
        });
        fireworks.value.start();
      } else if (animation === "confetti") {
        await loadFull(tsParticles);
        particles.value = await tsParticles.load(
          "theme-animation-layer",
          confetti
        );
      }
    }

    function switchAnimation() {
      if (
        route.name === "Home" ||
        route.name === "Result" ||
        route.name === "Config" ||
        route.name === "Download"
      ) {
        const animation = selectedTheme.value?.animation;

        if (
          !animationEnabled.value ||
          !animation ||
          animation !== currentAnimation.value
        ) {
          stopAnimation();
        }
        if (
          animationEnabled.value &&
          animation &&
          animation !== currentAnimation.value
        ) {
          startAnimation(animation);
        }
      } else {
        stopAnimation();
      }
    }
  }

  return {
    init,
    setTheme,
    selectedTheme,
    selectedThemeId,
    animationEnabled,
    fontAnimationEnabled,
    printWithWatermark,
    themes,
    people,
    removePerson,
    addPerson,
    company,
    setCompany,
    fotoText,
  };
};
