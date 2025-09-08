import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { KeycapsService } from './keycaps.service';
import { UpdateKeycapDto } from './dto/update-keycaps.dto';
import { CreateKeycapDto } from './dto/create-keycaps.dto';

@Controller('keycaps')
export class KeycapsController {
  constructor(private readonly keycapsService: KeycapsService) {}

  @Get()
  async findAll() {
    return this.keycapsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.keycapsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateKeycapDto) {
    return this.keycapsService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateKeycapDto) {
    return this.keycapsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.keycapsService.remove(id);
  }
}
