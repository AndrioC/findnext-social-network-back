import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as GraphQLUpload from 'graphql-upload/graphqlUploadExpress.js';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(GraphQLUpload({ maxFileSize: 1000000, maxFiles: 10 }));
  await app.listen(3000);
}
bootstrap();
