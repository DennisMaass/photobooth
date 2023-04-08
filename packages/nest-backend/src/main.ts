import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { INestApplication } from '@nestjs/common';
import { UWebSocketAdapter } from './UWebSocketAdapter';

async function bootstrap(
  options,
  port: number,
  wsPort: number,
): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, options);
  app.useWebSocketAdapter(new UWebSocketAdapter(app, { port: wsPort }));
  await app.listen(port);
  return app;
}

async function bootstrapHttps(): Promise<void> {
  const httpsOptions = {
    key: readFileSync(`${__dirname}/../secrets/localhost.key`),
    cert: readFileSync(`${__dirname}/../secrets/localhost.crt`),
  };

  await bootstrap({ cors: true, httpsOptions }, 3001, 8099);
}

async function bootstrapHttp(): Promise<void> {
  await bootstrap({ cors: true }, 3002, 1111);
}

bootstrapHttps();
bootstrapHttp();
