import { Controller, Delete, Get, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ConfigService } from '@nestjs/config';
const sharp = require('sharp');

@Controller()
export class AppController {
  constructor(private readonly photoService: PhotoService,private configService: ConfigService) {}

  @Post()
  async takePhoto(): Promise<{ path:string }> {
    const eventName=this.configService.get<string>('EVENT_NAME');
    const timestamp = Date.now()
    const newName = `${eventName}_${timestamp}`
    const path = `./photos/${newName}.jpg`;

    await this.photoService.take(path);

    const pathToPrintFolder=this.configService.get<string>('PRINT_PATH');
    sharp(path).toFile(`${pathToPrintFolder}/${newName}.webp`);

    const pathToPreviewFolder=this.configService.get<string>('PREVIEW_PATH');
    sharp(path).toFile(`${pathToPreviewFolder}/${newName}.webp`);

    return { path };
  }

  @Get()
  getAllTakenPhotos(): [string] {
    return this.photoService.getAll();
  }

  @Delete()
  deletePhoto() {
    // TODO:
  }
}
