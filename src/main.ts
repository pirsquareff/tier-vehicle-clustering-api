import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'newrelic';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}
bootstrap();
