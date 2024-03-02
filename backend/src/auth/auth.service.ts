import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoSignin, DtoStudent, CreateUserDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Response } from 'express';
import * as nodemailer from 'nodemailer';
import { EmailService } from 'src/email/email.service';
import { error } from 'console';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
    private emailService: EmailService,
  ) {}
  // async signUp(school_id: number, dto: CreateUserDto) {
  //   const hash = await argon.hash(dto.password);
  //   const findUser = await this.prismaService.user.findUnique({
  //     where: {
  //       email: dto.email,
  //     },
  //   });
  //   if (findUser) {
  //     throw new NotAcceptableException('user already exist');
  //   }
  //   const addUser = await this.prismaService.user.create({
  //     data: {
  //       school_Id: school_id,
  //       ...dto,
  //       password: hash,
  //     },
  //   });
  //   if (addUser) {
  //     return addUser;
  //   } else {
  //     throw new ExceptionsHandler();
  //   }
  // }

  async signUpStudent(school_id: number, dto: DtoStudent) {
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
        frist_name: dto.frist_name,
        middle_name: dto.middle_name,
        email: dto.email,
        last_name: dto.last_name,
        role: dto.role,
        address: dto.address,
        username: dto.username,
        phone: dto.phone,
        password: hash,
      },
    });

    if (dto.role === 'student') {
      const student = await this.prismaService.student.create({
        data: {
          user_Id: addUser.id,
          enrollment_date: dto.enrollment_date,
          careof_contact1: dto.careOf_contact1,
          careof_contact2: dto.careOf_contact2,
          gradeId: dto.gradeId,
        },
      });
      const quickSelect = await this.prismaService.student.findUnique({
        where: { user_Id: addUser.id },
        include: { user: true },
      });
      return { msg: 'student registered', data: quickSelect };
    } else if (dto.role === 'teacher') {
      const teacher = await this.prismaService.teacher.create({
        data: {
          user_Id: addUser.id,
          education_level: dto.education_level,
        },
      });
      return { addUser, teacher };
    }

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
    if (!user) {
      throw new ForbiddenException('Username or password Incorrect!');

      // return {
      //   statusCode: HttpStatus.FORBIDDEN,
      //   message: 'Username or password incorrect. Please try again.',
      // };
    }

    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Username or password Incorrect!');
    }
    // const token = await this.signToken(user.email, user.id, user.role);

    return this.signToken(user.email, user.id, user.role);
  }

  async signToken(
    email: string,
    id: number,
    role: string,
  ): Promise<{ token_access: string; user: object }> {
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
      user: {
        id,
        email,
        role,
      },
    };
  }

  async forgetPassword(dto: any) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Incorrect email address!');
    }
    const coco = user.id;
    const hide = this.config.get('JWT_SECRET');

    //  ,{
    //   expiresIn:"15m",
    //   secret:hide
    //  }

    const token = await this.jwt.signAsync(
      { coco },
      {
        expiresIn: '1d',
        secret: hide,
      },
    );

    this.emailService.sendSecurityAlert(user.email, token, user.id);
    return {
      msg: 'Password reset link sent to your Email',
    };
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   host: 'smtp.gmail.com',
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: 'zewdebereket7@gmail.com',
    //     //pass:'Ican3561#'
    //     pass: 'p w p a t e w w i a t b m j k ap w p a t e w w i a t b m j k a'
    //   }
    // });
  }
  async getUsers(role: string) {
    const allUsers = await this.prismaService.user.findMany({
      where: {
        role: role,
      },
    });
    return allUsers;
  }
  async getAdmin() {
    const admin = await this.prismaService.user.findMany({
      where: {
        role: 'admin',
      },
    });
    const userWithMergedUser = admin.map((user) => {
      return {
        id: user.id,
        frist_name: user.frist_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        school_Id: user.school_Id,
        createdAT: user.createdAT,
      };
    });
    return userWithMergedUser;
  }

  async resetPassword(dto: any, id: number, token: any) {
    const hide = this.config.get('JWT_SECRET');
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: hide,
      });
      const hash = await argon.hash(dto.password);
      const updatedUser = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          password: hash,
        },
      });
      return { msg: 'Password reseted !' };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
