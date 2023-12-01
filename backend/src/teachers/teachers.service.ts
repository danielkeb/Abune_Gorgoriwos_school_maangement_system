import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTeacherDto } from './dto';

@Injectable()
export class TeachersService {

constructor(private  prisma: PrismaService){}


async updateTeacher(userId:number, dto:UpdateTeacherDto){

  
        const teacher= await this.prisma.user.update({
            where:{
             id:userId
            },
            data:{
                ...dto
            }
        })
    
        return teacher
   
       
            
    
    

  
}

}
