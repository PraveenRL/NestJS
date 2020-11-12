import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { ExcludeNullInterceptor } from './shared/utils/exclude-null.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Enable Validation Pipes
  app.useGlobalPipes(new ValidationPipe());

  /*
  * This allow to skip properties from getting data from DB
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector))
  );
  */
  //Exclude null values in response
  app.useGlobalInterceptors(new ExcludeNullInterceptor());

  //Enable Cookie Parser
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
