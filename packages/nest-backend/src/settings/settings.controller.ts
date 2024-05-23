import { Controller, Get, Post, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { consola } from 'consola';

import type { UserSettings } from './user-settings.type';
import type { SystemSettings } from './system-settings.type';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('/system')
  getSystemSettings(): SystemSettings {
    return this.settingsService.getSystemSettings();
  }

  @Get('/user')
  getUserSettings(): UserSettings {
    return this.settingsService.getUserSettings();
  }

  @Post('/user')
  setUserSettings(@Body()userSettings: UserSettings) {
    this.settingsService.setUserSettings(userSettings);
  }
}
