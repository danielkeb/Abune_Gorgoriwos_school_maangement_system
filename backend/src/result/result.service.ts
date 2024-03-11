import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddResultkDto, UpdateResultDto } from './dto';
import { AddManyResultkDto } from './dto/addmanyresult.dto';

@Injectable()
export class ResultService {
  constructor(private prisma: PrismaService) {}

  async addMark(dto: AddResultkDto) {
    const sunjectid = await this.prisma.subject.findUnique({
      where: {
        id: dto.subjectId,
      },
    });
    if (!sunjectid) {
      throw new NotFoundException('Subject does not exist');
    }
    try {
      await this.prisma.result.create({
        data: {
          ...dto,
        },
      });
    } catch (e) {
      throw new NotAcceptableException(
        'student id and subject id must be unique',
      );
    }

    return {
      msg: 'Result Created!',
    };
  }

  async updateMark(
    dto: UpdateResultDto,
    resultId: number,
    teacherId: number,
    gradeId: number,
    sectionId: number,
    subjectId: number,
  ) {
    const marksheet = await this.prisma.result.update({
      where: { id: resultId },
      data: {
        test1: dto.test1,
        assignmentScore1: dto.assignmentScore1,
        midtermScore1: dto.midtermScore1,
        finalExamScore1: dto.finalExamScore1,
        totalScore1: dto.totalScore1,

        test2: dto.test2,
        assignmentScore2: dto.assignmentScore2,
        midtermScore2: dto.midtermScore2,
        finalExamScore2: dto.finalExamScore2,
        totalScore2: dto.totalScore2,


        teacherId:dto.teacherId,
        gradeLevelId:dto.gradeLevelId,
        subjectId:dto.subjectId
      },
    });

    return {
      msg: 'Marksheet Updated',
      // data: marksheet,
    };
  }
  async getTeacherResult(
    id: number,
    gradeId: number,
    sectionId: number,
    subjectId: number,
  ) {
    const res = await this.prisma.result.findMany({
      where: {
        teacherId: id,
        subjectId: subjectId,
        sectionId: sectionId,
        gradeLevelId: gradeId,
      },
      include: {
        student: {
          select: { user: { select: { frist_name: true, last_name: true } } },
        },
      },
    });
    if (res) {
      const ready = res.map((r) => ({
        id: r.id,
        test1: r.test1,
        assignmentScore1: r.assignmentScore1,
        midtermScore1: r.midtermScore1,
        finalExamScore1: r.finalExamScore1,
        totalScore1: r.totalScore1,
        test2: r.test2,
        assignmentScore2:r.assignmentScore2 ,
        midtermScore2: r.midtermScore2,
        finalExamScore2: r.finalExamScore2,
        totalScore2: r.totalScore2,
        sectionId: r.sectionId,
        teacherId: r.teacherId,
        studentId: r.studentId,
        subjectId: r.subjectId,
        gradeLevelId:r.gradeLevelId,
        first_name: r.student.user.frist_name,
        last_name: r.student.user.last_name,
      }));
      return ready;
    } else {
      return {
        status: false,
        msg: 'Not found ',
      };
    }
  }
  async addManyResult(
    results: AddManyResultkDto[],
    gradeLevelId: number,
    teacherId: number,
    subjectId: number,
  ) {
    const incompleteStudents: string[] = [];

    for (const result of results) {
      // Check for incomplete or null fields
      if (
        result.test1 === null ||
        result.assignmentScore1 === null ||
        result.midtermScore1 === null ||
        result.finalExamScore1 === null ||
        result.totalScore1 === null
      ) {
        // Log an error or store the student ID in incompleteStudents array
        const errorMessage = `Incomplete data for student with id: ${result.studentId}`;
        incompleteStudents.push(errorMessage);
        // Skip to the next iteration
        continue;
      }

      // Process the result and save it to the database
      const savedResult = await this.prisma.result.create({
        data: {
          test1: result.test1,
          assignmentScore1: result.assignmentScore1,
          midtermScore1: result.midtermScore1,
          finalExamScore1: result.finalExamScore1,
          totalScore1: result.totalScore1,
          teacherId: teacherId,
          studentId: result.studentId,
          subjectId: subjectId,
          gradeLevelId: gradeLevelId,
        },
      });

      // Continue with additional processing if needed
    }

    // After the loop, you can return the list of incomplete students if necessary
    return { msg: 'students grade submitted', incomplete: incompleteStudents };
  }
}
