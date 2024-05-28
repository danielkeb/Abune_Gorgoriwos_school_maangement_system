import { Test, TestingModule } from '@nestjs/testing';
import { CallanderService } from './callander.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CallanderDto } from './dto/callander.dto';
import { Calander } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

describe('CallanderService', () => {
  let service: CallanderService;
  let prismaService: PrismaService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue(process.env.DATABASE_URL),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CallanderService,
        PrismaService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<CallanderService>(CallanderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a callander event', async () => {
    const dto: CallanderDto = {
      id: 1,
      title: 'Test Event',
      start: '2024-05-25T10:00:00',
      allDay: true,
    };
    const schoolId = 1;

    const mockCreateResult: Calander = {
      id: 1,
      sub: 1,
      title: dto.title,
      start: dto.start,
      allDay: dto.allDay,
      schoolId: 1,
    };

    jest
      .spyOn(prismaService.calander, 'create')
      .mockResolvedValue(mockCreateResult);

    const result = await service.addCallander(dto, schoolId);
    expect(result).toEqual(mockCreateResult);
  });

  it('should get all callander events', async () => {
    const schoolId = 1;
    const events: Calander[] = [
      {
        id: 1,
        sub: 1,
        title: 'Test Event',
        start: '2024-05-25T10:00:00',
        allDay: true,
        schoolId: 1,
      },
    ];

    jest.spyOn(prismaService.calander, 'findMany').mockResolvedValue(events);

    const result = await service.getAllCallanders(schoolId);
    expect(result).toEqual(events);
  });

  it('should remove a callander event by id', async () => {
    const eventId = 1;
    const mockEvent: Calander = {
      id: eventId,
      sub: 1,
      title: 'Test Event',
      start: '2024-05-25T10:00:00',
      allDay: true,
      schoolId: 1,
    };

    jest
      .spyOn(prismaService.calander, 'findMany')
      .mockResolvedValue([mockEvent]);
    jest.spyOn(prismaService.calander, 'delete').mockResolvedValue(mockEvent);

    const result = await service.removeById(eventId);
    expect(result).toEqual({ msg: 'Post Deleted succesfully' });
  });

  //
});
