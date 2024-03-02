import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GradeLevel } from './dto';

@Injectable()
export class GradeLevelService {
  constructor(private prismaService: PrismaService) {}

  async addGradeLevel(dto: GradeLevel) {
    //check if the Teacher existd!
    const findTeacher = await this.prismaService.teacher.findUnique({
      where: { user_Id: dto.teacher_id },
    });

    if (!findTeacher) {
      throw new NotFoundException('Teacher not found');
    }

    //If  Teacher existed we create the gradeLevel
    try {
      const addGrade = await this.prismaService.gradeLevel.create({
        data: {
          grade: dto.grade,
          teacherId: dto.teacher_id,
        },
      });
      return addGrade;
    } catch (e) {
      throw new NotAcceptableException('Please Insert a vald Teacher Id');
    }
  }
  async updateGradeLevel(gradeId: number, dto: GradeLevel) {
    // update the gradeLevel
    const updateGrade = await this.prismaService.gradeLevel.update({
      where: {
        id: gradeId,
      },
      data: {
        grade: dto.grade,
        teacherId: dto.teacher_id,
      },
    });
    return updateGrade;
  }

  async getGradeLevel() {
    const gradeLevels = await this.prismaService.gradeLevel.findMany({
      include: { section: true, subject: true },
    });

    return gradeLevels;
  }
}
