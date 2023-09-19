import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';
import { consola } from "consola";

@Controller('photos')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService,
    private configService: ConfigService,
  ) {}

  @Post()
  async take(): Promise<{ id: string }> {
    consola.debug('[PhotoController][take]');

    const eventName = this.configService.get<string>('EVENT_NAME');
    const timestamp = Date.now();
    const id = `${eventName}_${timestamp}`;

    const pathToOriginalsFolder =
      this.configService.get<string>('ORIGINAL_PATH');
    const originalName = `${id}.jpg`;
    const pathToOriginalPhoto = `${pathToOriginalsFolder}/${originalName}`;

    try {
      consola.debug(
        '[PhotoController][take] pathToOriginalPhoto',
        pathToOriginalPhoto,
      );
      await this.photoService.take(pathToOriginalPhoto);

      const pathToPreviewFolder =
        this.configService.get<string>('PREVIEW_PATH');
      const previewName = `${id}.webp`;
      const pathToPreviewPhoto = `${pathToPreviewFolder}/${previewName}`;
      await sharp(pathToOriginalPhoto)
        .resize({ width: 1728 })
        .toFile(pathToPreviewPhoto);
    } catch (error) {
      consola.error('[PhotoController][take] resize print', error);
    }

    return { id };
  }

  @Get()
  getAll(): { ids: string[] } {
    consola.debug('[PhotoController][getAll]');
    return this.photoService.getAll();
  }

  @Delete()
  remove(@Body('id') id: string) {
    consola.debug('[PhotoController][remove] id', id);
    this.photoService.remove(id);
  }
}
