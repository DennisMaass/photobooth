import { Controller, Get, Post } from '@nestjs/common';

@Controller('themes')
export class ThemesController {
  @Post('/')
  addTheme(theme: any) {
    console.debug('[ThemesController][addTheme] theme', theme);
  }

  @Get('/')
  getThemes() {
    return [
      {
        id: 'christmas_1',
        name: 'Weihnachten',
        topic: 'christmas',
        wallpaper: true,
        wallpaperImage: 'christmas-light.jpg',
        animation: 'snowflakes',
        textColor: '#2c3e50',
        baseButtonBackground: '#DAA861',
        baseButtonBackgroundActive: '#DAA861',
        backgroundColor: 'transparent',
        fotoTextFont: 'Rushtick',
        headerColor: 'light',
        fotoText: 'Frohe Weihnachten',
      },

      {
        id: 'wedding_1',
        name: 'Hochzeit',
        topic: 'wedding',
        wallpaper: false,
        wallpaperImage: 'boho_frame_square.jpg',
        animation: undefined,
        textColor: '#2c3e50',
        baseButtonBackground: '#a58769',
        baseButtonBackgroundActive: '#b8a189',
        backgroundColor: 'transparent',
        fotoTextFont: 'Fira Sans',
        headerColor: 'light',
      },
      {
        id: 'newyear_1',
        name: 'Silvester',
        topic: 'new-years-eve',
        wallpaper: true,
        wallpaperImage: 'newyear_1.jpg',
        animation: 'fireworks',
        textColor: '#2c3e50',
        baseButtonBackground: '#DAA861',
        baseButtonBackgroundActive: '#DAA861',
        backgroundColor: 'transparent',
        fotoTextFont: 'Rushtick',
        headerColor: 'black',
      },
      {
        id: 'birthday_1',
        name: 'Geburtstag',
        topic: 'birthday',
        wallpaper: true,
        wallpaperImage: 'birthday-1-klein.webp',
        animation: 'confetti',
        textColor: '#2c3e50',
        baseButtonBackground: '#DAA861',
        baseButtonBackgroundActive: '#DAA861',
        backgroundColor: 'transparent',
        fotoTextFont: 'NothernLight',
        headerColor: 'light',
      },
    ];
  }
}
