import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SwitchesType } from 'src/types/types';

@Schema({ timestamps: true })
export class Switches extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: SwitchesType })
  type: SwitchesType;

  @Prop({ required: true })
  pins: number;

  @Prop({ required: false })
  topHousing?: string;

  @Prop({ required: false })
  bottomHousing?: string;

  @Prop({ required: false })
  stem?: string;

  @Prop({ required: true })
  force: string; // "50g" hoặc "45g/50g"

  @Prop({ required: false })
  actuationForce?: string; // Lực kích hoạt

  @Prop({ required: false })
  bottomOutForce?: string; // Lực kết thúc

  @Prop({ required: true })
  travel: string; // "3.3mm", "4mm"

  @Prop({ required: false })
  actuationPoint?: string; // Điểm kích hoạt

  @Prop({ required: true })
  durability: string; // "50 triệu lần nhấn"

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], required: false, default: [] })
  img: string[];
}

export const SwitchesSchema = SchemaFactory.createForClass(Switches);
