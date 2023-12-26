import { NestFactory } from '@nestjs/core';
//import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  app.use(cors());
 
  await app.listen(3333);
}
bootstrap();
