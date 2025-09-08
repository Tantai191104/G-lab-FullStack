import { SwitchesType } from 'src/types/types';

export class CreateSwitchesDto {
  name: string;
  type: SwitchesType;
  pins: number;
  force: string;
  travel: string;
  durability: string;
  price: number;
  img?: string[];

  topHousing?: string;
  bottomHousing?: string;
  stem?: string;
  actuationForce?: string;
  bottomOutForce?: string;
  actuationPoint?: string;
}
