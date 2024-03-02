import { Injectable } from '@nestjs/common';
import { AddSubjectsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSubjectDto } from './dto/update.subject.dto';

@Injectable()
export class SubjectsService {
    constructor(private prisma:PrismaService){}

    async addSubjects( dto:AddSubjectsDto ){
      const subject= await this.prisma.subject.create({data:{...dto}})


      return {
        msg:"created",
        data:subject
      }
    }

    async updateSubjects(dto:UpdateSubjectDto, subId:number){
        const updateSubject= await this.prisma.subject.update({where:{ id:subId
         
        }, data:{
            ...dto
        }})

       return{
        msg:"Updated!",
        data:updateSubject
        
       }
    }
}
