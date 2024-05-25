export type Theme = {
    id: string;
    name: string;
    topic: string;
    wallpaper: boolean;
    wallpaperImage: string;
    animation?: string;
    textColor: string;
    backgroundColor: string;
    baseButtonBackground: string;
    baseButtonBackgroundActive: string;
    fotoTextFont: string;
    headerColor: string;
    fotoText?: string;
    custom: {
      [key: string]: string;
    }
  };