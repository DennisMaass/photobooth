import { ConfigService } from '@nestjs/config';
import { readUser, writeUser } from 'rc9';
import { consola } from 'consola';

import type { UserSettings } from './user-settings.type';
import type { SystemSettings } from './system-settings.type';



export class SettingsService {
  userSettings: UserSettings;
  defaultConfig: UserSettings = {
    global: {
      counter: 5,
      showPreview: true,
      printerEnabled: true,
      selectedTheme: 'wedding_2',
    },
    themes: {
      global: {
        animation: true,
        people: [],
      },
    },
  };

  constructor(private configService: ConfigService) {
    this.userSettings = readUser('user.conf');

    if (!this.userSettings.global) {
      consola.info('[SettingsService] No settings found, copying default settings');

      writeUser(this.defaultConfig, 'user.conf');
      this.userSettings = this.defaultConfig;
    }
  }

  getSystemSettings(): SystemSettings {
    return {
      stage: this.configService.get<string>('STAGE'),
      eventName: this.configService.get<string>('EVENT_NAME'),
      originalPath: this.configService.get<string>('ORIGINAL_PATH'),
      printPath: this.configService.get<string>('PRINT_PATH'),
      previewPath: this.configService.get<string>('PREVIEW_PATH'),
    };
  }

  getUserSettings(): UserSettings {
    return this.userSettings;
  }

  setUserSettings(userSettings: UserSettings) {
    this.userSettings = userSettings;
    writeUser(this.userSettings, 'user.conf');
  }
}
