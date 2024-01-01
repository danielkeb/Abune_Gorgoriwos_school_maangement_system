import { Injectable } from '@nestjs/common';
import { SectionAddDto } from './dto/sectionAdd.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SectionService {
    constructor(private prismaService:PrismaService){}
 async addSection(dto:SectionAddDto){

    const findSection= await this.prismaService.section.findMany({where:{...dto}})
    if(findSection){
        return{
            msg:"Section Already  exist!"
        }
    }
    const addSection= await this.prismaService.section.create({
        data:{
            ...dto
        }
    })

    return{
        msg:"Section added !",
        addSection
    }
 }

 async getSection(){
    const getSection= await this.prismaService.section.findMany({select:{gradeId:true,name:true, gradelevel:{select:{grade:true}}}})
    return getSection
        
    
 }
}
