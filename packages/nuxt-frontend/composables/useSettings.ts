import type { UserSettings } from "@/types/user-settings.type";

const userSettings = ref<UserSettings>({
  global: {
    counter: 5,
    showPreview: true,
    printerEnabled: true,
    selectedTheme: 'weeding_3',
  },
  themes: {
    global: {
      animation: true,
      people: [],
    },
  },
});


export default () => {

  const config = useRuntimeConfig();

  async function init() {
    await getUserSettings()
  };

  async function setUserSettings(settings: UserSettings) {
    userSettings.value = settings;

    const BASE_URL = `${config.public.backend}/settings/user`;
    await $fetch(`${BASE_URL}/`, {
      method: "POST",
      body: settings,
    });
  }

  async function getUserSettings(): Promise<UserSettings> {
    const BASE_URL = `${config.public.backend}/settings/user`;
    userSettings.value = await $fetch(`${BASE_URL}/`);
    return userSettings.value;
  }

  return {
    userSettings,
    setUserSettings,
    getUserSettings,
    init,
  };
};
