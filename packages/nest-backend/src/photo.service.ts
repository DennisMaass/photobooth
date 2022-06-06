import { Injectable } from '@nestjs/common';
import { CommandService } from './command.service';
import { ConfigService } from '@nestjs/config';
import { readdirSync, copyFileSync, rmSync } from "fs"

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

  remove(id: string): void {
    rmSync(id);
  }

  async print(path): Promise<void> {
    if (this.mock) {
      console.log('print', path);
      return;
    }
    const print = 'lp -o landscape -o fit-to-page %s';

    await this.commandService.exec(print);
  }
}
