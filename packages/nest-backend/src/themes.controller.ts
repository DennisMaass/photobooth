import { Controller, Get, Post } from '@nestjs/common';
import { readFileSync, existsSync, copyFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
@Controller('themes')
export class ThemesController {
  themes = [];

  constructor(private configService: ConfigService) {
    this.initThemes();
  }

  initThemes(): void {
    const userDataPath = this.configService.get<string>('USER_DATA_PATH');
    const themesPath = `${userDataPath}/themes.json`;
    if (!existsSync(themesPath)) {
      console.info('No themes found, copying default themes');

      const defaultThemes = './assets/defaultThemes.json';
      if (existsSync(defaultThemes)) {
        copyFileSync(defaultThemes, themesPath);
      } else {
        console.error('No default themes found');
      }
    }
    try {
      const themeFile = readFileSync(`${userDataPath}/themes.json`, {
        encoding: 'utf8',
      });
      this.themes = JSON.parse(themeFile).themes;
    } catch (e) {
      console.error(e);
    }
  }

  @Post('/')
  addTheme(theme: any) {
    console.debug('[ThemesController][addTheme] theme', theme);
  }

  @Get('/')
  getThemes() {
    return this.themes;
  }
}
