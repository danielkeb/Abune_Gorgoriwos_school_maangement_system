import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GradeLevel } from './dto';

@Injectable()
export class GradeLevelService {
  constructor(private prismaService: PrismaService) {}

  async addGradeLevel(dto: GradeLevel) {
    try {
      // Check if the grade already exists
      const existingGrade = await this.prismaService.gradeLevel.findUnique({
        where: {
          grade: dto.grade,
        },
      });
      if (existingGrade) {
        throw new ForbiddenException('Grade already exists');
      }

      // Create the grade level
      const newGradeLevel = await this.prismaService.gradeLevel.create({
        data: {
          grade: dto.grade,
          classType: dto.classType, // Set classType if provided
        },
      });

      // Create a section for the new grade level
      const newSection = await this.prismaService.section.create({
        data: {
          name: 'A class', // Use the grade as the section name
          gradeId: newGradeLevel.id, // Associate the section with the newly created grade level
        },
      });

      return { newGradeLevel, newSection };
    } catch (error) {
      console.error('Error adding grade level:', error);
      throw new Error(
        'An error occurred while adding the grade level and section.',
      );
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
      },
    });
    return updateGrade;
  }



  async manageGradeLevel() {
    const classes = await this.prismaService.gradeLevel.findMany();
    return classes;
  }






  // async updateGradeLevel(gradeId: number, dto: GradeLevel) {
  //   // update the gradeLevel
  //   const updateGrade = await this.prismaService.gradeLevel.update({
  //     where: {
  //       id: gradeId,
  //     },
  //     data: {
  //       grade: dto.grade,
  //     },
  //   });
  //   return updateGrade;
  // }

  async getGradeLevel() {
    const gradeLevels = await this.prismaService.gradeLevel.findMany({
      include: { section: true, subject: true },
    });

    return gradeLevels;
  }
}



























































