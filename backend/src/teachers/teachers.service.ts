import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAdminTeacherDto, UpdateTeacherDto } from './dto';

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

async updateAdminTeacher(adminId:number, dto:UpdateAdminTeacherDto, userId:number){
    const teacherUser= await this.prisma.user.update({
        where:{
            id:userId
        }, data:{
            frist_name:dto.first_name,
            last_name:dto.last_name,
            middle_name:dto.middle_name,
            address:dto.address,
            username:dto.username,
            phone:dto.phone

         
        }
    })

    const teacher= await this.prisma.teacher.update({
        where:{
            user_Id:userId
        },
        data:{
            education_level: dto.education_level
        }
    })

    return{teacherUser,teacher}
}

}
