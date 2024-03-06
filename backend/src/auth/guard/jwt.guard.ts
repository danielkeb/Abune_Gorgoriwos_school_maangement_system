import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['token'] = payload; // Attach payload to request.token
      console.log('token get successful', request['token']);

      // Check if the requested resource ID matches the user ID from the token
      // const userIdFromToken = payload.sub;
      // const requestedUserId = parseInt(request.params.id);
      // console.log('userIdFromToken', userIdFromToken);
      // console.log('requestedUserId', requestedUserId);
      // if (userIdFromToken !== requestedUserId) {
      //   throw new UnauthorizedException('Unauthorized access to this resource');
      // }

      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token  ');
      console.log(error);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7); // Remove 'Bearer ' from the token string
    }
    return undefined;
  }
}
