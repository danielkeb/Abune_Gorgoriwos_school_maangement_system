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

  async getTeachers(){
    const allTeachers= await this.prisma.teacher.findMany({include:{user:true,gradelevel:{include:{subject:true, section:true}}}})

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
          grade:teacher.gradelevel.map(grade=>grade.grade),
          section:teacher.gradelevel.map(g=>g.section.map(s=>s.name)),
          subject:teacher.gradelevel.map(g=>g.subject)
    
        
      };
    });
  
    
   return teachersWithMergedUser;
  
  }
  async getTeacherById(id:number){
    const teacher= await this.prisma.teacher.findUnique({where:{user_Id:id}, select:{gradelevel:{include:{subject:true, section:true}}}})
    const flatTeacher= teacher.gradelevel.map((teach)=>{
      return{
        id:teach.id,
        Grade:teach.grade,
        sections:teach.section.map(sec=>sec.name),
        subjects:teach.subject
      }
    })
    // return teacher;
    return flatTeacher;
  }

  async updateAdminTeacher(
   
    dto: UpdateAdminTeacherDto,
    userId: number,
  ) {
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

    return { msg:"Sucess" };
  }
}
