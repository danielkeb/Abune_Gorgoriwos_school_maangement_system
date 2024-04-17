import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UpdateAdminTeacherDto,
  UpdateTeacherDto,
  SubjectUpdateDto,
  ConnectUpdateDto,
} from './dto';

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
        gender: teacher.user.gender,
        education_level: teacher.education_level,
        createdAT: teacher.user.createdAT,
        gradeId: teacher.gradelevel.map((grade) => grade.id),
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
        last_name: dto.last_name,
        middle_name: dto.middle_name,
        address: dto.address,
        username: dto.username,
        phone: dto.phone,
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
  //here assign grade, section and subject to teacher
  async updateTeacherFields(teacherId: number, dto: ConnectUpdateDto) {
    if (!dto || !dto.sectionId || !dto.grade_Id || !dto.subjectId) {
      throw new BadRequestException(
        'Invalid request data. Required properties are missing.',
      );
    }
    const teacherInfo = await this.prisma.teacher.findUnique({
      where: {
        user_Id: teacherId,
      },
      include: {
        section: true,
        gradelevel: true,
        subject: true,
      },
    });

    if (!teacherInfo) {
      throw new NotFoundException(`Teacher with id ${teacherId} not found`);
    }

    const isTeacherConnectedToSection = teacherInfo.section.some(
      (sec) => sec.id === dto.sectionId,
    );
    const isTeacherConnectedToGrade = teacherInfo.gradelevel.some(
      (grade) => grade.id === dto.grade_Id,
    );
    const isTeacherConnectedToSubject = teacherInfo.subject.some(
      (sub) => sub.id === dto.subjectId,
    );

    if (!isTeacherConnectedToSection) {
      await this.prisma.teacher.update({
        where: {
          user_Id: teacherId,
        },
        data: {
          section: {
            connect: { id: dto.sectionId },
          },
        },
      });
    }

    if (!isTeacherConnectedToGrade) {
      await this.prisma.teacher.update({
        where: {
          user_Id: teacherId,
        },
        data: {
          gradelevel: {
            connect: { id: dto.grade_Id },
          },
        },
      });
    }

    if (!isTeacherConnectedToSubject) {
      await this.prisma.teacher.update({
        where: {
          user_Id: teacherId,
        },
        data: {
          subject: {
            connect: { id: dto.subjectId },
          },
        },
      });
    }

    // Fetch updated teacher info after connections are made
    const updatedTeacherInfo = await this.prisma.teacher.findUnique({
      where: {
        user_Id: teacherId,
      },
      include: {
        section: true,
        gradelevel: true,
        subject: true,
      },
    });

    return updatedTeacherInfo;
  }

  async disconnectTeacherAll(teacherId: number, dto: ConnectUpdateDto) {
    if (!dto || !dto.sectionId || !dto.grade_Id || !dto.subjectId) {
      throw new BadRequestException(
        'Invalid request data. Required properties are missing.',
      );
    }

    const teacherInfo = await this.prisma.teacher.findUnique({
      where: {
        user_Id: teacherId,
      },
      include: {
        section: true,
        gradelevel: true,
        subject: true,
      },
    });

    if (!teacherInfo) {
      throw new NotFoundException(`Teacher with id ${teacherId} not found`);
    }

    if (teacherInfo.section.some((sec) => sec.id === dto.sectionId)) {
      await this.prisma.teacher.update({
        where: {
          user_Id: teacherId,
        },
        data: {
          section: {
            disconnect: { id: dto.sectionId },
          },
        },
      });
    }

    if (teacherInfo.gradelevel.some((grade) => grade.id === dto.grade_Id)) {
      await this.prisma.teacher.update({
        where: {
          user_Id: teacherId,
        },
        data: {
          gradelevel: {
            disconnect: { id: dto.grade_Id },
          },
        },
      });
    }

    if (teacherInfo.subject.some((sub) => sub.id === dto.subjectId)) {
      await this.prisma.teacher.update({
        where: {
          user_Id: teacherId,
        },
        data: {
          subject: {
            disconnect: { id: dto.subjectId },
          },
        },
      });
    }

    // // Fetch updated teacher info after disconnections are made
    // const updatedTeacherInfo = await this.prisma.teacher.findUnique({
    //   where: {
    //     user_Id: teacherId,
    //   },
    //   include: {
    //     section: true,
    //     gradelevel: true,
    //     subject: true,
    //   },
    // });

    return { sucess: true };
  }

  async UpdateTeacherConnect(teacherId: number, dto: SubjectUpdateDto) {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        user_Id: teacherId,
      },
      include: {
        subject: true,
        section: true,
      },
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher id ${teacherId} not found`);
    }

    const isTeacherConnectedToSubject = teacher.subject.some(
      (sub) => sub.id === dto.subjectId,
    );

    const isTeacherConnectedToSection = teacher.section.some(
      (sec) => sec.id === dto.sectionId,
    );

    if (!isTeacherConnectedToSubject) {
      const subjectUpdate = await this.prisma.teacher.update({
        where: {
          user_Id: teacherId,
        },
        data: {
          subject: {
            connect: { id: dto.subjectId },
          },
        },
      });
      if (!subjectUpdate) {
        throw new Error(
          `Failed to connect subject ${dto.subjectId} to teacher ${teacherId}`,
        );
      }
    }
    console.log(dto.sectionId);

    if (dto.sectionId && !isTeacherConnectedToSection) {
      const subjectUpdate = await this.prisma.teacher.update({
        where: {
          user_Id: teacherId,
        },
        data: {
          section: {
            connect: { id: dto.sectionId },
          },
        },
      });
      if (!subjectUpdate) {
        throw new Error(
          `Failed to connect section ${dto.sectionId} to teacher ${teacherId}`,
        );
      }
    }

    return { success: true };
  }

  async disconnectTeacher(teacherId: number, dto: SubjectUpdateDto) {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        user_Id: teacherId,
      },
      include: {
        subject: true,
        section: true,
      },
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher id ${teacherId} not found`);
    }

    const isTeacherConnectedToSubject = teacher.subject.some(
      (sub) => sub.id === dto.subjectId,
    );

    const isTeacherConnectedToSection = teacher.section.some(
      (sec) => sec.id === dto.sectionId,
    );

    if (isTeacherConnectedToSubject) {
      const subjectUpdate = await this.prisma.teacher.update({
        where: {
          user_Id: teacherId,
        },
        data: {
          subject: {
            disconnect: { id: dto.subjectId },
          },
        },
      });
      if (!subjectUpdate) {
        throw new Error(
          `Failed to disconnect subject ${dto.subjectId} from teacher ${teacherId}`,
        );
      }
    }
    console.log(dto.sectionId);

    if (dto.sectionId && isTeacherConnectedToSection) {
      const subjectUpdate = await this.prisma.teacher.update({
        where: {
          user_Id: teacherId,
        },
        data: {
          section: {
            disconnect: { id: dto.sectionId },
          },
        },
      });
      if (!subjectUpdate) {
        throw new Error(
          `Failed to disconnect section ${dto.sectionId} from teacher ${teacherId}`,
        );
      }
    }

    return { success: true };
  }
}
