import { ref, } from "vue";
import { ofetch } from "ofetch";

import type { UserSettings } from "@/types/user-settings.type";

const userSettings = ref<UserSettings>({
  global: {
    counter: 5,
    showPreview: true,
    printerEnabled: true,
    selectedTheme: 'baby_1',
  },
  themes: {
    global: {
      animation: true,
      people: [],
    },
  },
});


export default () => {

  async function init() {
    await getUserSettings()
  };

  async function setUserSettings(settings: UserSettings) {
    userSettings.value = settings;

    const BASE_URL = `${import.meta.env.VITE_BACKEND}/settings/user`;
    await ofetch(`${BASE_URL}/`, {
      method: "POST",
      body: settings,
    });
  }

  async function getUserSettings(): Promise<UserSettings> {
    const BASE_URL = `${import.meta.env.VITE_BACKEND}/settings/user`;
    userSettings.value = await ofetch(`${BASE_URL}/`);
    return userSettings.value;
  }

  return {
    userSettings,
    setUserSettings,
    getUserSettings,
    init,
  };
};
