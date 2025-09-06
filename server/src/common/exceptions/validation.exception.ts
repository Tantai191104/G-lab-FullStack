import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from './base-http.exception';
import { ErrorCode } from 'src/enums/error-codes.enum';

export class ValidationException extends BaseHttpException {
  constructor(errors: Record<string, string[]>) {
    super(ErrorCode.VALIDATION_ERROR, 'Validation failed', HttpStatus.BAD_REQUEST, errors);
  }
}
