import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/conserta-aqui/v1");
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  

  const config = new DocumentBuilder()
  .setTitle("API Conserta Aqui")
  .setDescription("API do projeto Conserta Aqui")
  .setVersion("1.0")
  .addTag("usuarios")
  .addTag('auth')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger',app,document);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform:true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  useContainer(app.select(AppModule), {fallbackOnErrors: true})
  await app.listen(3000);
}
bootstrap();
