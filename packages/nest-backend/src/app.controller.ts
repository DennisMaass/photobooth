import { Controller, Delete, Get, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';
const sharp = require('sharp');

@Controller()
export class AppController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  async takePhoto(): Promise<{ path:string }> {
    const allPictures = this.photoService.getAll();
    const timestamp = Date.now()
    const newName = `D-R-Hochzeit_${timestamp}`
    const path = `./photos/${newName}.jpg`;

    await this.photoService.take(path);

    sharp(path).toFile(`./print/${newName}.webp`);

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
