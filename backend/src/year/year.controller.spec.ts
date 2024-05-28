import { Test, TestingModule } from '@nestjs/testing';
import { YearController } from './year.controller';
import { YearService } from './year.service';
import { YearDto } from './dto';
import { RoleGuard } from '../auth/decorator/roles.guard';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Role } from '../auth/decorator/enums/role.enum';
import { Roles } from '../auth/decorator/roles.decorator';

const mockYearService = {
  addYear: jest.fn(),
};

type MockYearService = {
  addYear: jest.Mock<any, any>;
};

describe('YearController', () => {
  let controller: YearController;
  let service: MockYearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YearController],
      providers: [{ provide: YearService, useValue: mockYearService }],
    })
      .overrideGuard(JwtGuard)
      .useValue({})
      .overrideGuard(RoleGuard)
      .useValue({})
      .compile();

    controller = module.get<YearController>(YearController);
    service = module.get<YearService>(
      YearService,
    ) as unknown as MockYearService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addYear', () => {
    it('should add a year', async () => {
      const adminId = 1;
      const dto: YearDto = {
        name: '2024-2025',
        start_date: '2024-09-01',
        end_date: '2025-06-30',
      };

      const result = { msg: 'registered successfully' };
      service.addYear.mockResolvedValue(result);

      expect(await controller.addYear(adminId, dto)).toEqual(result);
      expect(service.addYear).toHaveBeenCalledWith(adminId, dto);
    });
  });
});
