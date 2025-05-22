import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
        origin: ['http://localhost:3000'], // Allowed origins
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
        credentials: true, // Allow credentials (e.g., cookies)
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    });

    const uploadsPath = join(process.cwd(), 'uploads');
  console.log('Serving static from:', uploadsPath);

  app.useStaticAssets(uploadsPath, {
    prefix: '/uploads',
  });

    app.useGlobalPipes(
    new ValidationPipe({
    transform: true, // ← Důležité pro přetypování string → number
    whitelist: true, // odstraní properties, které nejsou ve DTO
    forbidNonWhitelisted: true, // vyhodí chybu, pokud request obsahuje "navíc" fields
  }),
);
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
