import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { CommandService } from './command.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [PhotoController],
  providers: [PhotoService, CommandService],
})
export class PhotoModule {}
