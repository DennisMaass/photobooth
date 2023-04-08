import { Injectable } from '@nestjs/common';
import { CommandService } from './command.service';
import { ConfigService } from '@nestjs/config';
import { readdirSync, copyFileSync, promises, existsSync } from 'fs';

export type PrinterStatusCode = 'ready' | 'busy' | 'error';
export type PrinterStatus = {
  code: PrinterStatusCode;
  message: string;
};
@Injectable()
export class PhotoService {
  private mock = false;
  constructor(
    private readonly commandService: CommandService,
    private configService: ConfigService,
  ) {
    const mode = this.configService.get<string>('STAGE');
    this.mock = mode === 'local';
  }

  async take(path): Promise<void> {
    console.debug('[PhotoService][take] path', path);
    if (this.mock) {
      console.debug('[PhotoService][take] mock is active');
      copyFileSync('./assets/mock.webp', path);
      return;
    }

    const takePhoto = `gphoto2 --capture-image-and-download --filename=${path}`;

    try {
      await this.commandService.exec(takePhoto);
    } catch (error) {
      console.error('[PhotoService][take] error', error);
    }
  }

  getAll(): { ids: string[] } {
    const pathToOriginalsFolder =
      this.configService.get<string>('ORIGINAL_PATH');
    const orignals = readdirSync(pathToOriginalsFolder);

    const ids = orignals.map((original) => {
      return original.slice(0, -4);
    });
    console.debug('[PhotoService][getAll] ids', ids);

    return { ids };
  }

  async remove(id: string): Promise<void> {
    console.debug('[PhotoService][remove] id', id);
    const deleteRequests = [];

    const pathToOriginalsFolder =
      this.configService.get<string>('ORIGINAL_PATH');
    const originalName = `${id}.jpg`;
    const pathToOriginalPhoto = `${pathToOriginalsFolder}/${originalName}`;

    const pathToDeletedFolder = this.configService.get<string>('DELETED_PATH');
    const pathToDeletedPhoto = `${pathToDeletedFolder}/${originalName}`;

    try {
      if (existsSync(pathToOriginalPhoto)) {
        const request0 = promises.rename(
          pathToOriginalPhoto,
          pathToDeletedPhoto,
        );
        deleteRequests.push(request0);
      }
    } catch (error) {
      console.error(error);
    }

    const pathToPrintFolder = this.configService.get<string>('PRINT_PATH');
    const printName = `${id}.jpg`;
    const pathToPrintPhoto = `${pathToPrintFolder}/${printName}`;
    try {
      if (existsSync(pathToPrintPhoto)) {
        const request1 = promises.rm(pathToPrintPhoto);
        deleteRequests.push(request1);
      }
    } catch (error) {
      console.error(error);
    }

    const pathToPreviewFolder = this.configService.get<string>('PREVIEW_PATH');
    const previewName = `${id}.webp`;
    const pathToPreviewPhoto = `${pathToPreviewFolder}/${previewName}`;
    try {
      if (existsSync(pathToPreviewPhoto)) {
        const request2 = promises.rm(pathToPreviewPhoto);
        deleteRequests.push(request2);
      }
    } catch (error) {
      console.error(error);
    }

    await Promise.all(deleteRequests);
  }

  async print(path): Promise<void> {
    console.debug('[PhotoService][print] path', path);
    if (this.mock) {
      console.debug('[PhotoService][print] mock is active');
      return;
    }
    const print = `lp -o landscape ${path}`;

    try {
      await this.commandService.exec(print);
    } catch (error) {
      console.error('[PhotoService][take] error', error);
    }
  }

  async getPrinterState(): Promise<PrinterStatus> {
    try {
      const plainStatus = await this.commandService.exec('lpstat -p');
      if (plainStatus.includes('druckt jetzt')) {
        return {
          code: 'busy',
          message: plainStatus,
        };
      } else if (plainStatus.includes('ist im Leerlauf')) {
        return {
          code: 'ready',
          message: plainStatus,
        };
      }

      return {
        code: 'error',
        message: plainStatus,
      };
    } catch (e) {
      console.error(e);
      return {
        code: 'error',
        message: 'error',
      };
    }
  }

  //TODO: read the needed information and transform in js
  async getPrinterJobs() {
    try {
      return await this.commandService.exec('lpstat -o');
    } catch (e) {
      return 'error';
    }
  }
}
