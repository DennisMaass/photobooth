import { ref, watch } from "vue";
import { useLocalStorage, useCssVar } from "@vueuse/core";
import type { RemovableRef } from "@vueuse/core";

// wedding gold:
// base-button hsl(30, 25%, 53%);
// base-button-active hsl(30, 25%, 63%);

const headerColor = ref("dark");
const version = 4;
const wakelockActive = ref(false);
const topic = useLocalStorage("topic", "christmas");

const enabledPrinter = useLocalStorage("enabledPrinter", false);
const backgroundColor = useLocalStorage("backgroundColor", "black");
const textColor = useLocalStorage("textColor", "white");

const brideFirstName = useLocalStorage("brideFirstName", "");
const groomFirstName = useLocalStorage("groomFirstName", "");

const personFirstName = useLocalStorage("personFirstName", "");
const personLastName = useLocalStorage("personLastName", "");
const companyName = useLocalStorage("companyName", "diva-e");
const fotoText = useLocalStorage("fotoText", "diva-e Weihnachtfeier");
const fotoTextFont = useLocalStorage("fotoTextFont", "Fira Sans");

const baseButtonBackground = useLocalStorage("baseButtonBackground", "#e6007e");
const baseButtonBackgroundActive = useLocalStorage(
  "baseButtonBackgroundActive",
  "#e6007e"
);

export default function useConfig() {
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
  }

  return {
    init,
    version,
    headerColor,
    wakelockActive,
    brideFirstName,
    groomFirstName,
    personFirstName,
    personLastName,
    companyName,
    fotoTextFont,
    fotoText,
    enabledPrinter,
    backgroundColor,
    textColor,
    topic,
    baseButtonBackground,
    baseButtonBackgroundActive,
  };
}
