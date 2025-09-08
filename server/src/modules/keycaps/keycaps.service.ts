import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Keycap } from './schemas/keycaps.schema';
import { UpdateKeycapDto } from './dto/update-keycaps.dto';
import { CreateKeycapDto } from './dto/create-keycaps.dto';

@Injectable()
export class KeycapsService {
  constructor(@InjectModel(Keycap.name) private keycapModel: Model<Keycap>) {}

  async findAll() {
    return this.keycapModel.find().exec();
  }

  async findOne(id: string) {
    return this.keycapModel.findById(id).exec();
  }

  async create(dto: CreateKeycapDto) {
    const keycap = new this.keycapModel(dto);
    return keycap.save();
  }

  async update(id: string, dto: UpdateKeycapDto) {
    return this.keycapModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.keycapModel.findByIdAndDelete(id).exec();
  }
}
