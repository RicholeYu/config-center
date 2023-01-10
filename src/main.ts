import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as rTracer from 'cls-rtracer';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(rTracer.expressMiddleware({ useHeader: true, echoHeader: true }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = ~~process.env.PORT;
  await app.listen(port, () => {
    new Logger().log(`listening on ${port}`, 'config-center');
  });
}
bootstrap();
