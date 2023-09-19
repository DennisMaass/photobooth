import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { CommandService } from '../command.service';
import { ConfigModule } from '@nestjs/config';
import { PhotoGateway } from './photo.gateway';

@Module({
  imports: [ConfigModule],
  controllers: [PhotoController],
  providers: [PhotoService, CommandService, PhotoGateway],
  exports: [PhotoService],
})
export class PhotoModule {}
