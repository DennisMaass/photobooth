import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PhotoService } from './photo.service';
import { CommandService } from './command.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'photos'),
      serveRoot: "/photos"
    }),
  ],
  controllers: [AppController],
  providers: [PhotoService, CommandService],
})
export class AppModule {}
