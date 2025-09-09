import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from './base-http.exception';
import { ErrorCode } from 'src/enums/error-codes.enum';

// Critical errors
export class EmailAlreadyExistsException extends BaseHttpException {
  constructor(email: string) {
    super(
      ErrorCode.EMAIL_ALREADY_EXISTS,
      `Email ${email} is already registered`,
      HttpStatus.BAD_REQUEST,
      { email },
    );
  }
}

export class InvalidCredentialsException extends BaseHttpException {
  constructor() {
    super(ErrorCode.BAD_REQUEST, 'Email or password is incorrect', HttpStatus.BAD_REQUEST);
  }
}

export class EmailNotVerifiedException extends BaseHttpException {
  constructor() {
    super(ErrorCode.BAD_REQUEST, 'Email not verified', HttpStatus.BAD_REQUEST);
  }
}
