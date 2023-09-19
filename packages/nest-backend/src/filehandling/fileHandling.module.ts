import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import SharpFileHandlingService from './sharpFileHandling.service.js';

@Module({
  imports: [ConfigModule],
  providers: [SharpFileHandlingService],
  exports: [SharpFileHandlingService],
})
export class FileHandlingModule {}
