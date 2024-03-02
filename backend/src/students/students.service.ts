import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DtoAdmin, DtoStudent } from './dto';

@Injectable()
export class StudentsService {
  constructor(private prismaService: PrismaService) {}

  async studentUpdate(studentId: number, dto: DtoStudent) {
    const updateStudent = await this.prismaService.user.update({
      where: { id: studentId },
      data: {
        ...dto,
      },
    });
    return updateStudent;
  }

  async updateStudentByAdmin(studentId: number, dto: DtoAdmin) {
    const updateStudent = await this.prismaService.user.update({
      where: { id: studentId },
      data: {
        ...dto,
      },
    });
    const studentTable = await this.prismaService.teacher.update({
      where: { user_Id: studentId },
      data: {
        education_level: dto.education_level,
      },
    });
    return { updateStudent, studentTable };
  }
  async getStudents() {
    // Adjust the return type as per your requirement
    const allStudents = await this.prismaService.student.findMany({
      include: {
        user: true,
        gradelevel: {
          include: { subject: true, section: true },
        },
      },
    });

    const studentsWithMergedUser = allStudents.map((student) => {
      return {
        id: student.user.id,
        frist_name: student.user.frist_name,
        middle_name: student.user.middle_name,
        last_name: student.user.last_name,
        email: student.user.email,
        phone: student.user.phone,
        createdAT: student.user.createdAT,
        grade: student.gradelevel,
        section: student.gradelevel,
        subject: student.gradelevel,
        school_Id: student.user.school_Id, // Add school_Id to the return object
      };
    });

    return studentsWithMergedUser;
  }
  async getStudent(std: number) {
    const studentWithUser = await this.prismaService.student.findUnique({
      where: {
        user_Id: std,
      },
      include: {
        user: true,
        gradelevel: {
          include: { subject: true, section: true },
        },
        result: true,
      },
    });

    if (!studentWithUser) {
      throw new NotFoundException('Student not found');
    }

    const student = {
      id: studentWithUser.user.id,
      first_name: studentWithUser.user.frist_name,
      middle_name: studentWithUser.user.middle_name,
      last_name: studentWithUser.user.last_name,
      email: studentWithUser.user.email,
      phone: studentWithUser.user.phone,
      createdAT: studentWithUser.user.createdAT,
      grade: studentWithUser.gradelevel,
      results: studentWithUser.result,
      //section: studentWithUser.gradelevel.section,
      //subject: studentWithUser.gradelevel.subject,
      school_Id: studentWithUser.user.school_Id,
    };

    return student;
  }
  async getResult(userid: number) {
    const result = await this.prismaService.student.findUnique({
      where: {
        user_Id: userid,
      },
      include: {
        result: true,
      },
    });
    return result;
  }
}
