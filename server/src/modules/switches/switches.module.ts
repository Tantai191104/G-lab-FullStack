import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SwitchesController } from './switches.controller';
import { SwitchesService } from './switches.service';
import { Switches, SwitchesSchema } from './schemas/switches.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Switches.name, schema: SwitchesSchema }])],
  controllers: [SwitchesController],
  providers: [SwitchesService],
  exports: [SwitchesService],
})
export class SwitchesModule {}
