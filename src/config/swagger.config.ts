import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('<Project> API')
  .setDescription('The API documentation for the <Project> Platform')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
