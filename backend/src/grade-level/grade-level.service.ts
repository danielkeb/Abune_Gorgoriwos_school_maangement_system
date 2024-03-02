import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GradeLevel } from './dto';

@Injectable()
export class GradeLevelService {
  constructor(private prismaService: PrismaService) {}
  async addGradeLevel(id: number, dto: GradeLevel) {
    //check if the Teacher existd!
    // const findTeacher = await this.prismaService.teacher.findUnique({
    //   where: { user_Id: dto.teacher_id },
    // });


      //If  Teacher existed we create the gradeLevel
      const addGrade = await this.prismaService.gradeLevel.create({
        data: {
         grade:dto.grade
          
         
        },
      });
      return addGrade;

      //We return error message!
      // return {
      //   msg: 'Please Insert a vald Teacher Id',
      // };

  }
  async updateGradeLevel(gradeId: number, dto: GradeLevel) {
    // update the gradeLevel
    const updateGrade = await this.prismaService.gradeLevel.update({
      where: {
        id: gradeId,
      },
      data: {
        grade: dto.grade,
        
      },
    });
    return updateGrade;
  }

  async getGradeLevel(){
    const gradeLevel= await this.prismaService.gradeLevel.findMany({select:{id:true, section:true, grade:true, subject:true}})

    return gradeLevel;


  }
}
