import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';

import type { PrinterStatus } from './printer.service';

@Controller('printer')
export class PrinterController {
  constructor(
    private readonly printerService: PrinterService,
    private configService: ConfigService,
  ) {}

  @Get('/state')
  async getPrinterState(): Promise<PrinterStatus> {
    console.debug('[PhotoController][getPrinterState]');

    const status = await this.printerService.getPrinterState();
    console.debug('[PhotoController][getPrinterState] status', status);

    return status;
  }

  @Post('/print')
  async print(@Body('id') id: string): Promise<PrinterStatus> {
    console.debug('[PhotoController][print] id', id);

    const status = await this.printerService.getPrinterState();
    console.debug('[PhotoController][print] status', status);

    if (status.code !== 'ready') {
      return status;
    }

    const pathToOriginalsFolder =
      this.configService.get<string>('ORIGINAL_PATH');
    const originalName = `${id}.jpg`;
    const pathToOriginalPhoto = `${pathToOriginalsFolder}/${originalName}`;

    const pathToPrintFolder = this.configService.get<string>('PRINT_PATH');
    const printName = `${id}.jpg`;
    const pathToPrintPhoto = `${pathToPrintFolder}/${printName}`;
    await sharp(pathToOriginalPhoto)
      .resize({ width: 1728 })
      .toFile(pathToPrintPhoto);

    setTimeout(async () => {
      await this.printerService.print(pathToPrintPhoto);
    }, 2000);

    return status;
  }
}
