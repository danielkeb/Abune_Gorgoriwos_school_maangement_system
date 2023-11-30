import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signUp(school_id, dto: CreateUserDto) {
    const addUser = await this.prismaService.user.create({
      data: {
        school_Id: school_id,
        ...dto,
      },
    });
    return addUser;
  }
}
