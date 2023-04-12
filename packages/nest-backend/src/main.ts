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
  let httpsOptions;
  if (options.ssl) {
    httpsOptions = {
      key: readFileSync(options.ssl.key),
      cert: readFileSync(options.ssl.cert),
    };
  }

  const app = await NestFactory.create(AppModule, { httpsOptions, cors: true });
  app.useWebSocketAdapter(
    new UWebSocketAdapter(app, {
      port: wsPort,
      sslCert: options.ssl?.cert,
      sslKey: options.ssl?.key,
    }),
  );
  await app.listen(port);
  return app;
}

async function bootstrapHttps(): Promise<void> {
  const options = {
    ssl: {
      key: `${__dirname}/../secrets/localhost.key`,
      cert: `${__dirname}/../secrets/localhost.crt`,
    },
  };
  await bootstrap(options, 3001, 8099);
}

async function bootstrapHttp(): Promise<void> {
  await bootstrap({ cors: true }, 3002, 1111);
}

bootstrapHttps();
bootstrapHttp();
