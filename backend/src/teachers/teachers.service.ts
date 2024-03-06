import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAdminTeacherDto, UpdateTeacherDto } from './dto';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async updateTeacher(userId: number, dto: UpdateTeacherDto) {
    const teacher = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    return teacher;
  }

  async getTeachers(): Promise<any[]> {
    // Adjust the return type as per your requirement
    const allTeachers = await this.prisma.teacher.findMany({
      include: {
        user: true,
        gradelevel: {
          include: { subject: true, section: true }, // Include the 'section' field here
        },
      },
    });

    const teachersWithMergedUser = allTeachers.map((teacher) => {
      return {
        id: teacher.user.id,
        frist_name: teacher.user.frist_name,
        middle_name: teacher.user.middle_name,
        last_name: teacher.user.last_name,
        email: teacher.user.email,
        phone: teacher.user.phone,
        education_level: teacher.education_level,
        createdAT: teacher.user.createdAT,
        grade: teacher.gradelevel.map((grade) => grade.grade), // Map over gradelevel to access grade
        section: teacher.gradelevel.map((grade) => grade.section), // Map over gradelevel to access section
        subject: teacher.gradelevel.map((grade) => grade.subject),
        school_Id: teacher.user.school_Id, // Add school_Id to the return object
      };
    });

    return teachersWithMergedUser;
  }
  async getTeacherById(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { user_Id: id },
      select: { gradelevel: { include: { subject: true, section: true } } },
    });
    console.log(teacher);
    const flatTeacher = teacher.gradelevel.map((teach) => {
      return {
        id: teach.id,
        Grade: teach.grade,
        sections: teach.section.map((sec) => sec.name),
        subjects: teach.subject,
      };
    });
    console.log('hello', flatTeacher);
    // return teacher;
    return flatTeacher;
  }

  async updateAdminTeacher(dto: UpdateAdminTeacherDto, userId: number) {
    const teacherUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        frist_name: dto.first_name,
        // last_name: dto.last_name,
        // middle_name: dto.middle_name,
        // address: dto.address,
        // username: dto.username,
        // phone: dto.phone,
      },
    });

    const teacher = await this.prisma.teacher.update({
      where: {
        user_Id: userId,
      },
      data: {
        education_level: dto.education_level,
      },
    });

    return { teacher, teacherUser, msg: 'Sucess' };
  }

  async getTeachersGrade(id: number) {
    const teachersGrade = await this.prisma.teacher.findMany({
      where: {
        user_Id: id,
      },
      include: {
        gradelevel: {
          select: {
            id: true,
            grade: true,
          },
        },
        section: {
          include: {
            student: {
              select: {
                user_Id: true,
                user: { select: { frist_name: true, last_name: true } },
              },
            },
          },
        },
        subject: { include: { result: true } },
      },
    });

    return teachersGrade;
  }

  async getTeacherStudent(id: number) {
    const teacherInfo = await this.prisma.teacher.findUnique({
      where: {
        user_Id: id,
      },
      include: {
        subject: {
          include: {
            gradelevel: {
              include: {
                section: {
                  include: {
                    student: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return teacherInfo;
  }

  // async getTeacherSection(
  //   schoolId: number,
  //   gradeId: number,
  //   subjectId: number,
  // ){
  //   const students = await this.prisma.student.findMany({
  //     where :{
  //       user:{
  //         school_Id:schoolId
  //       },
  //       gradeId:gradeId,
  //       subject: {
  //         some: {
  //           id: subjectId,
  //         },
  //       },
  //     }
  //   })
  //   for (const student of students) {
  //     const result= await this.prisma.result.findMany({
  //       where:{

  //       }
  //     })
  //   }

  // }
}
