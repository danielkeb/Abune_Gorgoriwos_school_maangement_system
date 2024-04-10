import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DtoAdmin, DtoStudent } from './dto';
//import PromoteStudentsDto from './dto/promote.students.dto';
import PromoteStudentsNextGradeDto from './dto/promote.students.nextgrade.dto';

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

  async getStudentbygrade(
    schoolId: number,
    gradeId: number,
    sectionId: number,
    subjectId: number,
  ) {
    const students = await this.prismaService.student.findMany({
      where: {
        user: {
          school_Id: schoolId,
        },
        gradeId: gradeId,
        sectionId: sectionId,
        subject: {
          some: {
            id: subjectId,
          },
        },
      },
      select: {
        result: {
          select: {
            assignmentScore1: true,
            midtermScore1: true,
            finalExamScore1: true,
            totalScore1: true,
            subjectId: true,
          },
        },

        user_Id: true,
        user: {
          select: {
            id: true,
            frist_name: true,
            middle_name: true,
          },
        },
      },
    });

    // return students.map((student) => ({
    //   id: student.user_Id,
    //   firstName: student.user.frist_name,
    //   lastName: student.user.middle_name,
    //   assignmentScore:student.result.map((r)=>r.assignmentScore)

    // }));

    return students;
  }

  async promoteStudents(students: PromoteStudentsNextGradeDto[]) {
    try {
      // Start a transaction
      const incompleteStudents: string[] = [];
      await this.prismaService.$transaction(async (prisma) => {
        for (const student of students) {
          const user_id = student.user_id;
          const gradeId = student.gradeId;
          const sectionId = student.sectionId;

          // Step 1: Fetch Student Results
          const studentResults = await prisma.result.findMany({
            where: { studentId: user_id },
            include: {
              student: true,
              subject: true,
              gradeLevel: true,
              teacher: true,
            },
          });

          // // Filter students with a totalScore greater than 50
          // const totalScores = studentResults.map(
          //   (result) => result.totalScore1,
          // );
          // const averageTotalScore =
          //   totalScores.reduce((sum, score) => sum + score, 0) /
          //   totalScores.length;

          // // Filter students based on the average total score
          // const eligibleStudents = averageTotalScore > 50 ? studentResults : [];

          // Calculate the average total score
          const totalScores1 = studentResults.map(
            (result) => result.totalScore1 || 0,
          );
          const totalScores2 = studentResults.map(
            (result) => result.totalScore2 || 0,
          );

          if (
            totalScores1.some((score) => score === 0) ||
            totalScores2.some((score) => score === 0)
          ) {
            const errorMessage = `Incomplete data for student with id: ${user_id}`;
            console.error(errorMessage);
            incompleteStudents.push(errorMessage);
            continue;
          }
          const totalScores = totalScores1.map(
            (score, index) => (score + totalScores2[index]) / 2,
          );

          const averageTotalScore =
            totalScores.reduce((sum, score) => sum + score, 0) /
            totalScores.length;

          // Filter students based on the average total score
          const eligibleStudents = averageTotalScore > 50 ? studentResults : [];

          // Step 2: Prepare Data for Student History
          const historyData = {
            studentId: studentResults[0].studentId, // Use the studentId from the first result
            gradeId: studentResults[0].gradeLevelId, // Use the gradeId from the first result
            sectionId: studentResults[0].student.sectionId, // Use the sectionId from the first result
            totalScore: averageTotalScore, // Use the calculated average
            subjectScores: {}, // Initialize an empty object to store subject scores
          };

          // Iterate over each subject and add it to subjectScores
          for (const result of studentResults) {
            const subject = await prisma.subject.findUnique({
              where: { id: result.subjectId },
            });
            historyData.subjectScores[subject?.name || 'Unknown'] =
              result.totalScore1;
          }

          // Insert into Student History
          await prisma.studentHistory.create({
            data: historyData,
          });

          // Step 4: Remove records from Result table
          const resultIdsToRemove = studentResults.map((result) => result.id);

          await prisma.result.deleteMany({
            where: {
              id: {
                in: resultIdsToRemove,
              },
            },
          });

          // Step 5: Update Student table with new gradeId and sectionId
          if (eligibleStudents.length > 0) {
            await prisma.student.update({
              where: { user_Id: user_id },
              data: {
                gradeId: gradeId,
                sectionId: sectionId,
              },
            });
          }
        }
      });

      return {
        status: 'Success',
        msg: 'Eligible students promoted to the new grade',
        incompleteStudents,
      };
    } catch (error) {
      console.error('Error promoting students:', error);
      return {
        status: 'Error',
        msg: 'An error occurred while promoting students',
      };
    }
  }

  // async associateSubjectsAndCreateResults(
  // async promoteStudents(students: PromoteStudentsNextGradeDto[]) {
  //   for (const student of students) {
  //     const user_id = student.user_id;
  //     const gradeId = student.gradeId;
  //     const sectionId = student.sectionId;

  //     // Step 1: Fetch Student Results
  //     const studentResults = await this.prismaService.result.findMany({
  //       where: { studentId: user_id },
  //       include: {
  //         student: true,
  //         subject: true,
  //         gradeLevel: true,
  //         teacher: true,
  //       },
  //     });

  //     // Filter students with a totalScore greater than 50
  //     const eligibleStudents = studentResults.filter(
  //       (result) => result.totalScore > 50,
  //     );

  //     // Step 2: Prepare Data for Student History
  //     const historyData = studentResults.map((result) => ({
  //       studentId: result.studentId,
  //       gradeId: result.gradeLevelId,
  //       sectionId: result.student.sectionId,
  //       totalScore: result.totalScore,
  //       subjectId: result.subjectId,
  //     }));

  //     // Step 3: Insert into Student History
  //     await this.prismaService.studentHistory.createMany({
  //       data: historyData,
  //     });

  //     // Step 4: Remove records from Result table
  //     const resultIdsToRemove = studentResults.map((result) => result.id);

  //     await this.prismaService.result.deleteMany({
  //       where: {
  //         id: {
  //           in: resultIdsToRemove,
  //         },
  //       },
  //     });

  //     // Step 5: Update Student table with new gradeId and sectionId
  //     if (eligibleStudents.length > 0) {
  //       await this.prismaService.student.update({
  //         where: { user_Id: user_id },
  //         data: {
  //           gradeId: gradeId,
  //           sectionId: sectionId,
  //         },
  //       });
  //     }

  //     /*************************************** */

  //     /*********************************************** */
  //   }

  //   return {
  //     Status: 'Sucess',
  //     msg: 'Students promoted to new grade ',
  //   };
  // }
  async associateSubjezctsAndCreateResults(
    userId: number,
    gradeId: number,
    sectionId: number,
  ): Promise<void> {
    // Step 1: Get subjects associated with the grade
    const subjects = await this.prismaService.subject.findMany({
      where: { gradeId: gradeId },
    });

    // Step 2: Associate subjects with the student
    await this.prismaService.student.update({
      where: { user_Id: userId },
      data: {
        subject: {
          connect: subjects.map((subject) => ({ id: subject.id })),
        },
      },
    });

    // Step 3: Create result records for each associated subject
    for (const subject of subjects) {
      // Get the teacherId associated with the subject, or set it to null if not available
      const teacherId = subject.teacherId || null;

      // Create a result record for the student, subject, and grade
      await this.prismaService.result.create({
        data: {
          studentId: userId,
          subjectId: subject.id,
          gradeLevelId: gradeId,
          sectionId: sectionId,
          teacherId: teacherId,
        },
      });
    }
  }

  async associateSubjects(userId: number, gradeId: number) {
    const subjects = await this.prismaService.subject.findMany({
      where: { gradeId: gradeId },
    });

    await this.prismaService.student.update({
      where: { user_Id: userId },
      data: {
        subject: {
          connect: subjects.map((subject) => ({ id: subject.id })),
        },
      },
    });
  }

  async promoteSubjects(students: PromoteStudentsNextGradeDto[]) {
    for (const student of students) {
      const user_id = student.user_id;
      const gradeId = student.gradeId;
      const sectionId = student.sectionId;
      const existingSubjects = await this.prismaService.student
        .findUnique({ where: { user_Id: user_id }, include: { subject: true } })
        .then((student) => student?.subject);

      // Step 2: Delete Existing Subjects
      if (existingSubjects) {
        const subjectIdsToRemove = existingSubjects.map((subject) => ({
          id: subject.id,
        }));
        await this.prismaService.student.update({
          where: { user_Id: user_id },
          data: { subject: { disconnect: subjectIdsToRemove } },
        });
      }
      await this.associateSubjects(user_id, gradeId);
      await this.associateSubjectsAndCreateResults(user_id, gradeId, sectionId);
    }
    return {
      status: 'Sucess',
      msg: 'All Students subject list promoted',
    };
  }
  async associateSubjectsAndCreateResults(
    userId: number,
    gradeId: number,
    sectionId: number,
  ): Promise<void> {
    // Step 1: Get subjects associated with the grade
    const subjects = await this.prismaService.subject.findMany({
      where: { gradeId: gradeId },
    });

    // Step 2: Associate subjects with the student
    await this.prismaService.student.update({
      where: { user_Id: userId },
      data: {
        subject: {
          connect: subjects.map((subject) => ({ id: subject.id })),
        },
      },
    });
    // Step 3: Create result records for each associated subject
    for (const subject of subjects) {
      // Get the teacherId associated with the subject, or set it to null if not available
      const teacherId = subject.teacherId;

      // Create a result record for the student, subject, and grade
      await this.prismaService.result.create({
        data: {
          studentId: userId,
          subjectId: subject.id,
          gradeLevelId: gradeId,
          sectionId: sectionId,
          teacherId: teacherId,
        },
      });
    }
  }

  async getStudents() {
    // Adjust the return type as per your requirement
    const allStudents = await this.prismaService.student.findMany({
      select: {
        user: true,
        gradelevel: {
          include: { subject: true, section: true },
        },
        result: {
          select: {
            totalScore1: true,
            totalScore2: true,
          },
        },
        firstrank: true,
        secondtrank: true,
        overallrank: true,
      },
    });

    const studentsWithMergedUser = allStudents.map((student) => {
      return {
        id: student.user.id,
        frist_name: student.user.frist_name,
        middle_name: student.user.middle_name,
        last_name: student.user.last_name,
        email: student.user.email,
        phone: student.user.phone,
        createdAT: student.user.createdAT,
        grade: student.gradelevel,
        results: student.result,
        firstrank: student.firstrank,
        secondtrank: student.secondtrank,
        overallrank: student.overallrank,
        //section: student.gradelevel,
        //subject: student.gradelevel,
        school_Id: student.user.school_Id, // Add school_Id to the return object
      };
    });

    return studentsWithMergedUser;
  }
  async getStudent(std: number) {
    const studentWithUser = await this.prismaService.student.findUnique({
      where: {
        user_Id: std,
      },
      select: {
        user: { include: { school: { select: { school_name: true } } } },
        gradelevel: {
          include: { subject: true, section: true },
        },
        result: true,
        firstrank: true,
        secondtrank: true,
        overallrank: true,
      },
    });

    if (!studentWithUser) {
      throw new NotFoundException('Student not found');
    }

    const student: any = {
      id: studentWithUser.user.id,
      first_name: studentWithUser.user.frist_name,
      middle_name: studentWithUser.user.middle_name,
      last_name: studentWithUser.user.last_name,
      email: studentWithUser.user.email,
      phone: studentWithUser.user.phone,
      createdAT: studentWithUser.user.createdAT,
      grade: studentWithUser.gradelevel,
      results: studentWithUser.result,
      school_name: studentWithUser.user.school.school_name,
      // Add conditions to check if ranks exist before assigning them
    };

    // Check if ranks exist before assigning them
    if (studentWithUser.firstrank) {
      student.firstrank = studentWithUser.firstrank;
    }
    if (studentWithUser.secondtrank) {
      student.secondtrank = studentWithUser.secondtrank;
    }
    if (studentWithUser.overallrank) {
      student.overallrank = studentWithUser.overallrank;
    }

    // Return the student object
    return student;
  }

  async getResult(userid: number) {
    const result = await this.prismaService.student.findUnique({
      where: {
        user_Id: userid,
      },
      include: {
        result: true,
      },
    });
    return result;
  }

  async calculateRankForAll(students: PromoteStudentsNextGradeDto[]) {
    try {
      const incompleteStudents: string[] = [];
      const rankedStudents: {
        user_id: number;
        rank: number;
        averageTotalScore: number;
      }[] = [];

      // Iterate over each student in the input array
      for (const student of students) {
        const user_id = student.user_id;

        // Fetch student results
        const studentResults = await this.prismaService.result.findMany({
          where: { studentId: user_id },
        });

        // Calculate the average total score
        const totalScores = studentResults.map(
          (result) => (result.totalScore1 + result.totalScore2) / 2 || 0,
        );

        // Check for incomplete data
        if (totalScores.some((score) => score === 0)) {
          const errorMessage = `Incomplete data for student with id: ${user_id}`;
          console.error(errorMessage);
          incompleteStudents.push(errorMessage);
          continue;
        }

        // Calculate the average total score
        const averageTotalScore =
          totalScores.reduce((sum, score) => sum + score, 0) /
          totalScores.length;

        // Push the student and their average score to the rankedStudents array
        rankedStudents.push({ user_id, averageTotalScore, rank: 0 });
      }

      // Sort the rankedStudents array by averageTotalScore in descending order
      // If scores are equal, use user ID as a tiebreaker
      rankedStudents.sort((a, b) => {
        if (a.averageTotalScore !== b.averageTotalScore) {
          return b.averageTotalScore - a.averageTotalScore;
        } else {
          return a.user_id - b.user_id;
        }
      });

      // Add ranks to the sorted array
      for (let i = 0; i < rankedStudents.length; i++) {
        rankedStudents[i].rank = i + 1;
      }
      for (const rankedStudent of rankedStudents) {
        await this.prismaService.student.update({
          where: { user_Id: rankedStudent.user_id },
          data: {
            overallrank: rankedStudent.rank,
          },
        });
      }

      // Return the result
      return {
        status: 'Success',
        msg: 'Ranking completed successfully',
        incompleteStudents,
        rankedStudents,
      };
    } catch (error) {
      console.error('Error calculating rank:', error);
      return {
        status: 'Error',
        msg: 'An error occurred while calculating rank',
        incompleteStudents: [],
        rankedStudents: [],
      };
    }
  }
  async calculateRankForFirst(students: PromoteStudentsNextGradeDto[]) {
    try {
      const incompleteStudents: string[] = [];
      const rankedStudents: {
        user_id: number;
        rank: number;
        averageTotalScore: number;
      }[] = [];

      // Iterate over each student in the input array
      for (const student of students) {
        const user_id = student.user_id;

        // Fetch student results
        const studentResults = await this.prismaService.result.findMany({
          where: { studentId: user_id },
        });

        // Calculate the average total score for the first semester (totalScore1)
        const totalScores1 = studentResults.map(
          (result) => result.totalScore1 || 0,
        );

        // Check for incomplete data
        if (totalScores1.some((score) => score === 0)) {
          const errorMessage = `Incomplete data for student with id: ${user_id}`;
          console.error(errorMessage);
          incompleteStudents.push(errorMessage);
          continue;
        }

        // Calculate the average total score for the first semester

        const averageTotalScore =
          totalScores1.reduce((sum, score) => sum + score, 0) /
          totalScores1.length;

        // Push the student and their average score to the rankedStudents array
        rankedStudents.push({ user_id, averageTotalScore, rank: 0 });
      }

      // Sort the rankedStudents array by averageTotalScore in descending order
      // If scores are equal, use user ID as a tiebreaker
      rankedStudents.sort((a, b) => {
        if (a.averageTotalScore !== b.averageTotalScore) {
          return b.averageTotalScore - a.averageTotalScore;
        } else {
          return a.user_id - b.user_id;
        }
      });

      // Add ranks to the sorted array
      for (let i = 0; i < rankedStudents.length; i++) {
        rankedStudents[i].rank = i + 1;
      }
      for (const rankedStudent of rankedStudents) {
        await this.prismaService.student.update({
          where: { user_Id: rankedStudent.user_id },
          data: {
            firstrank: rankedStudent.rank,
          },
        });
      }
      // Return the result
      return {
        status: 'Success',
        msg: 'Ranking completed successfully',
        incompleteStudents,
        rankedStudents,
      };
    } catch (error) {
      console.error('Error calculating rank:', error);
      return {
        status: 'Error',
        msg: 'An error occurred while calculating rank',
        incompleteStudents: [],
        rankedStudents: [],
      };
    }
  }

  async calculateRankForSecond(students: PromoteStudentsNextGradeDto[]) {
    try {
      const incompleteStudents: string[] = [];
      const rankedStudents: {
        user_id: number;
        rank: number;
        averageTotalScore: number;
      }[] = [];

      // Iterate over each student in the input array
      for (const student of students) {
        const user_id = student.user_id;

        // Fetch student results
        const studentResults = await this.prismaService.result.findMany({
          where: { studentId: user_id },
        });

        // Calculate the average total score for the first semester (totalScore1)
        const totalScores2 = studentResults.map(
          (result) => result.totalScore2 || 0,
        );

        // Check for incomplete data
        if (totalScores2.some((score) => score === 0)) {
          const errorMessage = `Incomplete data for student with id: ${user_id}`;
          console.error(errorMessage);
          incompleteStudents.push(errorMessage);
          continue;
        }

        // Calculate the average total score for the first semester

        const averageTotalScore =
          totalScores2.reduce((sum, score) => sum + score, 0) /
          totalScores2.length;

        // Push the student and their average score to the rankedStudents array
        rankedStudents.push({ user_id, averageTotalScore, rank: 0 });
      }

      // Sort the rankedStudents array by averageTotalScore in descending order
      // If scores are equal, use user ID as a tiebreaker
      rankedStudents.sort((a, b) => {
        if (a.averageTotalScore !== b.averageTotalScore) {
          return b.averageTotalScore - a.averageTotalScore;
        } else {
          return a.user_id - b.user_id;
        }
      });

      // Add ranks to the sorted array
      for (let i = 0; i < rankedStudents.length; i++) {
        rankedStudents[i].rank = i + 1;
      }
      for (const rankedStudent of rankedStudents) {
        await this.prismaService.student.update({
          where: { user_Id: rankedStudent.user_id },
          data: {
            secondtrank: rankedStudent.rank,
          },
        });
      }
      // Return the result
      return {
        status: 'Success',
        msg: 'Ranking completed successfully',
        incompleteStudents,
        rankedStudents,
      };
    } catch (error) {
      console.error('Error calculating rank:', error);
      return {
        status: 'Error',
        msg: 'An error occurred while calculating rank',
        incompleteStudents: [],
        rankedStudents: [],
      };
    }
  }

  async getStudentsForAdmin(
    schoolId: number,
    gradeId: number,
    sectionId: number,
  ) {
    const stud = await this.prismaService.student.findMany({
      where: {
        user: { school_Id: schoolId },
        gradeId: gradeId,
        sectionId: sectionId,
      },
      select: {
        user: true,
        careof_contact1: true,
        gradeId: true,
        sectionId: true,
      },
    });
    const filterdList = stud.map((s) => ({
      id: s.user.id,
      first_name: s.user.frist_name,
      middle_name: s.user.middle_name,
      last_name: s.user.last_name,
      email: s.user.email,
      address: s.user.address,
      phone: s.user.phone,

      date_of_birth: s.user.date_of_birth,
      school_Id: s.user.school_Id,

      careof_contact1: s.careof_contact1,
      gradeId: s.gradeId,
      sectionId: s.sectionId,
    }));
    return filterdList;
  }
}
