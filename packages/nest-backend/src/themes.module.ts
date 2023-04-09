import { Module } from '@nestjs/common';
import { ThemesController } from './themes.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [ThemesController],
})
export class ThemesModule {}
