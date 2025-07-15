import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { validationExceptionFactory } from 'src/common/exceptions/validation-exception.factory';
import { ReportableExceptionFilter } from 'src/filters/reportable-exception.filter';
import { AppModule } from './app.module';
import { bootstrapSwagger } from './bootstrap/swagger.bootstrap';
import { EnvironmentVariables } from './interfaces/environment-variables.interface';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

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

  // all routes will begin with api
  app.setGlobalPrefix('api');

  bootstrapSwagger(app);

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
