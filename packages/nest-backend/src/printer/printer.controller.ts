import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { ConfigService } from '@nestjs/config';

import type { PrinterStatus } from './printer.service';
import SharpPhotoManipulationService from '../photoManipulation/sharpPhotoManipulation.service.js';
import SharpFileHandlingService from '../filehandling/sharpFileHandling.service.js';
import { consola } from 'consola';

@Controller('printer')
export class PrinterController {
  constructor(
    private readonly printerService: PrinterService,
    private readonly fileHandlingService: SharpFileHandlingService,
    private readonly photoManipulationService: SharpPhotoManipulationService,
    private configService: ConfigService,
  ) {}

  @Get('/state')
  async getPrinterState(): Promise<PrinterStatus> {
    consola.debug('[PhotoController][getPrinterState]');

    const status = await this.printerService.getPrinterState();
    consola.debug('[PhotoController][getPrinterState] status', status);

    return status;
  }

  @Post('/print')
  async print(
    @Body('id') id: string,
    @Body('withWatermark') withWatermark = true,
  ): Promise<PrinterStatus> {
    consola.debug('[PhotoController][print] id', id);

    const status = await this.printerService.getPrinterState();
    consola.debug('[PhotoController][print] status', status);

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

    let dataToPrint = await this.photoManipulationService.resize(
      pathToOriginalPhoto,
      1728,
    );
    consola.debug('[PhotoController][print] withWatermark', withWatermark);
    if (withWatermark) {
      const userDataPath = this.configService.get<string>('USER_DATA_PATH');
      const pathToWatermark = `${userDataPath}/watermark.png`;

      dataToPrint = await this.photoManipulationService.addWatermark(
        dataToPrint,
        pathToWatermark,
      );
    }
    await this.fileHandlingService.toFile(pathToPrintPhoto, dataToPrint);

    setTimeout(async () => {
      await this.printerService.print(pathToPrintPhoto);
    }, 2000);

    return status;
  }
}
