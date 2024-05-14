import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //enabling cors 
  app.enableCors()

  //setting global prefix for the routes 
  app.setGlobalPrefix('api')

  /* Adding throttler for ratelimiting and its guards too on app.modules */

  await app.listen(3000);
}
bootstrap();
