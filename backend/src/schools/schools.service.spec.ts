import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsService } from './schools.service';
import { PrismaService } from '../prisma/prisma.service';
import { DtoSchool } from './dto';

const mockPrismaService = {
  school: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  },
  user: {
    findMany: jest.fn(),
  },
};

type MockPrismaService = {
  school: {
    create: jest.Mock<any, any>;
    findUnique: jest.Mock<any, any>;
    update: jest.Mock<any, any>;
    findMany: jest.Mock<any, any>;
  };
  user: {
    findMany: jest.Mock<any, any>;
  };
};

describe('SchoolsService', () => {
  let service: SchoolsService;
  let prismaService: MockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<SchoolsService>(SchoolsService);
    prismaService = module.get<PrismaService>(
      PrismaService,
    ) as unknown as MockPrismaService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('schoolRegistered', () => {
    it('should register a school', async () => {
      const dto: DtoSchool = {
        school_name: 'Test School',
        school_address: '123 Test St',
        school_phone: '1234567890',
      };

      const result = { id: 1, ...dto };
      prismaService.school.create.mockResolvedValue(result);

      expect(await service.schoolRegistered(dto)).toEqual(result);
      expect(prismaService.school.create).toHaveBeenCalledWith({
        data: dto,
      });
    });
  });

  describe('schoolUpdate', () => {
    it('should update a school', async () => {
      const dto: DtoSchool = {
        school_name: 'Updated School',
        school_address: '123 Updated St',
        school_phone: '0987654321',
      };

      const findResult = { id: 1, ...dto };
      const updateResult = { id: 1, ...dto };

      prismaService.school.findUnique.mockResolvedValue(findResult);
      prismaService.school.update.mockResolvedValue(updateResult);

      expect(await service.schoolUpdate(1, dto)).toEqual({
        updateSchool: updateResult,
        school: findResult,
      });
      expect(prismaService.school.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });
  });

  describe('schoolsGet', () => {
    it('should get all schools', async () => {
      const result = [
        { id: 1, school_name: 'School 1' },
        { id: 2, school_name: 'School 2' },
      ];

      prismaService.school.findMany.mockResolvedValue(result);

      expect(await service.schoolsGet()).toEqual(result);
      expect(prismaService.school.findMany).toHaveBeenCalledWith({
        select: { id: true, school_name: true },
      });
    });
  });

  describe('getStudentSex', () => {
    it('should get student sex counts', async () => {
      const maleCount = 10;
      const femaleCount = 5;

      prismaService.user.findMany.mockResolvedValueOnce(
        new Array(maleCount).fill({ gender: 'male' }),
      );
      prismaService.user.findMany.mockResolvedValueOnce(
        new Array(femaleCount).fill({ gender: 'female' }),
      );

      expect(await service.getStudentSex(1)).toEqual({
        male: maleCount,
        female: femaleCount,
      });
      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        where: { school_Id: 1, role: 'student', gender: 'male' },
      });
      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        where: { school_Id: 1, role: 'student', gender: 'female' },
      });
    });
  });

  describe('getSchoolById', () => {
    it('should get a school by id', async () => {
      const result = { id: 1, school_name: 'Test School' };

      prismaService.school.findUnique.mockResolvedValue(result);

      expect(await service.getSchoolById(1)).toEqual(result);
      expect(prismaService.school.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: { id: true, school_name: true },
      });
    });
  });
});
