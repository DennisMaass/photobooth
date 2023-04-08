import { Injectable } from '@nestjs/common';
const { exec } = require('node:child_process');

@Injectable()
export class CommandService {
  async exec(command): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }
}
