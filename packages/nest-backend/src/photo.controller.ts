import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';

@Controller('photos')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService,
    private configService: ConfigService,
  ) {}

  @Post()
  async take(): Promise<{ id: string }> {
    console.debug('[PhotoController][take]')

    const eventName = this.configService.get<string>('EVENT_NAME');
    const timestamp = Date.now();
    const id = `${eventName}_${timestamp}`;

    const pathToOriginalsFolder =
      this.configService.get<string>('ORIGINAL_PATH');
    const originalName = `${id}.jpg`;
    const pathToOriginalPhoto = `${pathToOriginalsFolder}/${originalName}`;

    try {
      console.debug('[PhotoController][take] take pathToOriginalPhoto',pathToOriginalPhoto)
      await this.photoService.take(pathToOriginalPhoto);

      const pathToPreviewFolder = this.configService.get<string>('PREVIEW_PATH');
      const previewName = `${id}.webp`;
      const pathToPreviewPhoto = `${pathToPreviewFolder}/${previewName}`;
      await sharp(pathToOriginalPhoto)
        .resize({ width: 1728  })
        .toFile(pathToPreviewPhoto);
    } catch (error) {
      console.error('[PhotoController][take] resize print',error)
    }

    return { id };
  }

  @Post('/print')
  async print(@Body('id') id: string): Promise<void> {
    console.debug('[PhotoController][print] id',id)

    const pathToOriginalsFolder = this.configService.get<string>('ORIGINAL_PATH');
    const originalName = `${id}.jpg`;
    const pathToOriginalPhoto = `${pathToOriginalsFolder}/${originalName}`;

    const pathToPrintFolder = this.configService.get<string>('PRINT_PATH');
    const printName = `${id}.jpg`;
    const pathToPrintPhoto = `${pathToPrintFolder}/${printName}`;
    await sharp(pathToOriginalPhoto).resize({ width: 1728 }).toFile(pathToPrintPhoto);

    setTimeout(async ()=>{
      await this.photoService.print(pathToPrintPhoto);
    },2000)

  }

  @Get()
  getAll(): { ids: string[] } {
    console.debug('[PhotoController][getAll]')
    return this.photoService.getAll();
  }

  @Delete()
  remove(@Body('id') id: string) {
    console.debug('[PhotoController][remove] id',id)
    this.photoService.remove(id);
  }
}
