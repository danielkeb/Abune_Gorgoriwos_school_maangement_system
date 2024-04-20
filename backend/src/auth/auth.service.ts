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

  async associateSubjectsAndCreateResults(
    userId: number,
    gradeId: number,
    sectionId: number,
  ): Promise<void> {
    // Step 1: Get subjects associated with the grade
    const subjects = await this.prismaService.subject.findMany({
      where: { gradeId: gradeId },
    });

    // Step 2: Associate subjects with the student
    await this.prismaService.student.update({
      where: { user_Id: userId },
      data: {
        subject: {
          connect: subjects.map((subject) => ({ id: subject.id })),
        },
      },
    });
    // Step 3: Create result records for each associated subject
    for (const subject of subjects) {
      // Get the teacherId associated with the subject, or set it to null if not available
      const teacherId = subject.teacherId;

      // Create a result record for the student, subject, and grade
      await this.prismaService.result.create({
        data: {
          studentId: userId,
          subjectId: subject.id,
          gradeLevelId: gradeId,
          sectionId: sectionId,
          teacherId: teacherId,
        },
      });
    }
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
      await this.associateSubjectsAndCreateResults(quickSelect.user_Id, quickSelect.gradeId, quickSelect.sectionId);
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

  async signIn(dto: DtoSignin): Promise<{ access_token: string }> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return this.signToken(
      user.id,
      user.role,
      user.email,
      user.frist_name,
      user.school_Id,
    );
  }

  async signToken(
    userId: number,
    role: string,
    email: string,
    frist_name: string,
    school_Id: number,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      role,
      email,
      frist_name,
      school_Id,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '90m',
      secret: secret,
    });

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
      select: {
        id: true,
        frist_name: true,
        middle_name: true,
        last_name: true,
        email: true,
        phone: true,
        gender: true,
        createdAT: true,
        school_Id: true,
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
