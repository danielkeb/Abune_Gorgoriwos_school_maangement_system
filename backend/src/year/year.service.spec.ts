import { Test, TestingModule } from '@nestjs/testing';
import { YearService } from './year.service';
import { PrismaService } from '../prisma/prisma.service';
import { YearDto } from './dto';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
  },
  schoolYear: {
    create: jest.fn(),
  },
};

type MockPrismaService = {
  user: {
    findUnique: jest.Mock<any, any>;
  };
  schoolYear: {
    create: jest.Mock<any, any>;
  };
};

describe('YearService', () => {
  let service: YearService;
  let prismaService: MockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        YearService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<YearService>(YearService);
    prismaService = module.get<PrismaService>(
      PrismaService,
    ) as unknown as MockPrismaService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addYear', () => {
    it('should add a year', async () => {
      const adminId = 1;
      const dto: YearDto = {
        name: '2024-2025',
        start_date: '2024-09-01',
        end_date: '2025-06-30',
      };

      prismaService.user.findUnique.mockResolvedValue({ id: adminId });
      prismaService.schoolYear.create.mockResolvedValue({ id: 1, ...dto });

      expect(await service.addYear(adminId, dto)).toEqual({
        msg: 'registered successfully',
      });
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: adminId },
      });
      expect(prismaService.schoolYear.create).toHaveBeenCalledWith({
        data: { ...dto },
      });
    });

    it('should throw NotFoundException if admin not found', async () => {
      const adminId = 1;
      const dto: YearDto = {
        name: '2024-2025',
        start_date: '2024-09-01',
        end_date: '2025-06-30',
      };

      prismaService.user.findUnique.mockResolvedValue(null);

      // Mocking create method to throw an error
      prismaService.schoolYear.create.mockImplementation(() => {
        throw new Error('Unexpected call to create');
      });

      await expect(service.addYear(adminId, dto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: adminId },
      });
      expect(prismaService.schoolYear.create).toHaveBeenCalled();
    });
  });
});
