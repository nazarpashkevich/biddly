import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUserDto } from '../../modules/auth/dto/jwt-user.dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtUserDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
