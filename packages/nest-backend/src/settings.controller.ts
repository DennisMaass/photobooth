import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('settings')
export class SettingsController {
  constructor(private configService: ConfigService) {}

  @Get('/')
  getInfos(){
    return {
      stage: this.configService.get<string>('STAGE'),
      eventName: this.configService.get<string>('EVENT_NAME'),
      originalPath: this.configService.get<string>('ORIGINAL_PATH'),
      printPath: this.configService.get<string>('PRINT_PATH'),
      previewPath: this.configService.get<string>('PREVIEW_PATH'),
    }
  }
}
