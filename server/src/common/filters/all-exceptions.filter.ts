import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseHttpException } from '../exceptions/base-http.exception';

interface ExceptionResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
  code?: string;
  details?: unknown;
  [key: string]: any;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = 'INTERNAL_SERVER_ERROR';
    let errors: unknown = null;

    if (exception instanceof BaseHttpException) {
      status = exception.getStatus();
      message = exception.message;
      code = exception.code;
      errors = exception.details;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object') {
        const typedRes = res as ExceptionResponse;
        message =
          typeof typedRes.message === 'string'
            ? typedRes.message
            : typedRes.message?.[0] || typedRes.error || message;
        code = typedRes.code ?? code;
        errors = typedRes;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      status: 'error',
      code,
      message,
      errors,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
