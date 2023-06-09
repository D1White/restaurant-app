import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MongoExceptionFilter } from 'utils/mongo-exception';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter());

  await app.listen(3001);
}
bootstrap();
