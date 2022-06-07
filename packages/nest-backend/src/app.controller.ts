import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';

@Controller('photos')
export class AppController {
  constructor(
    private readonly photoService: PhotoService,
    private configService: ConfigService,
  ) {}

  @Post()
  async take(): Promise<{ id: string }> {
    console.debug('[AppController][take]')

    const eventName = this.configService.get<string>('EVENT_NAME');
    const timestamp = Date.now();
    const id = `${eventName}_${timestamp}`;

    const pathToOriginalsFolder =
      this.configService.get<string>('ORIGINAL_PATH');
    const originalName = `${id}.jpg`;
    const pathToOriginalPhoto = `${pathToOriginalsFolder}/${originalName}`;
    try {
      console.debug('[AppController][take] take pathToOriginalPhoto',pathToOriginalPhoto)
      await this.photoService.take(pathToOriginalPhoto);
    } catch (error) {
      console.error('[AppController][take] error',error)
    }

    try {
      const pathToPrintFolder = this.configService.get<string>('PRINT_PATH');
      const printName = `${id}.jpg`;
      const pathToPrintPhoto = `${pathToPrintFolder}/${printName}`;
      sharp(pathToOriginalPhoto).resize({ width: 500 }).toFile(pathToPrintPhoto);
    } catch (error) {
      console.error('[AppController][take] error',error)
    }

    try {
      const pathToPreviewFolder = this.configService.get<string>('PREVIEW_PATH');
      const previewName = `${id}.webp`;
      const pathToPreviewPhoto = `${pathToPreviewFolder}/${previewName}`;
      await sharp(pathToOriginalPhoto)
        .resize({ width: 1920  })
        .toFile(pathToPreviewPhoto);
    } catch (error) {
      console.error('[AppController][take] error',error)
    }

    return { id };
  }

  @Post('/print')
  async print(@Body('id') id: string): Promise<void> {
    console.debug('[AppController][print] id',id)

    const pathToPrintFolder = this.configService.get<string>('PRINT_PATH');
    const printName = `${id}.webp`;
    const pathToPrintPhoto = `${pathToPrintFolder}/${printName}`;

    await this.photoService.print(pathToPrintPhoto);
  }

  @Get()
  getAll(): { ids: string[] } {
    console.debug('[AppController][getAll]')
    return this.photoService.getAll();
  }

  @Delete()
  remove(@Body('id') id: string) {
    console.debug('[AppController][remove] id',id)
    this.photoService.remove(id);
  }
}
