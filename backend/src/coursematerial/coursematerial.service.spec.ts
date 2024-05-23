// import { Test, TestingModule } from '@nestjs/testing';
// import { CoursematerialService } from './coursematerial.service';
// import { PrismaService } from '../prisma/prisma.service';
// import { ConfigModule } from '@nestjs/config';
// import { UploadCourse } from './dto/course.dto';

// describe('CoursematerialService', () => {
//   let service: CoursematerialService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [ConfigModule],
//       providers: [CoursematerialService, PrismaService, ConfigModule],
//     }).compile();

//     service = module.get<CoursematerialService>(CoursematerialService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('uploadCourseMaterial', () => {
//     let service: CoursematerialService;
//     it('should create a new course material', async () => {
//       const filepath = 'test-file.txt';
//       const teacherId = 1;
//       const subjectId = 1;
//       const gradeId = 1;
//       const dto = new UploadCourse();
//       dto.description = 'Test course material';

//       const result = await service.uploadCourseMaterial(
//         filepath,
//         teacherId,
//         subjectId,
//         gradeId,
//         dto,
//       );

//       expect(result).toBeDefined();
//       expect(result.description).toEqual(dto.description);
//       expect(result.file).toEqual(filepath);
//       expect(result.teacherId).toEqual(teacherId);
//     });
//   });

//   // describe('getStudyMaterials', () => {
//   //   it('should return all study materials', async () => {
//   //     const result = await service.getStudyMaterials();

//   //     expect(result).toBeDefined();
//   //     expect(result.length).toBeGreaterThan(0);
//   //   });
//   // });

//   // describe('downloadMaterial', () => {
//   //   it('should download the file', async () => {
//   //     const filename = 'test-file.txt';
//   //     const file = await service.downloadMaterial(filename);

//   //     expect(file).toBeDefined();
//   //     expect(file.length).toBeGreaterThan(0);
//   //   });
//   // });

//   // describe('deleteCourseMaterial', () => {
//   //   it('should delete the course material', async () => {
//   //     const id = 1;
//   //     await service.deleteCourseMaterial(id);

//   //     try {
//   //       await service.getStudyMaterials();
//   //     } catch (error) {
//   //       expect(error.message).toEqual('Course material not found');
//   //     }
//   //   });
//   // });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { CoursematerialService } from './coursematerial.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');
jest.mock('path');

describe('CoursematerialService', () => {
  let service: CoursematerialService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursematerialService,
        {
          provide: PrismaService,
          useValue: {
            courseMaterial: {
              create: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
            gradeLevel: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            subject: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CoursematerialService>(CoursematerialService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('uploadCourseMaterial', () => {
    it('should upload course material successfully', async () => {
      const filepath = 'path/to/file';
      const teacher = 1;
      const subjectId = 1;
      const gradeId = 1;
      const dto = { description: 'Test Course' };

      (prismaService.courseMaterial.create as jest.Mock).mockResolvedValue({
        id: 1,
      });
      (prismaService.gradeLevel.findUnique as jest.Mock).mockResolvedValue({
        id: gradeId,
      });
      (prismaService.subject.findUnique as jest.Mock).mockResolvedValue({
        id: subjectId,
      });
      (prismaService.gradeLevel.update as jest.Mock).mockResolvedValue({});
      (prismaService.subject.update as jest.Mock).mockResolvedValue({});

      const result = await service.uploadCourseMaterial(
        filepath,
        teacher,
        subjectId,
        gradeId,
        dto,
      );

      expect(result).toEqual({ id: 1 });
      expect(prismaService.courseMaterial.create).toHaveBeenCalledWith({
        data: {
          description: 'Test Course',
          file: filepath,
          teacherId: teacher,
        },
      });
      expect(prismaService.gradeLevel.update).toHaveBeenCalledWith({
        where: { id: gradeId },
        data: { courseMaterial: { connect: { id: 1 } } },
      });
      expect(prismaService.subject.update).toHaveBeenCalledWith({
        where: { id: subjectId },
        data: { courseMaterial: { connect: { id: 1 } } },
      });
    });

    it('should throw NotFoundException if course material is not created', async () => {
      (prismaService.courseMaterial.create as jest.Mock).mockResolvedValue(
        null,
      );

      await expect(
        service.uploadCourseMaterial('filepath', 1, 1, 1, {
          description: 'Test Course',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if subject or grade is not found', async () => {
      (prismaService.courseMaterial.create as jest.Mock).mockResolvedValue({
        id: 1,
      });
      (prismaService.gradeLevel.findUnique as jest.Mock).mockResolvedValue(
        null,
      );
      (prismaService.subject.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.uploadCourseMaterial('filepath', 1, 1, 1, {
          description: 'Test Course',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getStudyMaterials', () => {
    it('should return study materials', async () => {
      const studyMaterials = [{ id: 1, description: 'Test Material' }];
      (prismaService.courseMaterial.findMany as jest.Mock).mockResolvedValue(
        studyMaterials,
      );

      const result = await service.getStudyMaterials();
      expect(result).toEqual(studyMaterials);
    });
  });

  describe('downloadMaterial', () => {
    it('should download material successfully', async () => {
      const filename = 'test.pdf';
      const filePath = `mocked/path/${filename}`;
      const fileBuffer = Buffer.from('test data');

      (path.join as jest.Mock).mockReturnValue(filePath);
      (fs.readFileSync as jest.Mock).mockReturnValue(fileBuffer);

      const result = await service.downloadMaterial(filename);
      expect(result).toEqual(fileBuffer);
      expect(path.join).toHaveBeenCalledWith(
        __dirname,
        '..',
        'coursematerial',
        filename,
      );
      expect(fs.readFileSync).toHaveBeenCalledWith(filePath);
    });

    it('should throw NotFoundException if file is not found', async () => {
      const filename = 'nonexistent.pdf';
      const filePath = `mocked/path/${filename}`;

      (path.join as jest.Mock).mockReturnValue(filePath);
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error('File not found');
      });

      await expect(service.downloadMaterial(filename)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteCourseMaterial', () => {
    it('should delete course material successfully', async () => {
      const courseId = 1;
      (prismaService.courseMaterial.delete as jest.Mock).mockResolvedValue({
        id: courseId,
      });

      await service.deleteCourseMaterial(courseId);
      expect(prismaService.courseMaterial.delete).toHaveBeenCalledWith({
        where: { id: courseId },
      });
    });

    it('should throw NotFoundException if course material is not found', async () => {
      (prismaService.courseMaterial.delete as jest.Mock).mockResolvedValue(
        null,
      );

      await expect(service.deleteCourseMaterial(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
