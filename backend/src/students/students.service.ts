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
    const findeSec = await this.prismaService.section.findMany({
      where: { gradeId: dto.gradeId, name: dto.section },
    });
    const updateTableUser = await this.prismaService.user.update({
      where: { id: studentId },
      data: {
        frist_name: dto.frist_name,
        middle_name: dto.middle_name,
        last_name: dto.last_name,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        date_of_birth: dto.date_of_birth,
      },
    });

    await this.prismaService.student.update({
      where: { user_Id: studentId },
      data: {
        careof_contact1: dto.careof_contact1,
        sectionId: findeSec[0].id ?? dto.sectionId,
      },
    });

    return {
      msg: 'Student Updated',
    };
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
          const user_id = student.user_Id;
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
          // const totalScores_one = totalScores1.map(
          //   (score, index) => (score + totalScores2[index]) / 2,
          // );
          // const totalScores_two = totalScores1.map(
          //   (score, index) => (score + totalScores2[index]) / 2,
          // );

          

          // const averageTotalScore_one =
          //   totalScores_one.reduce((sum, score) => sum + score, 0) /
          //   totalScores_one.length;
          // const averageTotalScore_two =
          //   totalScores_two.reduce((sum, score) => sum + score, 0) /
          //   totalScores_two.length;  

          // Filter students based on the average total score
          const getInfo = await this.prismaService.student.findUnique({
            where: { user_Id: user_id },
            select: { overallScore: true,firstScore:true,secondScore:true,firstrank:true,secondtrank:true,overallrank:true },
          });
          const eligibleStudents = getInfo.overallScore > 50 ? true : false;
          // averageTotalScore > 50 ? studentResults : [];

          // Step 2: Prepare Data for Student History
          const historyData = {
            studentId: user_id,
            gradeId: gradeId,
            sectionId: sectionId,
            totalScore1: getInfo.firstScore,
            totalScore2: getInfo.secondScore,
            overallScore: getInfo.overallScore,
            firstRank:getInfo.firstrank,
            secondRank:getInfo.secondtrank,
            overallRank:getInfo.overallrank,
            subjectScores: await Promise.all(studentResults.map(async (result) => {
              const subject = await prisma.subject.findUnique({
                where: { id: result.subjectId },
              });
              return {
                subject: subject?.name || 'Unknown',
                totalScore1: result.totalScore1,
                totalScore2: result.totalScore2,
                average: (result.totalScore1 + result.totalScore2) / 2,
              };
            })),
          };




          // const historyData = {
          //   studentId: studentResults[0].studentId, // Use the studentId from the first result
          //   gradeId: studentResults[0].gradeLevelId, // Use the gradeId from the first result
          //   sectionId: studentResults[0].student.sectionId, // Use the sectionId from the first result
          //   totalScore: averageTotalScore, // Use the calculated average
          //   subjectScores: {}, // Initialize an empty object to store subject scores
          // };

          // // Iterate over each subject and add it to subjectScores
          // for (const result of studentResults) {
          //   const subject = await prisma.subject.findUnique({
          //     where: { id: result.subjectId },
          //   });
          //   historyData.subjectScores[subject?.name || 'Unknown'] =
          //     result.totalScore1;
          // }

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
          if (eligibleStudents) {
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
      const user_id = student.user_Id;
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
      //await this.associateSubjects(user_id, gradeId);
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
        user: {
          // Exclude the password field
          select: {
            id: true,
            frist_name: true,
            middle_name: true,
            last_name: true,
            email: true,
            phone: true,
            gender: true,
            createdAT: true,
            school_Id: true,
          },
        },
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
        gender: student.user.gender,
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
        const user_id = student.user_Id;

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
          return a.user_id - b.user_id; // Tiebreaker: user ID in ascending order
        }
      });

      // Add ranks to the sorted array, considering ties
      let currentRank = 1;
      let previousScore = Infinity;
      let tieCount = 0;
      for (let i = 0; i < rankedStudents.length; i++) {
        const student = rankedStudents[i];
        if (student.averageTotalScore < previousScore) {
          // If the current student has a lower score than the previous one,
          // update the rank, reset the tie count, and update the previous score
          currentRank += tieCount;
          student.rank = currentRank;
          previousScore = student.averageTotalScore;
          tieCount = 1;
        } else if (student.averageTotalScore === previousScore) {
          // If the current student has the same score as the previous one,
          // increment the tie count but don't change the rank
          tieCount++;
          student.rank = currentRank;
        }
      }
      for (const rankedStudent of rankedStudents) {
        await this.prismaService.student.update({
          where: { user_Id: rankedStudent.user_id },
          data: {
            overallrank: rankedStudent.rank,
            overallScore: rankedStudent.averageTotalScore,
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
        user_Id: number;
        rank: number;
        averageTotalScore: number;
      }[] = [];

      // Iterate over each student in the input array
      for (const student of students) {
        const user_Id = student.user_Id;

        // Fetch student results
        const studentResults = await this.prismaService.result.findMany({
          where: { studentId: user_Id },
        });

        // Calculate the average total score for the first semester (totalScore1)
        const totalScores1 = studentResults.map(
          (result) => result.totalScore1 || 0,
        );

        // Check for incomplete data
        if (totalScores1.some((score) => score === 0)) {
          const errorMessage = `Incomplete data for student with id: ${user_Id}`;
          console.error(errorMessage);
          incompleteStudents.push(errorMessage);
          continue;
        }

        // Calculate the average total score for the first semester
        const averageTotalScore =
          totalScores1.reduce((sum, score) => sum + score, 0) /
          totalScores1.length;

        // Push the student and their average score to the rankedStudents array
        rankedStudents.push({ user_Id, averageTotalScore, rank: 0 });
      }

      // Sort the rankedStudents array by averageTotalScore in descending order
      // If scores are equal, use user ID as a tiebreaker

      rankedStudents.sort((a, b) => {
        if (a.averageTotalScore !== b.averageTotalScore) {
          return b.averageTotalScore - a.averageTotalScore;
        } else {
          return a.user_Id - b.user_Id; // Tiebreaker: user ID in ascending order
        }
      });

      // Add ranks to the sorted array, considering ties
      let currentRank = 1;
      let previousScore = Infinity;
      let tieCount = 0;
      for (let i = 0; i < rankedStudents.length; i++) {
        const student = rankedStudents[i];
        if (student.averageTotalScore < previousScore) {
          // If the current student has a lower score than the previous one,
          // update the rank, reset the tie count, and update the previous score
          currentRank += tieCount;
          student.rank = currentRank;
          previousScore = student.averageTotalScore;
          tieCount = 1;
        } else if (student.averageTotalScore === previousScore) {
          // If the current student has the same score as the previous one,
          // increment the tie count but don't change the rank
          tieCount++;
          student.rank = currentRank;
        }
      }

      // Update student ranks in the database
      for (const rankedStudent of rankedStudents) {
        await this.prismaService.student.update({
          where: { user_Id: rankedStudent.user_Id },
          data: {
            firstrank: rankedStudent.rank,
            firstScore: rankedStudent.averageTotalScore,
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
        const user_id = student.user_Id;

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
          return a.user_id - b.user_id; // Tiebreaker: user ID in ascending order
        }
      });

      // Add ranks to the sorted array, considering ties
      let currentRank = 1;
      let previousScore = Infinity;
      let tieCount = 0;
      for (let i = 0; i < rankedStudents.length; i++) {
        const student = rankedStudents[i];
        if (student.averageTotalScore < previousScore) {
          // If the current student has a lower score than the previous one,
          // update the rank, reset the tie count, and update the previous score
          currentRank += tieCount;
          student.rank = currentRank;
          previousScore = student.averageTotalScore;
          tieCount = 1;
        } else if (student.averageTotalScore === previousScore) {
          // If the current student has the same score as the previous one,
          // increment the tie count but don't change the rank
          tieCount++;
          student.rank = currentRank;
        }
      }
      for (const rankedStudent of rankedStudents) {
        await this.prismaService.student.update({
          where: { user_Id: rankedStudent.user_id },
          data: {
            secondtrank: rankedStudent.rank,
            secondScore: rankedStudent.averageTotalScore,
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
        gradelevel: {
          select: {
            section: true,
          },
        },
      },
    });
    const section = await this.prismaService.section.findUnique({
      where: { id: stud[0].sectionId },
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
      section: section.name,
    }));
    return filterdList;
  }

  async getStudentsWith(
    school_id: number,
    gradeId: number,
    sectionId: number,
    semesterId: number,
  ) {
    const students = await this.prismaService.student.findMany({
      where: {
        user: { school_Id: school_id },
        gradeId: gradeId,
        sectionId: sectionId,
      },
      select: { user_Id: true, gradeId: true, sectionId: true },
    });
    if (semesterId == 1) {
      await this.calculateRankForFirst(students);
    } else if (semesterId == 2) {
      await this.calculateRankForSecond(students);
    } else if (semesterId == 3) {
      await this.calculateRankForAll(students);
    }

    return {
      msg: 'Rank Generated!',
    };
  }

  async getStudentsWithForRankDisplay(
    school_id: number,
    gradeId: number,
    sectionId: number,
    semesterId: number,
  ) {
    let tobeSent;

    if (semesterId == 1) {
      tobeSent = await this.prismaService.student.findMany({
        where: {
          user: { school_Id: school_id },
          gradeId: gradeId,
          sectionId: sectionId,
        },
        select: {
          user: { select: { frist_name: true, middle_name: true } },
          firstrank: true,
          firstScore: true,
          user_Id: true,
        },
      });
    } else if (semesterId == 2) {
      tobeSent = await this.prismaService.student.findMany({
        where: {
          user: { school_Id: school_id },
          gradeId: gradeId,
          sectionId: sectionId,
        },
        select: {
          user: { select: { frist_name: true, middle_name: true } },
          secondtrank: true,
          secondScore: true,
          user_Id: true,
        },
      });
    } else if (semesterId == 3) {
      tobeSent = await this.prismaService.student.findMany({
        where: {
          user: { school_Id: school_id },
          gradeId: gradeId,
          sectionId: sectionId,
        },
        select: {
          user: { select: { frist_name: true, middle_name: true } },
          firstrank: true,
          firstScore: true,
          secondtrank: true,
          secondScore: true,
          overallrank: true,
          overallScore: true,
          user_Id: true,
        },
      });
    }

    return tobeSent;
  }

  async getStudentsForPromote(
    school_id: number,
    gradeId: number,
    sectionId: number,
  ) {
    const tobeSent = await this.prismaService.student.findMany({
      where: {
        user: { school_Id: school_id },
        gradeId: gradeId,
        sectionId: sectionId,
      },
      select: {
        user: { select: { frist_name: true, middle_name: true } },
        overallrank: true,
        overallScore: true,
        user_Id: true,
        gradeId: true,
        sectionId: true,
      },
    });
    if (tobeSent.length > 0) {
      if (tobeSent[0].overallScore != null) {
        return tobeSent;
      } else {
        return 'Generate Rank First!!!';
      }
    } else {
      return null;
    }



    
  }




  
  async getStudentResult(id: number) {
    try {
      // Fetch the student's results
      const results = await this.prismaService.result.findMany({
        where: {
          studentId: id,
        },
        include: {
          subject: true,
        },
      });
  
      // Calculate the total score and average score for each semester
      let totalScore1 = 0;
      let totalScore2 = 0;
      let totalResults = 0;
      for (const result of results) {
        totalResults++;
        totalScore1 += result.totalScore1;
        totalScore2 += result.totalScore2;
      }
  
      // Calculate the average score for each semester
      const averageScore1 = totalResults > 0 ? totalScore1 / totalResults : 0;
      const averageScore2 = totalResults > 0 ? totalScore2 / totalResults : 0;
  
      // Prepare the result object
      const studentResult = {
        results,
        totalScore1,
        totalScore2,
        averageScore1,
        averageScore2,
      };
  
      return studentResult;
    } catch (error) {
      throw new Error(`Error fetching student results: ${error}`);
    }
  }
  
}
