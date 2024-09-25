import { ref, } from "vue";
import { ofetch } from "ofetch";

import type { UserSettings } from "@/types/user-settings.type";

const userSettings = ref<UserSettings>({
  global: {
    counter: 5,
    showPreview: true,
    printerEnabled: true,
    selectedTheme: "baby_1",
  },
  themes: {
    global: {
      animation: true,
      people: [],
      photoText: undefined,
      date: undefined,
    },
  },
});

export default () => {
  async function init() {
    await getUserSettings();
  }

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
    const partialSettings = await ofetch<Partial<UserSettings>>(`${BASE_URL}/`);
    userSettings.value = createUserSettings(partialSettings);
    return userSettings.value;
  }

  function createUserSettings(partialSettings: Partial<UserSettings>): UserSettings {
    return {
      global: {
        counter: partialSettings.global?.counter ?? 5,
        showPreview: partialSettings.global?.showPreview ?? true,
        printerEnabled: partialSettings.global?.printerEnabled ?? true,
        selectedTheme: partialSettings.global?.selectedTheme ?? "birthday_1",
      },
      themes: {
        global: {
          animation: partialSettings.themes?.global?.animation ?? true,
          people: partialSettings.themes?.global?.people ?? [],
          photoText: partialSettings.themes?.global?.photoText ?? undefined,
          date: partialSettings.themes?.global?.date ?? undefined,
        },
      },
    };
  }

  return {
    userSettings,
    setUserSettings,
    getUserSettings,
    init,
  };
};
