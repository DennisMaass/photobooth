import { Controller, Get, Post } from '@nestjs/common';
import { readFileSync, existsSync, copyFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import { consola } from "consola";
import { destr } from "destr";


type Theme = {
  name: string;
  colors: {
    primary: string;
    secondary: string;
  }
}

type Defaults=  {
  themes: Array<Theme>;
};

@Controller('themes')
export class ThemesController {
  themes = [];
  currenThemeId = 'wedding_1';

  constructor(private configService: ConfigService) {
    this.initThemes();
  }

  initThemes(): void {
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

  @Post('/')
  addTheme(theme: any) {
    consola.debug('[ThemesController][addTheme] theme', theme);
  }

  @Get('/')
  getThemes() {
    return this.themes;
  }

  @Get('/current')
  getCurrentTheme() {
    return this.themes.find((theme) => theme.name === this.currenThemeId);
  }

  @Post('/current')
  setTheme(id: string) {
    this.currenThemeId = id;
  }

}
