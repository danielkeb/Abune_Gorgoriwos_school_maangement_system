import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { DtoSchool } from './dto';
import { RoleGuard } from '../auth/decorator/roles.guard';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Role } from '../auth/decorator/enums/role.enum';

const mockSchoolsService = {
  schoolRegistered: jest.fn(),
  schoolUpdate: jest.fn(),
  schoolsGet: jest.fn(),
  getStudentSex: jest.fn(),
  getSchoolById: jest.fn(),
};

type MockSchoolsService = {
  schoolRegistered: jest.Mock<any, any>;
  schoolUpdate: jest.Mock<any, any>;
  schoolsGet: jest.Mock<any, any>;
  getStudentSex: jest.Mock<any, any>;
  getSchoolById: jest.Mock<any, any>;
};

describe('SchoolsController', () => {
  let controller: SchoolsController;
  let service: MockSchoolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolsController],
      providers: [{ provide: SchoolsService, useValue: mockSchoolsService }],
    })
      .overrideGuard(JwtGuard)
      .useValue({})
      .overrideGuard(RoleGuard)
      .useValue({})
      .compile();

    controller = module.get<SchoolsController>(SchoolsController);
    service = module.get<SchoolsService>(
      SchoolsService,
    ) as unknown as MockSchoolsService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('schoolRegistered', () => {
    it('should register a school', async () => {
      const dto: DtoSchool = {
        school_name: 'Test School',
        school_address: '123 Test St',
        school_phone: '1234567890',
      };

      const result = { id: 1, ...dto };
      service.schoolRegistered.mockResolvedValue(result);

      expect(await controller.schoolRegistered(dto)).toEqual(result);
      expect(service.schoolRegistered).toHaveBeenCalledWith(dto);
    });
  });

  describe('schoolUpdate', () => {
    it('should update a school', async () => {
      const dto: DtoSchool = {
        school_name: 'Updated School',
        school_address: '123 Updated St',
        school_phone: '0987654321',
      };

      const result = {
        updateSchool: { id: 1, ...dto },
        school: { id: 1, ...dto },
      };
      service.schoolUpdate.mockResolvedValue(result);

      expect(await controller.schoolUpdate(1, dto)).toEqual(result);
      expect(service.schoolUpdate).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('schoolsGet', () => {
    it('should get all schools', async () => {
      const result = [
        { id: 1, school_name: 'School 1' },
        { id: 2, school_name: 'School 2' },
      ];

      service.schoolsGet.mockResolvedValue(result);

      expect(await controller.schoolsGet()).toEqual(result);
      expect(service.schoolsGet).toHaveBeenCalled();
    });
  });

  describe('getStudentSex', () => {
    it('should get student sex counts', async () => {
      const result = { male: 10, female: 5 };

      service.getStudentSex.mockResolvedValue(result);

      expect(await controller.getStudentSex(1)).toEqual(result);
      expect(service.getStudentSex).toHaveBeenCalledWith(1);
    });
  });

  describe('getSchoolById', () => {
    it('should get a school by id', async () => {
      const result = { id: 1, school_name: 'Test School' };

      service.getSchoolById.mockResolvedValue(result);

      expect(await controller.getSchoolById(1)).toEqual(result);
      expect(service.getSchoolById).toHaveBeenCalledWith(1);
    });
  });
});
