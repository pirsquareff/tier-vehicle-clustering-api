import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'newrelic';
import { ValidationPipe } from '@nestjs/common';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}
bootstrap();
