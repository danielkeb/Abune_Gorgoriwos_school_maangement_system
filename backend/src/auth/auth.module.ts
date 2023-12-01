import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AuthService, ConfigService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
