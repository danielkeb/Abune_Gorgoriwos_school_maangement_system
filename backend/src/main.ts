import { NestFactory } from '@nestjs/core';
//import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';
// import * as cors from 'cors';
import * as path from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('AGSMS API DOC')
    .setDescription('Full API DOCUMENTAION FOR AGSMS')
    .setVersion('1.0')
    .addTag('SMS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cors());
  await app.listen(3333);
}
bootstrap();
