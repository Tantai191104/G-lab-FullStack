// src/auth/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  <T extends object = object>(_data: unknown, ctx: ExecutionContext): T => {
    const request = ctx.switchToHttp().getRequest<{ user: T }>();
    return request.user;
  },
);
