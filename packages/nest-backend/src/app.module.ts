import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { PhotoModule } from './photo.module';
import { PrinterModule } from './printer.module';
import { AppController } from './app.controller';
import { ThemesModule } from './themes.module';
import { ConnectionHandler } from './ConnectionHandler';
import { RealtimeService } from './realtime.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        STAGE: Joi.string().valid('prod', 'local').default('prod'),
        EVENT_NAME: Joi.string().default('Image'),
        PRINT_PATH: Joi.string().default('/media/pi/135A-E15F2/prints'),
        ORIGINAL_PATH: Joi.string().default('/media/pi/135A-E15F2/originals'),
        PREVIEW_PATH: Joi.string().default('/media/pi/135A-E15F2/previews'),
        DELETED_PATH: Joi.string().default('/media/pi/135A-E15F2/deleted'),
        USER_DATA_PATH: Joi.string().default('/home/pi/user-data'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.local`,
        `.env.${process.env.NODE_ENV}`,
        `.env`,
      ],
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: configService.get<string>('ORIGINAL_PATH'),
          serveRoot: '/originals',
        },
      ],
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: configService.get<string>('PREVIEW_PATH'),
          serveRoot: '/previews',
        },
      ],
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: configService.get<string>('PRINT_PATH'),
          serveRoot: '/prints',
        },
      ],
    }),
    PhotoModule,
    PrinterModule,
    ThemesModule,
  ],
  controllers: [AppController],
  providers: [CommandService, ConnectionHandler, RealtimeService],
})
export class AppModule {}
