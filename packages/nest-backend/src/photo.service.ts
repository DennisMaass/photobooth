import { Injectable } from '@nestjs/common';
import { CommandService } from './command.service';
import { ConfigService } from '@nestjs/config';
const fs = require('fs');

@Injectable()
export class PhotoService {
  private mock = false;
  constructor(private readonly commandService: CommandService, private configService: ConfigService) {
    const mode = this.configService.get<string>('MODE');
    this.mock = mode === "local"
  }

  async take(path): Promise<void> {
    if (this.mock) {
      fs.copyFileSync('./assets/mock.png', path);
      return;
    }
    const takePhoto = `gphoto2 --capture-image-and-download --filename=${path}`;

    await this.commandService.exec(takePhoto);
  }

  getAll(): [string] {
    return fs.readdirSync('./photos');
  }

  // TODO:
  delete(): void {}

  async print(path):Promise<void>{
    if (this.mock) {
      console.log('print',path);
      return
    }
    const print = 'lp -o landscape -o fit-to-page %s';

    await this.commandService.exec(print);
  }
}
