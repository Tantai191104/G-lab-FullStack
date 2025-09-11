import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from 'src/enums/roles';

export type UserDocument = User & Document;

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Schema({
  timestamps: true, // tự động tạo createdAt, updatedAt
  versionKey: false, // bỏ __v
})
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string; // sẽ hash sau

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({
    type: [String],
    required: true, // Mảng phải tồn tại
    validate: {
      validator: (val: string[]) => Array.isArray(val) && val.length > 0,
      message: 'Address array must have at least one item',
    },
  })
  address: string[];

  @Prop({ enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Prop({ enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ type: String, default: null })
  emailVerificationToken: string | null;

  @Prop({ type: String, default: null })
  refreshToken?: string;

  @Prop({ required: true, trim: true })
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
