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

const wallpaper = ref(true);
const wallpaperImage = ref("christmas-light.jpg");

const headerColor = ref("light");
const topic = useLocalStorage("topic", "christmas");

const backgroundColor = useLocalStorage("backgroundColor", "transparent");
const textColor = useLocalStorage("textColor", "#2c3e50");

const people = useLocalStorage<Person[]>("people", [
  { firstName: "", lastName: "" },
]);

const company = useLocalStorage("company", "");
const fotoText = useLocalStorage("fotoText", "");
const fotoTextFont = useLocalStorage("fotoTextFont", "NothernLight");

const baseButtonBackground = useLocalStorage("baseButtonBackground", "#DAA861");
const baseButtonBackgroundActive = useLocalStorage(
  "baseButtonBackgroundActive",
  "#DAA861"
);

const animation = useLocalStorage("animation", "");

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

const themes = ref<Theme[]>([
  {
    id: "christmas_1",
    name: "Weihnachten",
    topic: "christmas",
    wallpaper: true,
    wallpaperImage: "christmas-light.jpg",
    animation: "snowflakes",
    textColor: "#2c3e50",
    baseButtonBackground: "#DAA861",
    baseButtonBackgroundActive: "#DAA861",
    backgroundColor: "transparent",
    fotoTextFont: "Rushtick",
    headerColor: "light",
    fotoText: "Frohe Weihnachten",
  },

  {
    id: "wedding_1",
    name: "Hochzeit",
    topic: "wedding",
    wallpaper: false,
    wallpaperImage: "boho_frame_square.jpg",
    animation: undefined,
    textColor: "#2c3e50",
    baseButtonBackground: "#a58769",
    baseButtonBackgroundActive: "#b8a189",
    backgroundColor: "transparent",
    fotoTextFont: "Fira Sans",
    headerColor: "light",
  },
  {
    id: "newyear_1",
    name: "Silvester",
    topic: "new-years-eve",
    wallpaper: true,
    wallpaperImage: "newyear_1.jpg",
    animation: "fireworks",
    textColor: "#2c3e50",
    baseButtonBackground: "#DAA861",
    baseButtonBackgroundActive: "#DAA861",
    backgroundColor: "transparent",
    fotoTextFont: "Rushtick",
    headerColor: "black",
  },
  {
    id: "birthday_1",
    name: "Geburtstag",
    topic: "birthday",
    wallpaper: true,
    wallpaperImage: "birthday-1-klein.webp",
    animation: "confetti",
    textColor: "#2c3e50",
    baseButtonBackground: "#DAA861",
    baseButtonBackgroundActive: "#DAA861",
    backgroundColor: "transparent",
    fotoTextFont: "NothernLight",
    headerColor: "light",
  },
]);

const selectedTheme = ref(themes.value[0]);

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
  // current attributes
  topic: RemovableRef<string>;
  wallpaper: RemovableRef<boolean>;
  wallpaperImage: RemovableRef<string>;
  animation?: RemovableRef<string>;
  textColor: RemovableRef<string>;
  baseButtonBackground: RemovableRef<string>;
  baseButtonBackgroundActive: RemovableRef<string>;
  backgroundColor: RemovableRef<string>;
  fotoTextFont: RemovableRef<string>;
  headerColor: RemovableRef<string>;
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

    topic.value = themeObj.topic;
    wallpaper.value = themeObj.wallpaper;
    wallpaperImage.value = themeObj.wallpaperImage;
    animation.value = themeObj.animation;
    textColor.value = themeObj.textColor;
    baseButtonBackground.value = themeObj.baseButtonBackground;
    baseButtonBackgroundActive.value = themeObj.baseButtonBackgroundActive;
    backgroundColor.value = themeObj.backgroundColor;
    fotoTextFont.value = themeObj.fotoTextFont;
    headerColor.value = themeObj.headerColor;
    if (!fotoText.value) {
      fotoText.value = themeObj.fotoText;
    }
  }

  const route = useRoute();

  function init() {
    watch(
      headerColor,
      (value) => {
        document.documentElement.dataset.theme = value;
      },
      { immediate: true }
    );
    const body = document.querySelector("body");
    const el = ref(body);

    const textColorVar = useCssVar("--text-color", el);
    watch(
      textColor,
      (newVal) => {
        textColorVar.value = newVal;
      },
      { immediate: true }
    );

    const backgroundColorVar = useCssVar("--background-color", el);
    watch(
      backgroundColor,
      (newVal) => {
        backgroundColorVar.value = newVal;
      },
      { immediate: true }
    );

    const baseButtonBackgroundCSS = useCssVar("--base-button-background", el);
    watch(
      baseButtonBackground,
      (newVal) => {
        baseButtonBackgroundCSS.value = newVal;
      },
      { immediate: true }
    );

    const baseButtonBackgroundActiveCSS = useCssVar(
      "--base-button-background-active",
      el
    );
    watch(
      baseButtonBackgroundActive,
      (newVal) => {
        baseButtonBackgroundActiveCSS.value = newVal;
      },
      { immediate: true }
    );

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
          delay: { min: 50, max: 70 },
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
        if (!animation || animation !== currentAnimation.value) {
          stopAnimation();
        }
        if (animation && animation !== currentAnimation.value) {
          startAnimation(animation);
        }
      } else {
        stopAnimation();
      }
    }

    onMounted(() => {
      watch(
        [animation, route],
        () => {
          switchAnimation();
        },
        { immediate: true }
      );
    });
  }

  return {
    save,
    init,
    addEmptyPerson,
    removeLastPerson,
    changeTheme,
    animation,
    selectedTheme,
    themes,
    people,
    company,
    wallpaper,
    wallpaperImage,
    headerColor,
    fotoTextFont,
    fotoText,
    backgroundColor,
    textColor,
    topic,
    baseButtonBackground,
    baseButtonBackgroundActive,
  };
};
