import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { YearDto } from './dto';

@Injectable()
export class YearService {
  constructor(private prisma: PrismaService) {}
  async addYear(adminId: number, dto: YearDto) {
    const admin = await this.prisma.user.findUnique({
      where: {
        id: adminId,
      },
    });
    if (!admin) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.schoolYear.create({
      data: {
        ...dto,
      },
    });
    return { msg: 'registered successfully' };
  }
}
