import { Injectable } from '@nestjs/common';
const { exec } = require('child_process');

@Injectable()
export class CommandService {
  async exec(command): Promise<void> {
    console.error('[CommandService][exec]',command)
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("[CommandService][exec] error",error)
          reject(error);
        }
        if (stderr) {
          console.error("[CommandService][exec] error",stderr)
          reject(stderr);
        }
        console.error('[CommandService][exec] done',command)
        resolve();
      });
    });
  }
}
