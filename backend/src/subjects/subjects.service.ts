import {
  Injectable,
  NotFoundException,
  // InternalServerErrorException,
  //NotAcceptableException,
  //NotFoundException,
} from '@nestjs/common';
import { AddSubjectsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSubjectDto } from './dto/update.subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  async addSubject(
    school_id: number,
    dto: AddSubjectsDto,
  ): Promise<{ msg: string; addSubject?: any }> {
    try {
      const { gradeId, name } = dto;

      // Check if gradeId exists
      const gradeLevel = await this.prisma.gradeLevel.findUnique({
        where: {
          id: gradeId,
        },
      });

      if (!gradeLevel) {
        return {
          msg: 'Grade level does not exist!',
        };
      }

      // Check if a section with the same gradeId and name already exists
      const existingSubject = await this.prisma.subject.findFirst({
        where: {
          gradeId,
          name,
        },
      });

      if (existingSubject) {
        await this.prisma.teacher.update({
          where: { user_Id: dto.teacherId },
          data: {
            subject: {
              connect: { id: existingSubject.id },
            },
          },
        });
        return {
          msg: 'Subject already exists!',
        };
      }

      // If no subject with the same gradeId and name exists, create the new subject
      const addSubject = await this.prisma.subject.create({
        data: {
          name: dto.name,
          gradeId: dto.gradeId,
          teacherId: dto.teacherId,
          schoolId: school_id,
        },
      });

      // Connect the newly created subject to the teacher and grade level
      await this.prisma.teacher.update({
        where: { user_Id: dto.teacherId },
        data: {
          subject: {
            connect: { id: addSubject.id },
          },
        },
      });
      return {
        msg: 'Subject added!',
        addSubject,
      };
    } catch (error) {
      console.error('Error adding section:', error);
      return {
        msg: 'An error occurred while adding the subject.',
      };
    }
  }
  async getSubject(schoolId: number) {
    const subjects = await this.prisma.subject.findMany({
      where: {
        schoolId: schoolId,
      },
      select: {
        name: true,
        id: true,
        gradelevel: {
          select: {
            id: true,
            grade: true,
            teacher: {
              select: {
                user_Id: true,
                gradelevel: { select: { id: true } },
                user: {
                  select: {
                    id: true,
                    frist_name: true, // Corrected spelling
                    last_name: true,
                  },
                },
              },
            },
          },
        },
        teacherId: true, // Include teacherId field
      },
    });

    return subjects;
  }
  async searchSubjects(subj: number, schoolId: number) {
    const searchSubjects = await this.prisma.subject.findUnique({
      where: { id: subj, schoolId: schoolId },
      include: {
        gradelevel: { select: { grade: true } },
        teacher: {
          include: { user: { select: { frist_name: true, last_name: true } } },
        },
      },
    });
    if (!searchSubjects) {
      throw new NotFoundException('Subject not found');
    }
    return searchSubjects;
  }
  async updateSubjects(dto: UpdateSubjectDto, subId: number) {
    const updateSubject = await this.prisma.subject.update({
      where: { id: subId },
      data: {
        ...dto,
      },
    });
    const existingResult = await this.prisma.result.findFirst({
      where: { subjectId: subId }, // Assuming subId is the subjectId you want to update
    });

    if (existingResult) {
      await this.prisma.result.update({
        where: { id: existingResult.id },
        data: {
          teacherId: dto.teacherId,
          // Include other fields you want to update here
        },
      });
    }

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
