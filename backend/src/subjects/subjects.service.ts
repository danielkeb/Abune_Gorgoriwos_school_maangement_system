import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { AddSubjectsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSubjectDto } from './dto/update.subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  async addSubjects(dto: AddSubjectsDto) {
    try {
      // const teacher = await this.prisma.teacher.findUnique({
      //   where: { user_Id: teacherId },
      // });

      // if (!teacher) {
      //   throw new NotFoundException('Teacher not found');
      // }

      // Check if gradeId exists
      const gradeLevel = await this.prisma.gradeLevel.findUnique({
        where: {
          id: dto.gradeId,
        },
      });

      if (!gradeLevel) {
        throw new NotFoundException('Grade level does not exist!');
      }

      // Check if a section with the same gradeId and name already exists
      const existingSubject = await this.prisma.subject.findFirst({
        where: {
          name: dto.name,
        },
      });

      if (existingSubject) {
        throw new NotAcceptableException('Subject already exists');
      }

      // If no section with the same gradeId and name exists, create the new section
      const addSubject = await this.prisma.subject.create({
        data: {
          name: dto.name,

          gradeId: dto.gradeId,
          teacherId: dto.teacherId,
        },
      });

      return addSubject;
    } catch (error) {
      console.log(error);
      // Handle unexpected errors
      // console.error('Error adding subject:', error);
      throw new InternalServerErrorException(
        'An error occurred while adding the subject.',
      );
    }
  }

  async getSubject() {
    const subjects = await this.prisma.subject.findMany({
      select: {
        name: true,
        id: true,
        gradelevel: { select: { grade: true } },
      },
    });
    return subjects;
  }

  async updateSubjects(dto: UpdateSubjectDto, subId: number) {
    const updateSubject = await this.prisma.subject.update({
      where: { id: subId },
      data: {
        ...dto,
      },
    });

    return {
      msg: 'Updated!',
      data: updateSubject,
    };
  }

  async deleteSubject(id: number) {
    await this.prisma.subject.delete({
      where: { id: id },
    });
  }
}
