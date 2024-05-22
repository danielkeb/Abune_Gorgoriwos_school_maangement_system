// result.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ResultService } from './result.service';
import { NotFoundException, NotAcceptableException } from '@nestjs/common';
import { AddResultkDto } from './dto';

describe('ResultService', () => {
  let service: ResultService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResultService,
        {
          provide: PrismaService,
          useValue: {
            subject: {
              findUnique: jest.fn(),
            },
            result: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ResultService>(ResultService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addMark', () => {
    const dto: AddResultkDto = {
      studentId: 1,
      subjectId: 1,
      test1: 80,
      assignmentScore1: 85,
      midtermScore1: 75,
      finalExamScore1: 90,
      totalScore1: 82,
      gradeLevelId: 0,
      teacherId: 0,
    };

    it('should throw NotFoundException if subject does not exist', async () => {
      (prismaService.subject.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.addMark(dto)).rejects.toThrow(
        new NotFoundException('Subject does not exist'),
      );
    });

    it('should create a result and return success message', async () => {
      (prismaService.subject.findUnique as jest.Mock).mockResolvedValue({
        id: dto.subjectId,
      });

      (prismaService.result.create as jest.Mock).mockResolvedValue({});

      await expect(service.addMark(dto)).resolves.toEqual({
        msg: 'Result Created!',
      });
    });

    it('should throw NotAcceptableException if result creation fails due to unique constraint', async () => {
      (prismaService.subject.findUnique as jest.Mock).mockResolvedValue({
        id: dto.subjectId,
      });

      (prismaService.result.create as jest.Mock).mockRejectedValue(
        new Error('Unique constraint failed'),
      );

      await expect(service.addMark(dto)).rejects.toThrow(
        new NotAcceptableException('student id and subject id must be unique'),
      );
    });
  });
});
