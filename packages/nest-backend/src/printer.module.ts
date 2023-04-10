import { Module } from '@nestjs/common';
import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';
import { CommandService } from './command.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [PrinterController],
  providers: [PrinterService, CommandService],
})
export class PrinterModule {}
