import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { KeycapSize } from 'src/types/types';

@Schema({ timestamps: true })
export class Keycap extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  img: string[];

  @Prop({ required: true, enum: KeycapSize })
  size: KeycapSize;
}

export const KeycapSchema = SchemaFactory.createForClass(Keycap);
