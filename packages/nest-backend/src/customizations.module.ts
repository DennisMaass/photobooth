import { Module } from '@nestjs/common';
import { CustomizationsController } from './customizations.controller';

@Module({
  imports: [],
  controllers: [CustomizationsController],
})
export class CustomizationsModule {}
