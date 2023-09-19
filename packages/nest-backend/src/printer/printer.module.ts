import { Module } from '@nestjs/common';
import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';
import { CommandService } from '../command.service';
import { ConfigModule } from '@nestjs/config';
import { PhotoManipulationModule } from '../photoManipulation/photoManipulation.module.js';
import { FileHandlingModule } from '../filehandling/fileHandling.module.js';

@Module({
  imports: [ConfigModule, PhotoManipulationModule, FileHandlingModule],
  controllers: [PrinterController],
  providers: [PrinterService, CommandService],
  exports: [PrinterService],
})
export class PrinterModule {}
