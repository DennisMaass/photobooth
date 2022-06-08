import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { PhotoModule } from './photo.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        STAGE: Joi.string().valid('prod', 'local').default('prod'),
        EVENT_NAME: Joi.string().default('D-R-Hochzeit'),
        PRINT_PATH: Joi.string().default('/media/pi/135A-E15F1/prints'),
        ORIGINAL_PATH: Joi.string().default('/media/pi/135A-E15F1/originals'),
        PREVIEW_PATH: Joi.string().default('/media/pi/135A-E15F1/previews'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: [`.env.${process.env.NODE_ENV}.local`, `.env.local`, `.env.${process.env.NODE_ENV}`, `.env`],
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [{
        rootPath: configService.get<string>('ORIGINAL_PATH'),
        serveRoot: '/originals',
      }]
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [{
        rootPath: configService.get<string>('PREVIEW_PATH'),
        serveRoot: '/previews',
      }]
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [{
        rootPath: configService.get<string>('PRINT_PATH'),
        serveRoot: '/prints',
      }]
    }),
    PhotoModule,
  ],
  controllers:[AppController],
  providers: [CommandService],
})
export class AppModule {}
