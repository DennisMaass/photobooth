import { onMounted, ref, watch, computed, type Ref } from "vue";
import { useLocalStorage, useCssVar, type RemovableRef } from "@vueuse/core";
import Snowflakes from "magic-snowflakes";
import { Fireworks } from "fireworks-js";
import { type Container, tsParticles } from "tsparticles-engine";
import { confetti } from "@/particleOptions";
import { loadFull } from "tsparticles";
import { useRoute } from "vue-router";

type Theme = {
  id: string;
  name: string;
  topic: string;
  wallpaper: boolean;
  wallpaperImage: string;
  animation?: string;
  textColor: string;
  backgroundColor: string;
  baseButtonBackground: string;
  baseButtonBackgroundActive: string;
  fotoTextFont: string;
  headerColor: string;
  fotoText?: string;
};

type Person = {
  firstName: string;
  lastName: string;
};

const people = useLocalStorage<Person[]>("people", [
  { firstName: "", lastName: "" },
]);
const company = useLocalStorage("company", "");
const fotoText = useLocalStorage("fotoText", "");
const animationEnabled = useLocalStorage("animationEnabled", false);

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

const themes = ref<Theme[]>([]);

const selectedTheme = ref();

const snowflakes: Ref<Snowflakes | undefined> = ref();
const fireworks: Ref<Fireworks | undefined> = ref();
const particles: Ref<Container | undefined> = ref();

type UseTheme = {
  save: () => void;
  init: () => void;
  addEmptyPerson: () => void;
  removeLastPerson: () => void;
  changeTheme: (theme: Theme) => void;
  people: RemovableRef<Person[]>;
  company: RemovableRef<string>;
  themes: RemovableRef<Theme[]>;
  selectedTheme: RemovableRef<Theme>;
  fotoText: RemovableRef<string>;
  animationEnabled: RemovableRef<boolean>;
};

export default (): UseTheme => {
  function addEmptyPerson() {
    people.value.push({ firstName: "", lastName: "" });
  }

  function removeLastPerson() {
    people.value.pop();
  }

  function save() {
    //TODO: implement request
  }

  function findTheme(name: string) {
    return themes.value.find((t) => t.name === name);
  }

  function changeTheme(theme: Theme) {
    const themeObj = findTheme(theme.name);
    if (!themeObj) {
      console.error("theme not found");
      return;
    }
    selectedTheme.value = themeObj;
    animationEnabled.value = themeObj.animation !== undefined;

    if (!fotoText.value) {
      fotoText.value = themeObj.fotoText;
    }

    const body = document.querySelector("body");
    const el = ref(body);

    const textColorVar = useCssVar("--text-color", el);
    const baseButtonBackgroundActiveCSS = useCssVar(
      "--base-button-background-active",
      el
    );
    const baseButtonBackgroundCSS = useCssVar("--base-button-background", el);
    const backgroundColorVar = useCssVar("--background-color", el);

    document.documentElement.dataset.theme = themeObj.headerColor;
    textColorVar.value = themeObj.textColor;
    backgroundColorVar.value = themeObj.backgroundColor;
    baseButtonBackgroundCSS.value = themeObj.baseButtonBackground;
    baseButtonBackgroundActiveCSS.value = themeObj.baseButtonBackgroundActive;
  }

  const route = useRoute();

  async function getThemes() {
    const BASE_URL = `${import.meta.env.VITE_BACKEND}/themes`;
    const response = await fetch(`${BASE_URL}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
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
    selectedTheme.value = themes.value[0];

    watch(
      selectedTheme,
      (newVal) => {
        if (!newVal) {
          console.error("newVal is null");
          return;
        }
        changeTheme(newVal);
      },
      { immediate: true }
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
        console.error("themeAnimationLayer is null");
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
        const animation = selectedTheme.value.animation;

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
    save,
    init,
    addEmptyPerson,
    removeLastPerson,
    changeTheme,
    selectedTheme,
    animationEnabled,
    themes,
    people,
    company,
    fotoText,
  };
};
