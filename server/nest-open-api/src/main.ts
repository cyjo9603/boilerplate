import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import helmet from 'helmet';
import * as hpp from 'hpp';
import * as csurf from 'csurf';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.use(cookieParser());
  app.use(compression());
  if (configService.get('appEnv') !== 'development') {
    app.use(hpp());
    app.use(helmet());
    app.use(csurf());
  }

  await app.listen(configService.get('port'), '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
