import { Injectable } from '@nestjs/common';
import { CommandService } from './command.service';
import { ConfigService } from '@nestjs/config';
import { readdirSync, copyFileSync, promises } from 'fs';

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
    if (this.mock) {
      copyFileSync('./assets/mock.png', path);
      return;
    }
    const takePhoto = `gphoto2 --capture-image-and-download --filename=${path}`;

    await this.commandService.exec(takePhoto);
  }

  getAll(): { ids: string[] } {
    const ids = readdirSync('./photos');
    return { ids };
  }

  async remove(id: string): Promise<void> {
    const deleteRequests = [];

    const pathToOriginalsFolder =
      this.configService.get<string>('ORIGINAL_PATH');
    const originalName = `${id}.jpg`;
    const pathToOriginalPhoto = `${pathToOriginalsFolder}/${originalName}`;

    const request0 = promises.rm(pathToOriginalPhoto);
    deleteRequests.push(request0);

    const pathToPrintFolder = this.configService.get<string>('PRINT_PATH');
    const printName = `${id}.webp`;
    const pathToPrintPhoto = `${pathToPrintFolder}/${printName}`;
    const request1 = promises.rm(pathToPrintPhoto);
    deleteRequests.push(request1);

    const pathToPreviewFolder = this.configService.get<string>('PREVIEW_PATH');
    const previewName = `${id}.webp`;
    const pathToPreviewPhoto = `${pathToPreviewFolder}/${previewName}`;
    const request2 = promises.rm(pathToPreviewPhoto);
    deleteRequests.push(request2);

    await Promise.all(deleteRequests);
  }

  async print(path): Promise<void> {
    if (this.mock) {
      console.debug('print', path);
      return;
    }
    const print = `lp -o landscape -o fit-to-page ${path}`;

    await this.commandService.exec(print);
  }
}
