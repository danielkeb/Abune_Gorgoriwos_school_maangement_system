import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signUp(school_id, dto: CreateUserDto) {
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
      },
    });
    return addUser;
  }
}
