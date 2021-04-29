import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const port = 8080;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO: dev and prod environment
  app.enableCors();
  await app.listen(port);
}
bootstrap();
