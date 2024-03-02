import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as { user: User };
    const user = request.user;
    console.log('resquest ', request.user);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data) {
      return user[data];
    }

    return user;
  },
);
