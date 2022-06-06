import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PhotoService } from './photo.service';
import { CommandService } from './command.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        STAGE: Joi.string().valid('prod', 'local').default('local'),
        EVENT_NAME: Joi.string(),
        PRINT_PATH: Joi.string().default('./print'),
        ORIGINAL_PATH: Joi.string().default('./photos'),
        PREVIEW_PATH: Joi.string().default('./preview'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      envFilePath: ['.env.local'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'originals'),
      serveRoot: '/originals',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'previews'),
      serveRoot: '/previews',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'prints'),
      serveRoot: '/prints',
    }),
  ],
  controllers: [AppController],
  providers: [PhotoService, CommandService],
})
export class AppModule {}
