import { Injectable } from '@nestjs/common';
import { CommandService } from './command.service';
const fs = require('fs');

@Injectable()
export class PhotoService {
  constructor(private readonly commandService: CommandService) {}

  async take(path): Promise<void> {
    const takePhoto = `gphoto2 --capture-image-and-download --filename=${path}`;

    await this.commandService.exec(takePhoto);
  }

  getAll(): [string] {
    return fs.readdirSync('./photos');
  }

  // TODO:
  get(): string{
    return ""
  }

  // TODO:
  delete():void{

  }

  print() {
    const print = 'lp -o landscape -o fit-to-page %s';

    this.commandService.exec(print);

    return 'Hello World!';
  }
}
