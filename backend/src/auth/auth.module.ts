import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { AccessContorlService } from '../shared/access-control.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  providers: [AuthService, ConfigService, JwtStrategy, AccessContorlService],
  controllers: [AuthController],
  imports: [JwtModule.register({}), SharedModule],
})
export class AuthModule {}
