import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GradeLevel } from './dto';

// Enum defining class types

@Injectable()
export class GradeLevelService {
  constructor(private prismaService: PrismaService) {}

  async addGradeLevel(schoolId: number, dto: GradeLevel) {
    try {
      // Append schoolId to the grade
      const grade = `${dto.grade}-${schoolId}`;

      // Check if the grade already exists
      const existingGrade = await this.prismaService.gradeLevel.findUnique({
        where: {
          schoolId: schoolId,
          gradewithschool: grade,
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
          schoolId: schoolId,
          gradewithschool: grade,
        },
      });

      // Create a section for the new grade level
      const newSection = await this.prismaService.section.create({
        data: {
          name: 'A class', // Use the grade as the section name
          gradeId: newGradeLevel.id,
          schoolId: schoolId, // Associate the section with the newly created grade level
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
        classType: dto.classType,
      },
    });
    return updateGrade;
  }

  // async manageGradeLevel() {
  //   const classes = await this.prismaService.gradeLevel.findMany();
  //   return classes;
  // }

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

  async getGradeLevel(school_Id: number) {
    const gradeLevels = await this.prismaService.gradeLevel.findMany({
      where: {
        schoolId: school_Id,
      },
      include: {
        teacher: { select: { user_Id: true } },
        section: true,
        subject: true,
      },
    });

    // Remove schoolId from the grade before returning to the frontend
    const processedGradeLevels = gradeLevels.map((gradeLevel) => {
      // Assuming the grade is in the format 'grade-schoolId'
      const originalGrade = gradeLevel.grade.split('-')[0];
      return {
        ...gradeLevel,
        grade: originalGrade,
      };
    });

    return processedGradeLevels;
  }
  async manageGradeLevel(school_Id: number) {
    const classes = await this.prismaService.gradeLevel.findMany({
      where: {
        schoolId: school_Id,
      },
      include: {
        teacher: {
          include: {
            user: { select: { id: true, frist_name: true, last_name: true } },
          },
        },
        section: true,
        subject: true,
      },
    });

    // Remove schoolId from the grade before returning to the frontend
    const processedClasses = classes.map((gradeLevel) => {
      // Assuming the grade is in the format 'grade-schoolId'
      const originalGrade = gradeLevel.grade.split('-')[0];
      return {
        ...gradeLevel,
        grade: originalGrade,
      };
    });

    return processedClasses;
  }
}
