import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { validationExceptionFactory } from 'src/common/exceptions/validation-exception.factory';
import { ReportableExceptionFilter } from 'src/filters/reportable-exception.filter';
import { AppModule } from './app.module';
import { swaggerConfig } from './common/config/swagger.config';
import { EnvironmentVariables } from './interfaces/environment-variables.interface';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(ConfigService<EnvironmentVariables>);

  app.enableCors();

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

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

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
