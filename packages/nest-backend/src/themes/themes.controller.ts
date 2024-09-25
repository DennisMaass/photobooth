import { Controller, Get, Post } from '@nestjs/common';
import { readFileSync, existsSync, copyFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import { consola } from 'consola';
import { destr } from 'destr';

type Theme = {
  id: string;
  name: string;
  topic: string;
  animation: string;
  textColor: string;
  baseButtonBackground: string;
  baseButtonBackgroundActive: string;
  backgroundColor: string;
  fotoTextFont: string;
  fotoText: string;
  headerColor: string;
  custom: Record<string, string>;
};

type Defaults = {
  themes: Array<Theme>;
};

@Controller('themes')
export class ThemesController {
  themes: Array<Theme> = [];
  currenThemeId = 'baby_1';

  constructor(private configService: ConfigService) {
    this.initThemes();
  }

  @Get('/')
  getThemes() {
    return this.themes;
  }

  @Get('/current')
  getCurrentTheme() {
    const current = this.themes.find((theme) => theme.id === this.currenThemeId);
    return current.id;
  }

  @Post('/current')
  setTheme(id: string) {
    this.currenThemeId = id;
  }

  private initThemes(): void {
    const userDataPath = this.configService.get<string>('USER_DATA_PATH');
    const themesPath = `${userDataPath}/themes.json`;
    if (!existsSync(themesPath)) {
      consola.info('No themes found, copying default themes');

      const defaultThemes = './assets/defaultThemes.json';
      if (existsSync(defaultThemes)) {
        copyFileSync(defaultThemes, themesPath);
      } else {
        consola.error('No default themes found');
      }
    }
    try {
      const themeFile = readFileSync(`${userDataPath}/themes.json`, {
        encoding: 'utf8',
      });
      this.themes = destr<Defaults>(themeFile).themes;
    } catch (e) {
      consola.error(e);
    }
  }
}
