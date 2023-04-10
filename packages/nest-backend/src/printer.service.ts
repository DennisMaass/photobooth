import { Injectable } from '@nestjs/common';
import { CommandService } from './command.service';
import { ConfigService } from '@nestjs/config';

export type PrinterStatusCode = 'ready' | 'busy' | 'error' | 'off';
export type PrinterStatus = {
  code: PrinterStatusCode;
  message: string;
};
@Injectable()
export class PrinterService {
  private mock = false;

  constructor(
    private readonly commandService: CommandService,
    private configService: ConfigService,
  ) {
    const mode = this.configService.get<string>('STAGE');
    this.mock = mode === 'local';
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
      if (plainStatus.includes('kann nicht lokalisiet werden')) {
        return {
          code: 'off',
          message: plainStatus,
        };
      } else if (plainStatus.includes('druckt jetzt')) {
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
