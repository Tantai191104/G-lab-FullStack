import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeycapsController } from './keycaps.controller';
import { KeycapsService } from './keycaps.service';
import { Keycap, KeycapSchema } from './schemas/keycaps.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Keycap.name, schema: KeycapSchema }])],
  controllers: [KeycapsController],
  providers: [KeycapsService],
  exports: [KeycapsService],
})
export class KeycapsModule {}
