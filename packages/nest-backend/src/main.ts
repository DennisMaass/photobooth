import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from "fs"

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync(`${__dirname}/../secrets/localhost.key`),
    cert: readFileSync(`${__dirname}/../secrets/localhost.crt`),
  };

  const app = await NestFactory.create(AppModule, { cors: true, httpsOptions });
  await app.listen(3001);
}
bootstrap();


async function bootstrap2() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3002);
}
bootstrap2();
