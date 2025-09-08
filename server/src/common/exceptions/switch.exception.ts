import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from './base-http.exception';
import { ErrorCode } from 'src/enums/error-codes.enum';

export class SwitchNotFoundException extends BaseHttpException {
  constructor(details?: unknown) {
    super(ErrorCode.SWITCH_NOT_FOUND, 'Switch not found', HttpStatus.NOT_FOUND, details);
  }
}
