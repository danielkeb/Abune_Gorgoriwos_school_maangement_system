import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoStudent } from './dto';

@Injectable()
export class StudentsService {
  constructor(private prismaService: PrismaService) {}

  async studentUpdate(studentId: number, dto: DtoStudent) {
    const updateStudent = await this.prismaService.user.update({
      where: { id: studentId },
      data: {
        ...dto,
      },
    });
    return updateStudent;
  }
}
