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

  async updateMark(dto: UpdateResultDto, resultId: number) {
    const marksheet = await this.prisma.result.update({
      where: { id: resultId },
      data: { ...dto },
    });

    return {
      msg: 'Marksheet Updated',
      data: marksheet,
    };
  }
  async deleteResult(resultId: number) {
    const delt = await this.prisma.result.delete({
      where: {
        id: resultId,
      },
    });
    if (!delt) {
      throw new NotAcceptableException('Delete failed');
    }
    return { msg: `user ${resultId} deleted successfully` };
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
