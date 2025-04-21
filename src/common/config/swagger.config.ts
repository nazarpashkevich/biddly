import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Biddly API')
  .setDescription('The API documentation for the Biddly Platform')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
