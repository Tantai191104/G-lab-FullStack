import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/enums/error-codes.enum';

export class BaseHttpException extends HttpException {
  public readonly code: ErrorCode;
  public readonly details?: unknown;

  constructor(code: ErrorCode, message: string, status: HttpStatus, details?: unknown) {
    super({ code, message, statusCode: status, details }, status);
    this.code = code;
    this.details = details;
  }
}
