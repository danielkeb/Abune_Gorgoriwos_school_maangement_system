import { Test, TestingModule } from '@nestjs/testing';
import { TeachersService } from './teachers.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateTeacherDto, UpdateAdminTeacherDto, ConnectUpdateDto, SubjectUpdateDto } from './dto';

describe('TeachersService', () => {
  let service: TeachersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeachersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              update: jest.fn(),
            },
            teacher: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TeachersService>(TeachersService);
    prisma = module.get<PrismaService>(PrismaService);
});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateTeacher', () => {
    it('should update a teacher', async () => {
      const userId = 1;
      const dto: UpdateTeacherDto = { username: 'John', password: 'Doe' };
      const updatedTeacher = {
        id: userId,
        first_name: 'John',
        middle_name: '', // Assuming it's optional
        last_name: 'Doe',
        username: 'john_doe',
        email: 'john@example.com',
        role: 'teacher',
        address: '123 Street',
        phone: '1234567890',
        password: 'password',
        gender: 'Male',
        date_of_birth: '2000-01-01',
        loggedInAt: new Date(),
        createdAT: new Date(),
        updatedAT: new Date(),
        school_Id: 1,
      };
      
    //   const updatedTeacher = {
    //     id: {userId},
    //     username: 'john_doe',
    //     email: 'john@example.com',
    //     role: 'teacher',
    //     address: '123 Street',
    //     phone: '1234567890',
    //     password: 'password',
    //     gender: 'Male',
    //     date_of_birth: '2000-01-01',
    //     loggedInAt: new Date(),
    //     createdAT: new Date(),
    //     updatedAT: new Date(),
    //     school_Id: 1,
    //   };

      jest.spyOn(prisma.user, 'update').mockResolvedValue(updatedTeacher);

      expect(await service.updateTeacher(userId, dto)).toEqual(updatedTeacher);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { ...dto },
      });
    });
  });

  describe('getTeachers', () => {
    it('should return all teachers with merged user info', async () => {
      const allTeachers = [
        {
          user: { 
            id: 1, 
            frist_name: 'John', 
            last_name: 'Doe', 
            email: 'john@example.com', 
            phone: '1234567890', 
            gender: 'Male', 
            createdAT: new Date(), 
            school_Id: 1 
          },
          gradelevel: [
            { 
              id: 1, 
              grade: 'Grade 1', 
              section: [{ id: 1, name: 'Section A' }], 
              subject: [{ id: 1, name: 'Math' }] 
            },
          ],
          education_level: 'Bachelor',
          user_Id: 1
        },
      ];

      jest.spyOn(prisma.teacher, 'findMany').mockResolvedValue(allTeachers);

      expect(await service.getTeachers()).toEqual([
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
          phone: '1234567890',
          gender: 'Male',
          createdAT: allTeachers[0].user.createdAT,
          gradeId: [1],
          grade: ['Grade 1'],
          section: [[{ id: 1, name: 'Section A' }]],
          subject: [[{ id: 1, name: 'Math' }]],
          school_Id: 1,
          education_level: 'Bachelor',
        },
      ]);

      expect(prisma.teacher.findMany).toHaveBeenCalledWith({
        include: {
          user: true,
          gradelevel: { include: { subject: true, section: true } },
        },
      });
    });
  });

  describe('getTeacherById', () => {
    it('should return a teacher by id with merged user info', async () => {
      const id = 1;
      const teacher = {
        user: { 
          id, 
          frist_name: 'John', 
          last_name: 'Doe', 
          gender: 'Male', 
          address: '123 Street', 
          email: 'john@example.com', 
          date_of_birth: new Date(), 
          phone: '1234567890', 
          school_Id: 1 
        },
        gradelevel: [
          { 
            id: 1, 
            grade: 'Grade 1', 
            section: [{ id: 1, name: 'Section A' }], 
            subject: [{ id: 1, name: 'Math' }] 
          },
        ],
        education_level: 'Bachelor',
        user_Id: 1
      };

      jest.spyOn(prisma.teacher, 'findMany').mockResolvedValue([teacher]);

      expect(await service.getTeacherById(id)).toEqual([
        {
          id: teacher.user.id,
          first_name: teacher.user.frist_name,
          last_name: teacher.user.last_name,
          gender: teacher.user.gender,
          address: teacher.user.address,
          email: teacher.user.email,
          date_of_birth: teacher.user.date_of_birth,
          phone: teacher.user.phone,
          education_level: teacher.education_level,
          gradeId: [1],
          grade: ['Grade 1'],
          section: [[{ id: 1, name: 'Section A' }]],
          subject: [[{ id: 1, name: 'Math' }]],
          school_Id: 1,
        },
      ]);

      expect(prisma.teacher.findMany).toHaveBeenCalledWith({
        where: { user_Id: id },
        include: {
          user: true,
          gradelevel: { include: { subject: true, section: true } },
        },
      });
    });

    it('should throw NotFoundException if teacher not found', async () => {
      const id = 1;

      jest.spyOn(prisma.teacher, 'findMany').mockResolvedValue([]);

      await expect(service.getTeacherById(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateAdminTeacher', () => {
    it('should update admin teacher', async () => {
      const userId = 1;
      const dto: UpdateAdminTeacherDto = {
        first_name: 'John',
        last_name: 'Doe',
        middle_name: 'Middle',
        address: '123 Street',
        username: 'john_doe',
        phone: '1234567890',
        education_level: 'Master',
      };
      const updatedUser = { 
        id: userId, 
        frist_name: dto.first_name, 
        last_name: dto.last_name, 
        middle_name: dto.middle_name, 
        username: dto.username, 
        email: 'john@example.com', 
        role: 'teacher', 
        address: dto.address, 
        phone: dto.phone, 
        password: 'password', 
        gender: 'Male', 
        date_of_birth: '2000-01-01', 
        loggedInAt: new Date(), 
        createdAT: new Date(), 
        updatedAT: new Date(), 
        school_Id: 1 
      };
      const updatedTeacher = { user_Id: userId, education_level: dto.education_level };

      jest.spyOn(prisma.user, 'update').mockResolvedValue(updatedUser);
      jest.spyOn(prisma.teacher, 'update').mockResolvedValue(updatedTeacher);

      expect(await service.updateAdminTeacher(dto, userId)).toEqual({ teacher: updatedTeacher, teacherUser: updatedUser, msg: 'Sucess' });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          frist_name: dto.first_name,
          last_name: dto.last_name,
          middle_name: dto.middle_name,
          address: dto.address,
          username: dto.username,
          phone: dto.phone,
        },
      });
      expect(prisma.teacher.update).toHaveBeenCalledWith({
        where: { user_Id: userId },
        data: {
          education_level: dto.education_level,
        },
      });
    });
  });

  // Additional test cases for other methods...

  describe('updateTeacherFields', () => {
    it('should throw BadRequestException if dto is missing required fields', async () => {
      const teacherId = 1;
      const dto = { sectionId: null, grade_Id: null, subjectId: null };

      await expect(service.updateTeacherFields(teacherId, dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if teacher not found', async () => {
      const teacherId = 1;
      const dto = { sectionId: 1, grade_Id: 1, subjectId: 1 };

      jest.spyOn(prisma.teacher, 'findUnique').mockResolvedValue(null);

      await expect(service.updateTeacherFields(teacherId, dto)).rejects.toThrow(NotFoundException);
    });

    // More tests for other conditions and scenarios...
 }});

  // Additional test cases for
