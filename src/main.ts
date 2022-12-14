import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as GraphQLUpload from 'graphql-upload/graphqlUploadExpress.js';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(GraphQLUpload({ maxFileSize: 1000000, maxFiles: 10 }));
  await app.listen(3000);
}
bootstrap();
