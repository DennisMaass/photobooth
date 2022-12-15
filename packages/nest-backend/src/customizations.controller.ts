import { Controller, Get } from '@nestjs/common';

@Controller('customizations')
export class CustomizationsController {
  @Get('/')
  getCustomizations() {
    return {
      printerEnabled: false,
    };
  }
}
