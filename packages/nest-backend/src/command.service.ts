import { Injectable } from '@nestjs/common';
const { exec } = require('child_process');

@Injectable()
export class CommandService {
  async exec(command): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("[CommandService][exec]",error)
          reject(error);
        }
        if (stderr) {
          console.error("[CommandService][exec]",stderr)
          reject(stderr);
        }
        resolve();
      });
    });
  }
}
