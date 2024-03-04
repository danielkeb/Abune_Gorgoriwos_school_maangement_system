import { Injectable, NotFoundException } from '@nestjs/common';
import { SectionAddDto } from './dto/sectionAdd.dto';
import { PrismaService } from 'src/prisma/prisma.service';

// interface StudentResult {
//   totalScore1: number;
//   totalScore2: number;
// }

// interface StudentWithSubjectTotals {
//   result: StudentResult[];
//   careof_contact1: string;
//   careof_contact2: string;
//   user_Id: number;
//   gradeId: number;
//   sectionId: number;
//   subjectTotals: {
//     totalScore1?: number;
//     totalScore2?: number;
//     averageScore?: number;
//   };
// }

@Injectable()
export class SectionService {
  constructor(private prismaService: PrismaService) {}

  async addSection(
    dto: SectionAddDto,
  ): Promise<{ msg: string; addSection?: any }> {
    try {
      const { gradeId, name } = dto;

      // Check if gradeId exists
      const gradeLevel = await this.prismaService.gradeLevel.findUnique({
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
      const existingSection = await this.prismaService.section.findFirst({
        where: {
          gradeId,
          name,
        },
      });

      if (existingSection) {
        return {
          msg: 'Section already exists!',
        };
      }

      // If no section with the same gradeId and name exists, create the new section
      const addSection = await this.prismaService.section.create({
        data: {
          ...dto,
        },
      });

      return {
        msg: 'Section added!',
        addSection,
      };
    } catch (error) {
      console.error('Error adding section:', error);
      return {
        msg: 'An error occurred while adding the section.',
      };
    }
  }

  async getSection(): Promise<any[]> {
    try {
      const getSection = await this.prismaService.section.findMany({
        select: {
          gradeId: true,
          name: true,
          gradelevel: { select: { grade: true, student: true } },
        },
      });
      return getSection;
    } catch (error) {
      console.error('Error fetching sections:', error);
      return [];
    }
  }

  // async getStudentRanking(secid: number): Promise<{
  //   [userId: number]: {
  //     rankTotalScore1: number;
  //     rankTotalScore2: number;
  //     rankTotalSemester: number;
  //   };
  // }> {
  //   try {
  //     const std = await this.prismaService.section.findUnique({
  //       where: {
  //         id: secid,
  //       },
  //       select: {
  //         gradeId: true,
  //         name: true,
  //         gradelevel: {
  //           select: {
  //             grade: true,
  //             student: {
  //               select: {
  //                 result: true,
  //                 careof_contact1: true,
  //                 careof_contact2: true,
  //                 user_Id: true,
  //                 gradeId: true,
  //                 sectionId: true,
  //                 subjectTotals: {
  //                   select: {
  //                     totalScore1: true,
  //                     totalScore2: true,
  //                     averageScore: true,
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });

  //     if (!std) {
  //       throw new NotFoundException('Section not found');
  //     }

  //     const studentsWithData: StudentWithSubjectTotals[] =
  //       std.gradelevel.student.filter((student) => {
  //         const hasResult = student.result.length > 0;
  //         const hasSubjectTotals =
  //           student.subjectTotals &&
  //           Object.keys(student.subjectTotals).length > 0;
  //         return hasResult && hasSubjectTotals;
  //       });

  //     const studentRanks = {};

  //     for (const student of studentsWithData) {
  //       const rankTotalScore1 = this.calculateRank(
  //         studentsWithData,
  //         'totalScore1',
  //         student.subjectTotals.totalScore1,
  //       );
  //       const rankTotalScore2 = this.calculateRank(
  //         studentsWithData,
  //         'totalScore2',
  //         student.subjectTotals.totalScore2,
  //       );
  //       const rankTotalSemester = this.calculateRank(
  //         studentsWithData,
  //         'averageScore',
  //         student.subjectTotals.averageScore,
  //       );
  //       studentRanks[student.user_Id] = {
  //         rankTotalScore1,
  //         rankTotalScore2,
  //         rankTotalSemester,
  //       };

  //       // Update student record with ranks and wait for the result
  //       const updatedStudent = await this.prismaService.student.update({
  //         where: {
  //           user_Id: student.user_Id,
  //         },
  //         data: {
  //           rank_simester1: rankTotalScore1.toString(),
  //           rank_simester2: rankTotalScore2.toString(),
  //           rank_both_simester1: rankTotalSemester.toString(),
  //         },
  //       });

  //       console.log(updatedStudent);
  //     }

  //     return studentRanks;
  //   } catch (e) {
  //     console.error('Error fetching student rankings:', e);
  //     throw e;
  //   }
  // }
  // calculateRank(
  //   scores: StudentWithSubjectTotals[],
  //   totalScore: string,
  //   studentScore: number,
  // ): number {
  //   let rank = 1;
  //   scores.forEach((score) => {
  //     if (
  //       score.subjectTotals &&
  //       score.subjectTotals[totalScore] > studentScore
  //     ) {
  //       rank++;
  //     }
  //   });
  //   return rank;
  // }
}
