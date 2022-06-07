import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PhotoService } from './photo.service';
import { CommandService } from './command.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        STAGE: Joi.string().valid('prod', 'local').default('local'),
        EVENT_NAME: Joi.string(),
        PRINT_PATH: Joi.string().default('./prints'),
        ORIGINAL_PATH: Joi.string().default('./originals'),
        PREVIEW_PATH: Joi.string().default('./previews'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      envFilePath: [`.env.${process.env.NODE_ENV}.local`, '.env.local', `.env.${process.env.NODE_ENV}`, '.env'],
    }),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [{
        rootPath: join(__dirname, '..', configService.get<string>('ORIGINAL_PATH')),
        serveRoot: '/originals',
      }]
    }),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [{
        rootPath: join(__dirname, '..', configService.get<string>('PREVIEW_PATH')),
        serveRoot: '/previews',
      }]
    }),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [{
        rootPath: join(__dirname, '..', configService.get<string>('PRINT_PATH')),
        serveRoot: '/prints',
      }]
    })
  ],
  controllers: [AppController],
  providers: [PhotoService, CommandService],
})
export class AppModule {}
