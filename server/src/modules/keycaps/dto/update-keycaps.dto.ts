import { PartialType } from '@nestjs/mapped-types';
import { CreateKeycapDto } from './create-keycaps.dto';

export class UpdateKeycapDto extends PartialType(CreateKeycapDto) {}
