import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { KAKFA_OPTIONS } from './kafka.options';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: KAKFA_OPTIONS
  });


await app.startAllMicroservices();
await app.listen(3001);

}
bootstrap();
