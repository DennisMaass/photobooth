import { Controller, Get, Post } from '@nestjs/common';
import { readFileSync } from 'fs';
@Controller('themes')
export class ThemesController {
  themes = [];

  constructor() {
    const themeFile = readFileSync('./themes.json', { encoding: 'utf8' });
    this.themes = JSON.parse(themeFile).themes;
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
