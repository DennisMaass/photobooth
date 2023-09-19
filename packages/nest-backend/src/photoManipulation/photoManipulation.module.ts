import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import SharpPhotoManipulationService from './sharpPhotoManipulation.service.js';

@Module({
  imports: [ConfigModule],
  providers: [SharpPhotoManipulationService],
  exports: [SharpPhotoManipulationService],
})
export class PhotoManipulationModule {}
