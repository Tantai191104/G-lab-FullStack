import { KeycapSize } from 'src/types/types';

export class CreateKeycapDto {
  name: string;
  img?: string[];
  size: KeycapSize;
}
