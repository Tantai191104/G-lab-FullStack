import { PartialType } from '@nestjs/mapped-types';
import { CreateSwitchesDto } from './create-switches.dto';

export class UpdateSwitchesDto extends PartialType(CreateSwitchesDto) {}
