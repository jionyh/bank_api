import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../auth/models/authRequest';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
