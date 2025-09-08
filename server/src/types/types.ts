import { UserRole } from 'src/enums/roles';

export interface JwtPayload {
  userId: string;
  role: UserRole;
}
export enum SwitchesType {
  TACTILE = 'Tactile',
  LINEAR = 'Linear',
  CLICKY = 'Clicky',
}
export enum KeycapSize {
  STANDARD = 'STANDARD', // 1u
  TAB = 'TAB', // 1.5u
  CAPS_LOCK = 'CAPS_LOCK', // 1.75u
  SHIFT = 'SHIFT', // 2u, 2.25u
  ENTER = 'ENTER', // 2.25u
  SPACE = 'SPACE', // 6u, 6.25u, 7u
  BACKSPACE = 'BACKSPACE', // 2u
  FN = 'FN', // 1u
  ALT = 'ALT', // 1.25u
  CTRL = 'CTRL', // 1.25u
  WIN = 'WIN', // 1.25u
  // Thêm các loại phím đặc biệt khác nếu cần
}
