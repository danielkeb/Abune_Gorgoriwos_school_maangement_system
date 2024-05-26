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

  async getTeachers(school_Id:number): Promise<any[]> {
    // Adjust the return type as per your requirement
    const allTeachers = await this.prisma.teacher.findMany({ where:{user:{school_Id:school_Id}},
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
        status: teacher.user.status,
        middle_name: teacher.user.middle_name,
        last_name: teacher.user.last_name,
        email: teacher.user.email,
        phone: teacher.user.phone,
        image: teacher.user.image,
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
    const allTeachers = await this.prisma.teacher.findMany({
      where: { user_Id: id },
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
        status: teacher.user.status,
      
        middle_name: teacher.user.middle_name,
        last_name: teacher.user.last_name,
        gender: teacher.user.gender,
        address: teacher.user.address,
        email: teacher.user.email,
        date_of_birth: teacher.user.date_of_birth,
        phone: teacher.user.phone,
        education_level: teacher.education_level,
        gradeId: teacher.gradelevel.map((grade) => grade.id),
        grade: teacher.gradelevel.map((grade) => grade.grade), // Map over gradelevel to access grade
        section: teacher.gradelevel.map((grade) => grade.section), // Map over gradelevel to access section
        subject: teacher.gradelevel.map((grade) => grade.subject),
        school_Id: teacher.user.school_Id, // Add school_Id to the return object
      };
    });

    return teachersWithMergedUser;
    //   const teacher = await this.prisma.teacher.findUnique({
    //     where: { user_Id: id },
    //     select: { gradelevel: { include: { subject: true, section: true } } },
    //   });
    //   console.log(teacher);
    //   const flatTeacher = teacher.gradelevel.map((teach) => {
    //     return {
    //       id: teach.id,
    //       Grade: teach.grade,
    //       sections: teach.section.map((sec) => sec.name),
    //       subjects: teach.subject,
    //     };
    //   });
    //  // console.log('hello', flatTeacher);
    //   // return teacher;
    //   return flatTeacher;
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
        email: dto.email,
        date_of_birth: dto.date_of_birth,
        gender: dto.gender,
        phone: dto.phone,
        status:dto.status
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
    if (!dto || !dto.sectionId || !dto.gradeId || !dto.subjectId) {
      throw new BadRequestException(
        'Invalid request data. Required properties are missing.',
      );
    }


      // Connect the subject to the teacher
  await this.prisma.teacher.update({
    where: { user_Id: teacherId },
    data: {
      subject: {
        connect: { id: dto.subjectId },
      },
      gradelevel: {
        connect: { id: dto.gradeId },
      },
      section: {
        connect: { id: dto.sectionId },
      },
    },
  });

    // Connect the section to the subject
    await this.prisma.subject.update({
      where: { id: dto.subjectId },
      data: {
        sections: {
          connect: { id: dto.sectionId },
        },
        teacher: {
          connect: { user_Id: teacherId },
        },
      },
    });

    // Check if the section, grade, and subject exist
    // const [sectionExists, gradeExists, subjectExists] = await Promise.all([
    //   this.prisma.section.findUnique({ where: { id: dto.sectionId } }),
    //   this.prisma.gradeLevel.findUnique({ where: { id: dto.gradeId } }),
    //   this.prisma.subject.findUnique({ where: { id: dto.subjectId } }),
    // ]);

    // if (!sectionExists) {
    //   throw new NotFoundException(`Section with id ${dto.sectionId} not found`);
    // }

    // if (!gradeExists) {
    //   throw new NotFoundException(`Grade with id ${dto.gradeId} not found`);
    // }

    // if (!subjectExists) {
    //   throw new NotFoundException(`Subject with id ${dto.subjectId} not found`);
    // }

    // const teacherInfo = await this.prisma.teacher.findUnique({
    //   where: {
    //     user_Id: teacherId,
    //   },
    //   include: {
    //     section: {
    //       include: {
    //         subjects: true,
    //       },
    //     },
    //     gradelevel: true,
    //     subject: true,
    //   },
    // });

    // if (!teacherInfo) {
    //   throw new NotFoundException(`Teacher with id ${teacherId} not found`);
    // }

    // const isTeacherConnectedToSection = teacherInfo.section.some(
    //   (sec) => sec.id === dto.sectionId,
    // );
    // const isTeacherConnectedToGrade = teacherInfo.gradelevel.some(
    //   (grade) => grade.id === dto.gradeId,
    // );
    // const isTeacherConnectedToSubject = teacherInfo.subject.some(
    //   (sub) => sub.id === dto.subjectId,
    // );

    // // Check if teacher is already connected to any subject within the same section and grade
    // const isTeacherConnectedToSameSectionGradeSubject =
    //   teacherInfo.section.some(
    //     (sec) =>
    //       sec.id === dto.sectionId &&
    //       sec.subjects.some((sub) => sub.gradeId === dto.gradeId),
    //   );

    // // Update section connection if not already connected
    // if (!isTeacherConnectedToSection) {
    //   await this.prisma.teacher.update({
    //     where: {
    //       user_Id: teacherId,
    //     },
    //     data: {
    //       section: {
    //         connect: { id: dto.sectionId },
    //       },
    //     },
    //   });

    //   await this.prisma.subject.update({
    //     where: {
    //       id: dto.subjectId,
    //     },
    //     data: {
    //       sections: {
    //         connect: { id: dto.sectionId },
    //       },
    //     },
    //   });
    // }

    // // Update grade connection if not already connected
    // if (!isTeacherConnectedToGrade) {
    //   await this.prisma.teacher.update({
    //     where: {
    //       user_Id: teacherId,
    //     },
    //     data: {
    //       gradelevel: {
    //         connect: { id: dto.gradeId },
    //       },
    //     },
    //   });
    // }

    // // Update subject connection if not already connected to any subject within the same section and grade
 
    //   await this.prisma.teacher.update({
    //     where: {
    //       user_Id: teacherId,
    //     },
    //     data: {
    //       subject: {
    //         connect: { id: dto.subjectId },
    //       },
    //     },
    //   });
    
    // // Fetch updated teacher info after connections are made
    // const updatedTeacherInfo = await this.prisma.teacher.findUnique({
    //   where: {
    //     user_Id: teacherId,
    //   },
    //   include: {
    //     section: {
    //       include: {
    //         subjects: true,
    //       },
    //     },
    //     gradelevel: true,
    //     subject: true,
    //   },
    // });

    // return updatedTeacherInfo;
  }

  async disconnectTeacherAll(teacherId: number, dto: ConnectUpdateDto) {
    if (!dto || !dto.sectionId || !dto.gradeId || !dto.subjectId) {
      throw new BadRequestException(
        'Invalid request data. Required properties are missing.',
      );
    }


        // Fetch the subject with its sections
        const subject = await this.prisma.subject.findUnique({
          where: { id: dto.subjectId, teacherId:teacherId },
          include: { sections: true },
        });
    
        if (!subject) {
          throw new NotFoundException('Subject not found');
        }
    
        const sectionsForSubject = subject.sections;

        console.log("here is the console", sectionsForSubject.length)
    
        if (sectionsForSubject.length > 1) {
          // If more than one section, disconnect only the specific section
          await this.prisma.subject.update({
            where: { id: dto.subjectId, teacherId:teacherId },
            data: {
              sections: {
                disconnect: { id: dto.sectionId },
              },
            },
          });
        } else  {

          // Check if there are any other subjects with the same grade and teacher
      const otherSubjectsInGrade = await this.prisma.subject.findMany({
      where: {
        gradeId: dto.gradeId,
        teacherId: teacherId,
        id: { not: dto.subjectId },
      },
      include: {
        sections: true,
      },
    });
          // If only one section, disconnect the section and the teacher from the subject
          await this.prisma.subject.update({
            where: { id: dto.subjectId, teacherId:teacherId },
            data: {
              sections: {
                disconnect: { id: dto.sectionId },
              },
              teacher: {
                disconnect: true,
              },
            },
          });

          if (otherSubjectsInGrade.length === 0) {
      // If no other subjects with the same grade, disconnect the teacher from the grade level
      await this.prisma.teacher.update({
        where: {
          user_Id: teacherId,
        },
        data: {
          gradelevel: {
            disconnect: { id: dto.gradeId },
          },
        },
      });
    }

    // Check if there are any other subjects with the same section and teacher
    const otherSubjectsInSection = await this.prisma.subject.findMany({
      where: {
        sections: {
          some: {
            id: dto.sectionId,
          },
        },
        teacherId: teacherId,
        id: { not: dto.subjectId },
      },
    });

    if (otherSubjectsInSection.length === 0) {
      // If no other subjects with the same section, disconnect the teacher from the section
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

  }

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
  async fetchTeacher(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        user_Id: id,
        
      },

    });
    if (!teacher) {
    throw new NotFoundException("teacher not found");
    }
   const got= await this.prisma.subject.findMany({
      where:{
        teacherId: teacher.user_Id,
      },
      select:{
        gradeId:true,
        name:true,
        id:true,
        sections: true,
      
      }
    });
    return got;
  }
}
