import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';

async function bootstrap(options, port): Promise<void> {
  const app = await NestFactory.create(AppModule, options);
  await app.listen(port);
}

async function bootstrapHttps(): Promise<void> {
  const httpsOptions = {
    key: readFileSync(`${__dirname}/../secrets/localhost.key`),
    cert: readFileSync(`${__dirname}/../secrets/localhost.crt`),
  };
  await bootstrap({ cors: true, httpsOptions }, 3001);
}

async function bootstrapHttp(): Promise<void> {
  await bootstrap({ cors: true }, 3002);
}

bootstrapHttps();
bootstrapHttp();
