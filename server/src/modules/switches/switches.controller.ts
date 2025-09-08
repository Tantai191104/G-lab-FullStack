import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SwitchesService } from './switches.service';
import { UpdateSwitchesDto } from './dto/update-switches.dto';
import { CreateSwitchesDto } from './dto/create-switches.dto';

@Controller('switches')
export class SwitchesController {
  constructor(private readonly switchesService: SwitchesService) {}

  @Get()
  async findAll() {
    return this.switchesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.switchesService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateSwitchesDto) {
    return this.switchesService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSwitchesDto) {
    return this.switchesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.switchesService.remove(id);
  }
}
