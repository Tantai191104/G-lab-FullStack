import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: Partial<User>) {
    return this.userModel.create(createUserDto);
  }
  async findAll() {
    return this.userModel.find().lean();
  }

  async findById(id: string) {
    return this.userModel.findById(id).lean();
  }
  async update(id: string, createUserDto: CreateUserDto) {
    return this.userModel.findByIdAndUpdate(id, createUserDto, { new: true }).lean();
  }
  async findByEmail(email: string) {
    return this.userModel.findOne({ email: email.trim().toLowerCase() }).exec();
  }
  async findByEmailVerificationToken(token: string) {
    return this.userModel.findOne({ emailVerificationToken: token });
  }
}
