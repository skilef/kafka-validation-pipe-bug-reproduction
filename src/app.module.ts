import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { KAKFA_OPTIONS } from './kafka.options';

@Module({
  imports: [ClientsModule.register([
      {
        name: 'HERO_CLIENT',
        transport: Transport.KAFKA,
        options: KAKFA_OPTIONS
      },
    ])],
  controllers: [AppController],
})
export class AppModule {}
