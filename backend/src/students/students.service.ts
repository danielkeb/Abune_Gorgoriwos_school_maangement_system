import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoAdmin, DtoStudent } from './dto';

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

  async updateStudentByAdmin(studentId: number, dto: DtoAdmin) {
    const updateStudent = await this.prismaService.user.update({
      where: { id: studentId },
      data: {
        ...dto,
      },
    });
    const studentTable = await this.prismaService.teacher.update({
      where: { user_Id: studentId },
      data: {
        education_level: dto.education_level,
      },
    });
    return { updateStudent, studentTable };
  }
}
