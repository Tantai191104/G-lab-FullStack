import { Module } from '@nestjs/common';
import { KeycapsController } from './keycaps.controller';
import { KeycapsService } from './keycaps.service';

@Module({
  controllers: [KeycapsController],
  providers: [KeycapsService],
})
export class KeycapsModule {}
