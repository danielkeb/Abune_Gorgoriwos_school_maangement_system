import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddResultkDto, UpdateResultDto } from './dto';

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
}
