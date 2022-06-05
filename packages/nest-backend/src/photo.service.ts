import { Injectable } from '@nestjs/common';
import { CommandService } from './command.service';
const fs = require('fs');

@Injectable()
export class PhotoService {
  private mock = true;
  constructor(private readonly commandService: CommandService) {}

  async take(path): Promise<void> {
    if (this.mock) {
      await fs.copyFile('./test.png', path,()=>{});
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
