import { Module } from '@nestjs/common';
import { ThemesController } from './themes.controller';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'assets'),
    }),
  ],
  controllers: [ThemesController],
})
export class ThemesModule { }
