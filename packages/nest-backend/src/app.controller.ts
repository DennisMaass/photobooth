import { Controller, Get, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';
const sharp = require('sharp');

@Controller()
export class AppController {
  constructor(
    private readonly photoService: PhotoService,
  ) {}

  @Post()
  async takePhoto(): Promise<string> {
    const allPictures = this.photoService.getAll();
    const newName = allPictures.length + 1;
    const path = `./photos/${newName}.jpg`;

    await this.photoService.take(path);

    sharp(path)
      .toFile(`./photos/${newName}.webp`, (err, info) => {
        console.log();
      })


    const roundedCorners = Buffer.from(
      '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
    );


    sharp(path)
      .resize(500)
      .composite([{
        input: roundedCorners,
        blend: 'dest-in'
      }])
      .toFile(`./photos/${newName}_rounded.webp`, (err, info) => {
        console.log();
      })

    return path
  }


  @Get()
  getAllTakenPhotos(): [string] {
    return this.photoService.getAll();
  }
}
