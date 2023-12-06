import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GradeLevel } from './dto';

@Injectable()
export class GradeLevelService {
  constructor(private prismaService: PrismaService) {}
  async addGradeLevel(id: number, dto: GradeLevel) {
    const addGrade = this.prismaService.gradeLevel.create({
      data: {
        grade: dto.grade,
        section: dto.section,
        teacherId: dto.teacher_id,
      },
    });
    return addGrade;
  }
  async updateGradeLevel(gradeId: number, dto: GradeLevel) {
    const updateGrade = await this.prismaService.gradeLevel.update({
      where: {
        id: gradeId,
      },
      data: {
        grade: dto.grade,
        section: dto.section,
        teacherId: dto.teacher_id,
      },
    });
    return updateGrade;
  }
}
