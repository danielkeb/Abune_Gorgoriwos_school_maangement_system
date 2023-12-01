import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, DtoSignin } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}
  async signUp(school_id: number, dto: CreateUserDto) {
    const hash = await argon.hash(dto.password);
    const findUser = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (findUser) {
      throw new NotAcceptableException('user already exist');
    }
    const addUser = await this.prismaService.user.create({
      data: {
        school_Id: school_id,
        ...dto,
        password: hash,
      },
    });
    if (addUser) {
      return addUser;
    } else {
      throw new ExceptionsHandler();
    }
  }

  async signIn(dto: DtoSignin) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('User NOt found!');

    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Username or password Incorrect!');
    }

    return this.signToken(user.email, user.id, user.role);
  }

  async signToken(
    email: string,
    id: number,
    role: string,
  ): Promise<{ token_access: string }> {
    const payLoad = {
      sub: id,
      email,
      role,
    };
    const hide = this.config.get('JWT_SECRET');

    //  ,{
    //   expiresIn:"15m",
    //   secret:hide
    //  }

    const token = await this.jwt.signAsync(payLoad, {
      expiresIn: '40m',
      secret: hide,
    });

    return {
      token_access: token,
    };
  }
}
