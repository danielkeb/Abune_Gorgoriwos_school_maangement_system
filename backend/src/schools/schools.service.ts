import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoSchool } from './dto';

@Injectable()
export class SchoolsService {
  constructor(private prisamService: PrismaService) {}
  async schoolRegistered( dto: DtoSchool) {
    const school = await this.prisamService.school.create({
      data: {
        ...dto,
      },
    });
    return school;
  }
  async schoolUpdate(id: number, dto: DtoSchool) {
    const school = await this.prisamService.school.findUnique({
      where: { id: id },
    });

    const updateSchool = await this.prisamService.school.update({
      where: { id: id },
      data: {
        ...dto,
      },
    });
    return { updateSchool, school };
  }

  async schoolsGet() {
    const getSchool = await this.prisamService.school.findMany({
      select: { id: true, school_name: true },
    });

    return getSchool;
  }

  async getStudentSex(id:number){
    const getMale= await this.prisamService.user.findMany({where:{school_Id:id, role:'student', gender:'Male'}})
    const getFemale= await this.prisamService.user.findMany({where:{school_Id:id, role:'student', gender:'Female'}})
    const getTeacherMale= await this.prisamService.user.findMany({where:{school_Id:id, role:'teacher', gender:'Male'}})
    const getTeacherFemale= await this.prisamService.user.findMany({where:{school_Id:id, role:'teacher', gender:'Female'}})

    return{
      student_male:getMale.length,
      student_female:getFemale.length,
      teacher_male:getTeacherMale.length,
      teacher_female:getTeacherFemale.length

    }
  }
  async getSchoolById(id: number) {
    const singleSchool = await this.prisamService.school.findUnique({
      where: { id },
      select: { id: true, school_name: true },
    });

    return singleSchool;
  }
}
