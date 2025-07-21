import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import * as express from 'express';
import { validationExceptionFactory } from 'src/common/exceptions/validation-exception.factory';
import { ReportableExceptionFilter } from 'src/filters/reportable-exception.filter';
import { AppModule } from './app.module';
import { bootstrapSession } from './bootstrap/session.bootstrap';
import { bootstrapSwagger } from './bootstrap/swagger.bootstrap';
import { EnvironmentVariables } from './interfaces/environment-variables.interface';
import { AdminConfig } from './modules/admin/config/admin.config';

const API_PREFIX = 'api';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  // all routes will begin with api
  // https://github.com/SoftwareBrothers/adminjs/issues/1739
  app.setGlobalPrefix(API_PREFIX, { exclude: [AdminConfig.rootPath] });
  app.use(`/${API_PREFIX}`, express.json());
  app.use(`/${API_PREFIX}`, express.urlencoded({ extended: true }));

  const config = app.get(ConfigService<EnvironmentVariables>);
  const isDev = config.get<string>('NODE_ENV') !== 'production';
  const allowedOrigins = [config.get('FRONTEND_URL')];

  if (isDev) {
    allowedOrigins.push('http://localhost:3000', 'http://127.0.0.1:3000');
  }

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: validationExceptionFactory,
    })
  );

  // global reportable exception filter
  app.useGlobalFilters(new ReportableExceptionFilter());

  // swagger doc
  bootstrapSwagger(app);

  // session setup
  await bootstrapSession(app, config);

  // DI for validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const serverHost = config.get('API_HOST') || 'http://localhost';
  const serverPort = config.get('API_PORT') || 3080;
  const rootServerPath = `${serverHost}:${serverPort}`;

  await app.listen(serverPort, () => {
    logger.log(`
      Server:
      The server runs on: ${rootServerPath}
    `);
  });
}

bootstrap();
