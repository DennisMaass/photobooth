import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from "fs"

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync('./secrets/localhost.key'),
    cert: readFileSync('./secrets/localhost.crt'),
  };

  const app = await NestFactory.create(AppModule, { cors: true, httpsOptions });
  await app.listen(3001);
}
bootstrap();
