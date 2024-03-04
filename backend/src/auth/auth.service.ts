import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoSignin, DtoStudent, DtoAdmin } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
//import { Response } from 'express';
//import * as nodemailer from 'nodemailer';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
    private emailService: EmailService,
  ) {}
  async signUpSuperAdmin(dto: DtoAdmin) {
    const hash = await argon.hash(dto.password);
    const emailExists = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (emailExists) {
      throw new NotAcceptableException('email exists');
    }
    await this.prismaService.user.create({
      data: {
        frist_name: dto.frist_name,
        middle_name: dto.middle_name,
        email: dto.email,
        last_name: dto.last_name,
        gender: dto.gender,
        date_of_birth: dto.date_of_birth,
        role: dto.role,
        address: dto.address,
        username: dto.username,
        phone: dto.phone,
        password: hash,
      },
    });
    return { msg: 'sign up successfully' };
  }

  async signUpStudent(dto: DtoStudent, school_id: number) {
    const hash = await argon.hash(dto.password);
    const school = await this.prismaService.school.findUnique({
      where: {
        id: school_id,
      },
    });
    if (!school) {
      throw new NotFoundException('school not found');
    }
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
        gender: dto.gender,
        date_of_birth: dto.date_of_birth,
        role: dto.role,
        address: dto.address,
        username: dto.username,
        phone: dto.phone,
        password: hash,
      },
    });
    console.log('teacher created');
    if (dto.role === 'student') {
      await this.prismaService.student.create({
        data: {
          user_Id: addUser.id,
          careof_contact1: dto.careOf_contact1,
          careof_contact2: dto.careOf_contact2,
          gradeId: dto.gradeId,
          sectionId: dto.sectionId,
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
      console.log('teacher created');
      return { addUser, teacher };
    }

    if (addUser) {
      return addUser;
    } else {
      throw new ExceptionsHandler();
    }
  }

  async signIn(dto: DtoSignin): Promise<{ access_token: string }> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    console.log('dto.password', dto.password);
    console.log('user', user.password);

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return this.signToken(user.id, user.role, user.email);
  }

  async signToken(
    userId: number,
    role: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      role,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '50m',
      secret: secret,
    });
    console.log(token);
    return {
      access_token: token,
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
      await this.jwt.verifyAsync(token, {
        secret: hide,
      });
      const hash = await argon.hash(dto.password);
      await this.prismaService.user.update({
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
