import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Switches } from './schemas/switches.schema';
import { CreateSwitchesDto } from './dto/create-switches.dto';
import { UpdateSwitchesDto } from './dto/update-switches.dto';
import { SwitchNotFoundException } from 'src/common/exceptions/switch.exception';
@Injectable()
export class SwitchesService {
  constructor(@InjectModel(Switches.name) private switchModel: Model<Switches>) {}

  async findAll() {
    return this.switchModel.find().exec();
  }

  async findOne(id: string) {
    const foundSwitch = await this.switchModel.findById(id).exec();
    if (!foundSwitch) throw new SwitchNotFoundException();
    return foundSwitch;
  }

  async create(dto: CreateSwitchesDto) {
    const newSwitch = new this.switchModel(dto);
    return newSwitch.save();
  }

  async update(id: string, dto: UpdateSwitchesDto) {
    const updatedSwitch = await this.switchModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updatedSwitch) throw new SwitchNotFoundException();
    return updatedSwitch;
  }

  async remove(id: string) {
    const deletedSwitch = await this.switchModel.findByIdAndDelete(id).exec();
    if (!deletedSwitch) throw new SwitchNotFoundException();
    return deletedSwitch;
  }
}
