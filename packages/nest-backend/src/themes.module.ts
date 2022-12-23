import { Module } from '@nestjs/common';
import { ThemesController } from './themes.controller';

@Module({
  imports: [],
  controllers: [ThemesController],
})
export class ThemesModule {}
