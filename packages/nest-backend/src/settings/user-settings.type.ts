import type { Person } from './person.type';

export type UserSettings = {
    global: {
      counter: number;
      showPreview: boolean;
      printerEnabled: boolean;
      selectedTheme: string;
    };
    themes: {
      global: {
        animation: boolean;
        date?: Date;
        people: Array<Person>;
        photoText?: string;
      };
      customs?: {
        [key: string]: {
          [key: string]: string;
        };
      };
    };
  };
