import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DtoAdmin, DtoStudent } from './dto';
import PromoteStudentsDto from './dto/promote.students.dto';
import PromoteStudentsNextGradeDto from './dto/promote.students.nextgrade.dto';
import { Student } from '@prisma/client';

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

  async promoteSubjects(students: PromoteStudentsDto[]) {
    for (const student of students) {
      const user_id = student.user_id;
      const gradeId = student.gradeId;
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
    }
    return {
      status: 'Sucess',
      msg: 'All Students subject list promoted',
    };
  }
  async getStudents() {
    // Adjust the return type as per your requirement
    const allStudents = await this.prismaService.student.findMany({
      include: {
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
      include: {
        user: true,
        gradelevel: {
          include: { subject: true, section: true },
        },
        result: true,
      },
    });

    if (!studentWithUser) {
      throw new NotFoundException('Student not found');
    }

    const student = {
      id: studentWithUser.user.id,
      first_name: studentWithUser.user.frist_name,
      middle_name: studentWithUser.user.middle_name,
      last_name: studentWithUser.user.last_name,
      email: studentWithUser.user.email,
      phone: studentWithUser.user.phone,
      createdAT: studentWithUser.user.createdAT,
      grade: studentWithUser.gradelevel,
      results: studentWithUser.result,
      //section: studentWithUser.gradelevel.section,
      //subject: studentWithUser.gradelevel.subject,
      school_Id: studentWithUser.user.school_Id,
    };

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

  async getStudentsInSection(sectionId: number): Promise<Student[]> {
    return this.prismaService.student.findMany({
      where: {
        gradelevel: {
          section: {
            some: {
              id: sectionId,
            },
          },
        },
      },
      include: {
        result: true, // Include the 'result' relation
      },
    });
  }

  async getRank() {
    return await this.prismaService.student.findMany({
      select: {
        user_Id: true,
      },
    });
  }
}
