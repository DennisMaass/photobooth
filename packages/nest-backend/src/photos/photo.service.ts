import { Injectable } from '@nestjs/common';
import { CommandService } from '../command.service';
import { ConfigService } from '@nestjs/config';
import { readdirSync, copyFileSync, promises, existsSync } from 'fs';
import { consola } from "consola";

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
    consola.debug('[PhotoService][take] path', path);
    if (this.mock) {
      consola.debug('[PhotoService][take] mock is active');
      copyFileSync('./assets/mock.webp', path);
      return;
    }

    const takePhoto = `gphoto2 --capture-image-and-download --filename=${path}`;

    try {
      await this.commandService.exec(takePhoto);
    } catch (error) {
      consola.error('[PhotoService][take] error', error);
    }
  }

  getAll(): { ids: string[] } {
    const pathToOriginalsFolder =
      this.configService.get<string>('ORIGINAL_PATH');
    const orignals = readdirSync(pathToOriginalsFolder);

    const ids = orignals.map((original) => {
      return original.slice(0, -4);
    });
    consola.debug('[PhotoService][getAll] ids', ids);

    return { ids };
  }

  async remove(id: string): Promise<void> {
    consola.debug('[PhotoService][remove] id', id);
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
      consola.error(error);
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
      consola.error(error);
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
      consola.error(error);
    }

    await Promise.all(deleteRequests);
  }
}
